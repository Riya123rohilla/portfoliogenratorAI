import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

/**
 * Export portfolio as standalone HTML file
 */
export const exportAsHTML = (portfolioData, theme) => {
  const html = generatePortfolioHTML(portfolioData, theme);
  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${portfolioData.personalInfo.fullName.replace(/\s+/g, '-').toLowerCase()}-portfolio.html`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

/**
 * Export portfolio as React component template
 */
export const exportAsReact = (portfolioData, theme) => {
  const reactCode = generateReactTemplate(portfolioData, theme);
  const blob = new Blob([reactCode], { type: 'text/javascript' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `Portfolio.jsx`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

/**
 * Export portfolio as PDF
 */
export const exportAsPDF = async (elementId, filename) => {
  try {
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error('Portfolio element not found');
    }

    // Temporarily adjust for better PDF rendering
    const originalWidth = element.style.width;
    element.style.width = '1200px';

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
    });

    // Restore original width
    element.style.width = originalWidth;

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const imgWidth = 210; // A4 width in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= 297; // A4 height in mm

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= 297;
    }

    pdf.save(filename);
  } catch (error) {
    console.error('PDF export failed:', error);
    throw new Error('Failed to generate PDF. Please try again.');
  }
};

/**
 * Generate standalone HTML file content
 */
const generatePortfolioHTML = (data, theme) => {
  const styles = getThemeStyles(theme);
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${data.personalInfo.fullName} - Portfolio</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      line-height: 1.6;
      color: #333;
      background: ${styles.background};
    }
    
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
    }
    
    header {
      text-align: center;
      padding: 3rem 0;
      background: ${styles.headerBg};
      color: ${styles.headerText};
      margin-bottom: 3rem;
    }
    
    h1 {
      font-size: 2.5rem;
      margin-bottom: 0.5rem;
    }
    
    .title {
      font-size: 1.5rem;
      opacity: 0.9;
      margin-bottom: 1rem;
    }
    
    .contact-info {
      display: flex;
      gap: 1.5rem;
      justify-content: center;
      flex-wrap: wrap;
      margin-top: 1.5rem;
    }
    
    .contact-info a {
      color: ${styles.linkColor};
      text-decoration: none;
    }
    
    section {
      margin-bottom: 3rem;
    }
    
    h2 {
      font-size: 2rem;
      margin-bottom: 1.5rem;
      color: ${styles.headingColor};
      border-bottom: 3px solid ${styles.accentColor};
      padding-bottom: 0.5rem;
    }
    
    .bio {
      font-size: 1.1rem;
      line-height: 1.8;
      color: #555;
    }
    
    .experience-item, .education-item, .project-item {
      margin-bottom: 2rem;
      padding: 1.5rem;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    
    .item-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 0.5rem;
    }
    
    .item-title {
      font-size: 1.3rem;
      font-weight: 600;
      color: ${styles.headingColor};
    }
    
    .item-subtitle {
      color: #666;
      margin-bottom: 0.5rem;
    }
    
    .item-date {
      color: #888;
      font-size: 0.9rem;
    }
    
    .skills-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
      gap: 1rem;
    }
    
    .skill-item {
      background: ${styles.skillBg};
      padding: 0.75rem 1rem;
      border-radius: 6px;
      text-align: center;
      font-weight: 500;
      color: ${styles.skillText};
    }
    
    .project-links {
      margin-top: 1rem;
      display: flex;
      gap: 1rem;
    }
    
    .project-link {
      padding: 0.5rem 1rem;
      background: ${styles.accentColor};
      color: white;
      text-decoration: none;
      border-radius: 6px;
      font-size: 0.9rem;
    }
    
    @media print {
      .container {
        padding: 0;
      }
      section {
        page-break-inside: avoid;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <h1>${data.personalInfo.fullName}</h1>
      <div class="title">${data.personalInfo.title}</div>
      <div class="contact-info">
        ${data.personalInfo.email ? `<span>✉️ ${data.personalInfo.email}</span>` : ''}
        ${data.personalInfo.phone ? `<span>📱 ${data.personalInfo.phone}</span>` : ''}
        ${data.personalInfo.location ? `<span>📍 ${data.personalInfo.location}</span>` : ''}
        ${data.personalInfo.website ? `<a href="${data.personalInfo.website}" target="_blank">🌐 Website</a>` : ''}
        ${data.personalInfo.linkedin ? `<a href="${data.personalInfo.linkedin}" target="_blank">💼 LinkedIn</a>` : ''}
        ${data.personalInfo.github ? `<a href="${data.personalInfo.github}" target="_blank">💻 GitHub</a>` : ''}
      </div>
    </header>
    
    ${data.personalInfo.bio ? `
    <section>
      <h2>About Me</h2>
      <p class="bio">${data.personalInfo.bio}</p>
    </section>
    ` : ''}
    
    ${data.experience && data.experience.length > 0 ? `
    <section>
      <h2>Experience</h2>
      ${data.experience.map(exp => `
        <div class="experience-item">
          <div class="item-header">
            <div>
              <div class="item-title">${exp.position}</div>
              <div class="item-subtitle">${exp.company} ${exp.location ? `• ${exp.location}` : ''}</div>
            </div>
            <div class="item-date">${exp.startDate} - ${exp.endDate || 'Present'}</div>
          </div>
          ${exp.description ? `<p>${exp.description}</p>` : ''}
        </div>
      `).join('')}
    </section>
    ` : ''}
    
    ${data.projects && data.projects.length > 0 ? `
    <section>
      <h2>Projects</h2>
      ${data.projects.map(project => `
        <div class="project-item">
          <div class="item-title">${project.name}</div>
          ${project.description ? `<p>${project.description}</p>` : ''}
          ${project.technologies ? `<p><strong>Technologies:</strong> ${project.technologies}</p>` : ''}
          <div class="project-links">
            ${project.liveUrl ? `<a href="${project.liveUrl}" target="_blank" class="project-link">Live Demo</a>` : ''}
            ${project.githubUrl ? `<a href="${project.githubUrl}" target="_blank" class="project-link">GitHub</a>` : ''}
          </div>
        </div>
      `).join('')}
    </section>
    ` : ''}
    
    ${data.skills && data.skills.length > 0 ? `
    <section>
      <h2>Skills</h2>
      <div class="skills-grid">
        ${data.skills.map(skill => `<div class="skill-item">${skill.name}</div>`).join('')}
      </div>
    </section>
    ` : ''}
    
    ${data.education && data.education.length > 0 ? `
    <section>
      <h2>Education</h2>
      ${data.education.map(edu => `
        <div class="education-item">
          <div class="item-header">
            <div>
              <div class="item-title">${edu.degree}</div>
              <div class="item-subtitle">${edu.institution}</div>
            </div>
            <div class="item-date">${edu.year}</div>
          </div>
        </div>
      `).join('')}
    </section>
    ` : ''}
    
    ${data.certifications && data.certifications.length > 0 ? `
    <section>
      <h2>Certifications</h2>
      ${data.certifications.map(cert => `
        <div class="education-item">
          <div class="item-title">${cert.name}</div>
          <div class="item-subtitle">${cert.issuer} • ${cert.year}</div>
        </div>
      `).join('')}
    </section>
    ` : ''}
  </div>
</body>
</html>`;
};

