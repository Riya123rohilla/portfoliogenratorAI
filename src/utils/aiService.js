import OpenAI from 'openai';
import { validateApiKey, safeApiCall, sanitizeInput, aiRateLimiter } from './security';

let openaiClient = null;

/**
 * Initialize OpenAI client with API key
 */
export const initializeOpenAI = (apiKey) => {
  if (!validateApiKey(apiKey)) {
    throw new Error('Invalid API key format. Must start with "sk-"');
  }

  openaiClient = new OpenAI({
    apiKey: apiKey,
    dangerouslyAllowBrowser: true, // Note: In production, use a backend proxy
  });

  return true;
};

/**
 * Get OpenAI client instance
 */
const getClient = () => {
  if (!openaiClient) {
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    if (apiKey && validateApiKey(apiKey)) {
      initializeOpenAI(apiKey);
    } else {
      throw new Error('OpenAI API key not configured. Please add your API key to the .env file.');
    }
  }
  return openaiClient;
};

/**
 * Generate complete portfolio from a single prompt
 */
export const generateCompletePortfolio = async (userPrompt, progressCallback) => {
  // Sanitize input
  const sanitizedPrompt = sanitizeInput(userPrompt);
  
  if (!sanitizedPrompt || sanitizedPrompt.length < 50) {
    throw new Error('Please provide a more detailed description (at least 50 characters).');
  }

  if (sanitizedPrompt.length > 3000) {
    throw new Error('Description is too long. Maximum 3000 characters.');
  }

  const systemPrompt = `You are an expert portfolio builder. Generate a complete professional portfolio based on the user's description. 

Return a valid JSON object with this exact structure:
{
  "personalInfo": {
    "fullName": "string",
    "title": "string",
    "email": "string (generate professional email)",
    "phone": "string (optional)",
    "location": "string",
    "website": "string (optional)",
    "linkedin": "string (optional)",
    "github": "string (optional)",
    "twitter": "string (optional)",
    "bio": "string (2-3 compelling sentences)"
  },
  "experience": [
    {
      "position": "string",
      "company": "string",
      "location": "string",
      "startDate": "YYYY-MM",
      "endDate": "YYYY-MM or empty for current",
      "current": boolean,
      "description": "string (detailed achievements and responsibilities)"
    }
  ],
  "education": [
    {
      "degree": "string",
      "institution": "string",
      "location": "string",
      "year": "string (YYYY or YYYY-YYYY)",
      "gpa": "string (optional)"
    }
  ],
  "skills": [
    {
      "name": "string",
      "category": "Technical|Soft Skills|Tools|Languages|Other",
      "level": "Beginner|Intermediate|Advanced|Expert"
    }
  ],
  "projects": [
    {
      "name": "string",
      "description": "string (detailed project description)",
      "technologies": "string (comma-separated)",
      "liveUrl": "string (optional, use https://example.com if not provided)",
      "githubUrl": "string (optional, use https://github.com/username/repo if not provided)"
    }
  ],
  "certifications": [
    {
      "name": "string",
      "issuer": "string",
      "year": "string",
      "credentialUrl": "string (optional)"
    }
  ]
}

IMPORTANT RULES:
1. Generate realistic, professional content
2. Include at least 2-3 work experiences
3. Include 3-5 projects
4. Include 8-15 relevant skills
5. Make descriptions detailed and achievement-focused
6. Use professional language
7. Ensure all dates are realistic
8. Return ONLY valid JSON, no markdown or extra text
9. If information is not provided, infer realistic details based on the role/industry
10. Make sure all arrays have at least one item`;

  const apiCall = async () => {
    const client = getClient();
    
    progressCallback?.('Analyzing your description...');
    
    const response = await client.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: systemPrompt,
        },
        {
          role: 'user',
          content: `Generate a complete professional portfolio for: ${sanitizedPrompt}

Important: Return ONLY a valid JSON object, no other text.`,
        },
      ],
      temperature: 0.8,
      max_tokens: 4000,
    });

    const content = response.choices[0]?.message?.content?.trim();
    
    if (!content) {
      throw new Error('No response from AI');
    }

    // Extract JSON if wrapped in markdown code blocks
    let jsonContent = content;
    const jsonMatch = content.match(/```(?:json)?\s*(\{[\s\S]*\})\s*```/);
    if (jsonMatch) {
      jsonContent = jsonMatch[1];
    }

    // Parse and validate JSON
    let portfolioData;
    try {
      portfolioData = JSON.parse(jsonContent);
    } catch (e) {
      console.error('JSON parse error:', e);
      console.error('Content:', jsonContent);
      throw new Error('Failed to parse AI response. Please try again with a different description.');
    }

    // Validate required fields
    if (!portfolioData.personalInfo || !portfolioData.personalInfo.fullName) {
      throw new Error('Invalid portfolio data generated. Please try again.');
    }

    // Ensure arrays exist
    portfolioData.experience = portfolioData.experience || [];
    portfolioData.education = portfolioData.education || [];
    portfolioData.skills = portfolioData.skills || [];
    portfolioData.projects = portfolioData.projects || [];
    portfolioData.certifications = portfolioData.certifications || [];
    portfolioData.theme = 'minimal';

    return portfolioData;
  };

  progressCallback?.('Generating your portfolio...');
  
  const result = await safeApiCall(apiCall, 60000); // 60 second timeout

  if (!result.success) {
    throw new Error(result.error);
  }

  progressCallback?.('Finalizing...');

  return result.data;
};

