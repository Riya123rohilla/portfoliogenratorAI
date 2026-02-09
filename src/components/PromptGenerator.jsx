import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { generateMockPortfolio } from '../utils/mockAiService';
import toast from 'react-hot-toast';
import { Sparkles, Loader2, Zap, FileText, Briefcase, GraduationCap } from 'lucide-react';

const PromptGenerator = ({ onGenerated }) => {
  const { setIsGenerating, setGenerationStep, updatePortfolioData } = usePortfolio();
  const [prompt, setPrompt] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState('');

  const examplePrompts = [
    "I'm a Senior Full Stack Developer with 5 years of experience in React, Node.js, and AWS. I've worked at tech startups building scalable web applications. I have a Computer Science degree from MIT and love creating open-source projects.",
    "Experienced Data Scientist with expertise in Python, Machine Learning, and big data analytics. Worked at Google and Facebook on recommendation systems. PhD in Statistics from Stanford. Published research in AI conferences.",
    "Creative UI/UX Designer with 7 years experience designing mobile apps and web platforms. Proficient in Figma, Adobe XD, and prototyping. Led design teams at Apple and Airbnb. Passionate about accessibility and user research.",
    "DevOps Engineer specializing in Kubernetes, Docker, and CI/CD pipelines. 4 years at Amazon building cloud infrastructure. Certified AWS Solutions Architect. Built automation tools used by thousands of developers.",
  ];

  const handleUseExample = (example) => {
    setPrompt(example);
  };

  const handleGenerate = async () => {
    if (!prompt || prompt.length < 50) {
      toast.error('Please provide a more detailed description (at least 50 characters)');
      return;
    }

    setIsProcessing(true);
    setIsGenerating(true);
    setProgress('Initializing AI...');

    try {
      const portfolioData = await generateMockPortfolio(prompt, (step) => {
        setProgress(step);
        setGenerationStep(step);
      });

      updatePortfolioData(portfolioData);
      toast.success('🎉 Portfolio generated successfully!');
      onGenerated();
    } catch (error) {
      console.error('Generation error:', error);
      toast.error(error.message || 'Failed to generate portfolio. Please try again.');
    } finally {
      setIsProcessing(false);
      setIsGenerating(false);
      setProgress('');
      setGenerationStep('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-3 rounded-2xl">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl font-black text-gray-900">
              AI Portfolio Generator
            </h1>
          </div>
          <p className="text-2xl text-gray-600 font-medium">
            Describe yourself, and AI will create your complete professional portfolio
          </p>
        </div>

        {/* Free AI Notice */}
        <div className="mb-6 p-4 bg-gradient-to-r from-green-100 to-emerald-100 rounded-2xl border-2 border-green-300">
          <p className="text-center text-sm font-semibold text-green-800">
            ✨ <strong>FREE Mock AI Mode</strong> - No API key required! Get instant professional portfolios.
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-2xl border-4 border-purple-200 p-8 md:p-12 animate-slide-up">
          {!isProcessing ? (
            <>
              {/* Prompt Input */}
              <div className="mb-8">
                <label className="block text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Zap className="w-6 h-6 text-purple-600" />
                  Tell us about yourself
                </label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  rows="8"
                  className="w-full px-6 py-4 border-3 border-gray-300 rounded-2xl focus:ring-4 focus:ring-purple-500 focus:border-transparent outline-none transition-all text-lg resize-none"
                  placeholder="Example: I'm a Senior Software Engineer with 5 years of experience in React and Node.js. I've worked at tech startups building scalable web applications. I have a Computer Science degree and love creating open-source projects. I'm passionate about clean code and mentoring junior developers..."
                />
                <div className="flex justify-between items-center mt-3">
                  <span className="text-sm text-gray-500">
                    {prompt.length} / 3000 characters (minimum 50)
                  </span>
                  <span className="text-sm font-medium text-purple-600">
                    Include: Skills • Experience • Education • Projects
                  </span>
                </div>
              </div>

              {/* Example Prompts */}
              <div className="mb-8">
                <h3 className="text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">
                  ⚡ Quick Start Examples:
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {examplePrompts.map((example, index) => (
                    <button
                      key={index}
                      onClick={() => handleUseExample(example)}
                      className="text-left p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl border-2 border-purple-200 hover:border-purple-400 hover:shadow-lg transition-all group"
                    >
                      <p className="text-sm text-gray-700 line-clamp-2 group-hover:text-gray-900">
                        {example.substring(0, 100)}...
                      </p>
                      <span className="text-xs text-purple-600 font-semibold mt-2 inline-block">
                        Click to use →
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div className="mb-8 p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border-2 border-green-200">
                <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-green-600" />
                  What AI Will Generate:
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-green-200 rounded-full flex items-center justify-center">
                      <FileText className="w-4 h-4 text-green-700" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">Personal Info & Bio</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-200 rounded-full flex items-center justify-center">
                      <Briefcase className="w-4 h-4 text-blue-700" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">Work Experience</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-purple-200 rounded-full flex items-center justify-center">
                      <GraduationCap className="w-4 h-4 text-purple-700" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">Education</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-yellow-200 rounded-full flex items-center justify-center">
                      <Zap className="w-4 h-4 text-yellow-700" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">Skills & Expertise</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-pink-200 rounded-full flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-pink-700" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">Projects</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-indigo-200 rounded-full flex items-center justify-center">
                      <FileText className="w-4 h-4 text-indigo-700" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">Certifications</span>
                  </div>
                </div>
              </div>

              {/* Generate Button */}
              <button
                onClick={handleGenerate}
                disabled={prompt.length < 50}
                className="w-full py-6 px-8 bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 text-white text-xl font-bold rounded-2xl hover:from-purple-700 hover:via-blue-700 hover:to-pink-700 transition-all shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 transform hover:scale-105 active:scale-100"
              >
                <Sparkles className="w-7 h-7" />
                Generate My Portfolio with AI
                <Sparkles className="w-7 h-7" />
              </button>

              <p className="text-center text-sm text-gray-500 mt-4">
                Powered by OpenAI GPT-4 • Takes 10-20 seconds
              </p>
            </>
          ) : (
            <>
              {/* Loading State */}
              <div className="text-center py-12">
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    <Loader2 className="w-20 h-20 text-purple-600 animate-spin" />
                    <Sparkles className="w-10 h-10 text-yellow-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse" />
                  </div>
                </div>
                
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  Creating Your Portfolio...
                </h3>
                
                <p className="text-xl text-purple-600 font-semibold mb-8 animate-pulse">
                  {progress || 'Initializing AI...'}
                </p>

                <div className="max-w-md mx-auto">
                  <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 rounded-full animate-pulse w-3/4"></div>
                  </div>
                </div>

                <p className="text-sm text-gray-500 mt-6">
                  This may take 10-20 seconds. Please don't close this page.
                </p>
              </div>
            </>
          )}
        </div>

        {/* Footer Note */}
        <div className="text-center mt-8 text-sm text-gray-600">
          <p>
            💡 <strong>Tip:</strong> The more detailed your description, the better your portfolio will be!
          </p>
        </div>
      </div>
    </div>
  );
};

export default PromptGenerator;