/**
 * Generate React component template
 */
const generateReactTemplate = (data, theme) => {
  return `import React from 'react';

const portfolioData = ${JSON.stringify(data, null, 2)};

const Portfolio = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-2">{portfolioData.personalInfo.fullName}</h1>
          <p className="text-2xl mb-6">{portfolioData.personalInfo.title}</p>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            {portfolioData.personalInfo.email && (
              <span>✉️ {portfolioData.personalInfo.email}</span>
            )}
            {portfolioData.personalInfo.phone && (
              <span>📱 {portfolioData.personalInfo.phone}</span>
            )}
            {portfolioData.personalInfo.location && (
              <span>📍 {portfolioData.personalInfo.location}</span>
            )}
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        {/* Bio */}
        {portfolioData.personalInfo.bio && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">About Me</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              {portfolioData.personalInfo.bio}
            </p>
          </section>
        )}

        {/* Experience */}
        {portfolioData.experience.length > 0 && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Experience</h2>
            <div className="space-y-6">
              {portfolioData.experience.map((exp, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-xl font-semibold">{exp.position}</h3>
                      <p className="text-gray-600">{exp.company}</p>
                    </div>
                    <span className="text-sm text-gray-500">
                      {exp.startDate} - {exp.endDate || 'Present'}
                    </span>
                  </div>
                  {exp.description && <p className="text-gray-700 mt-2">{exp.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {portfolioData.projects.length > 0 && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Projects</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {portfolioData.projects.map((project, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold mb-2">{project.name}</h3>
                  {project.description && (
                    <p className="text-gray-700 mb-3">{project.description}</p>
                  )}
                  {project.technologies && (
                    <p className="text-sm text-gray-600 mb-3">
                      <strong>Tech:</strong> {project.technologies}
                    </p>
                  )}
                  <div className="flex gap-3">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        Live Demo →
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        GitHub →
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {portfolioData.skills.length > 0 && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Skills</h2>
            <div className="flex flex-wrap gap-3">
              {portfolioData.skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-medium"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default Portfolio;
`;
};

/**
 * Get theme-specific styles
 */
const getThemeStyles = (theme) => {
  const themes = {
    minimal: {
      background: '#ffffff',
      headerBg: '#1f2937',
      headerText: '#ffffff',
      headingColor: '#1f2937',
      accentColor: '#3b82f6',
      linkColor: '#3b82f6',
      skillBg: '#f3f4f6',
      skillText: '#1f2937',
    },
    modern: {
      background: '#f9fafb',
      headerBg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      headerText: '#ffffff',
      headingColor: '#111827',
      accentColor: '#8b5cf6',
      linkColor: '#8b5cf6',
      skillBg: '#ede9fe',
      skillText: '#6d28d9',
    },
    creative: {
      background: '#fef3c7',
      headerBg: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
      headerText: '#ffffff',
      headingColor: '#92400e',
      accentColor: '#f59e0b',
      linkColor: '#dc2626',
      skillBg: '#fef3c7',
      skillText: '#92400e',
    },
  };

  return themes[theme] || themes.minimal;
};