/**
 * Refine text using AI with safety checks
 */
export const refineTextWithAI = async (text, type = 'general') => {
  // Rate limiting check
  if (!aiRateLimiter.canMakeRequest()) {
    const resetTime = Math.ceil(aiRateLimiter.getResetTime() / 1000);
    throw new Error(`Rate limit exceeded. Please wait ${resetTime} seconds.`);
  }

  // Sanitize input
  const sanitizedText = sanitizeInput(text);
  
  if (!sanitizedText || sanitizedText.length < 10) {
    throw new Error('Text is too short to refine');
  }

  if (sanitizedText.length > 2000) {
    throw new Error('Text is too long. Maximum 2000 characters.');
  }

  const prompts = {
    bio: `Refine this professional bio to be compelling and concise (max 150 words). Make it sound natural and human, not AI-generated:\n\n${sanitizedText}`,
    description: `Improve this description to be clear, professional, and engaging (max 200 words). Keep it authentic:\n\n${sanitizedText}`,
    title: `Refine this professional title to be clear and impactful (max 10 words):\n\n${sanitizedText}`,
    general: `Improve this text to be more professional and well-written while maintaining authenticity:\n\n${sanitizedText}`,
  };

  const prompt = prompts[type] || prompts.general;

  const apiCall = async () => {
    const client = getClient();
    const response = await client.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a professional career advisor helping refine portfolio content. Be concise, authentic, and professional. Avoid clichés and AI-sounding language.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    return response.choices[0]?.message?.content?.trim() || sanitizedText;
  };

  const result = await safeApiCall(apiCall, 30000);

  if (!result.success) {
    throw new Error(result.error);
  }

  // Record successful request for rate limiting
  aiRateLimiter.recordRequest();

  return sanitizeInput(result.data);
};

/**
 * Generate project description using AI
 */
export const generateProjectDescription = async (projectName, technologies) => {
  if (!aiRateLimiter.canMakeRequest()) {
    const resetTime = Math.ceil(aiRateLimiter.getResetTime() / 1000);
    throw new Error(`Rate limit exceeded. Please wait ${resetTime} seconds.`);
  }

  const sanitizedName = sanitizeInput(projectName);
  const sanitizedTech = Array.isArray(technologies) 
    ? technologies.map(sanitizeInput).join(', ')
    : sanitizeInput(technologies);

  const apiCall = async () => {
    const client = getClient();
    const response = await client.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are helping create professional project descriptions. Be concise and focus on value and impact.',
        },
        {
          role: 'user',
          content: `Create a brief, professional description (2-3 sentences) for a project called "${sanitizedName}" built with ${sanitizedTech}. Focus on what problem it solves.`,
        },
      ],
      temperature: 0.7,
      max_tokens: 200,
    });

    return response.choices[0]?.message?.content?.trim();
  };

  const result = await safeApiCall(apiCall, 30000);

  if (!result.success) {
    throw new Error(result.error);
  }

  aiRateLimiter.recordRequest();
  return sanitizeInput(result.data);
};

/**
 * Get AI suggestions for skills based on experience
 */
export const suggestSkills = async (experience, education) => {
  if (!aiRateLimiter.canMakeRequest()) {
    const resetTime = Math.ceil(aiRateLimiter.getResetTime() / 1000);
    throw new Error(`Rate limit exceeded. Please wait ${resetTime} seconds.`);
  }

  const context = `Experience: ${JSON.stringify(experience).substring(0, 500)}\nEducation: ${JSON.stringify(education).substring(0, 300)}`;

  const apiCall = async () => {
    const client = getClient();
    const response = await client.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a career advisor suggesting relevant professional skills. Return only a comma-separated list of 8-12 skills.',
        },
        {
          role: 'user',
          content: `Based on this background, suggest relevant professional skills:\n${context}`,
        },
      ],
      temperature: 0.7,
      max_tokens: 150,
    });

    return response.choices[0]?.message?.content?.trim();
  };

  const result = await safeApiCall(apiCall, 30000);

  if (!result.success) {
    throw new Error(result.error);
  }

  aiRateLimiter.recordRequest();
  
  return result.data
    .split(',')
    .map(skill => sanitizeInput(skill))
    .filter(skill => skill.length > 0)
    .slice(0, 12);
};

/**
 * Check remaining AI requests
 */
export const getAIQuota = () => {
  return {
    remaining: aiRateLimiter.getRemainingRequests(),
    resetTime: aiRateLimiter.getResetTime(),
  };
};
