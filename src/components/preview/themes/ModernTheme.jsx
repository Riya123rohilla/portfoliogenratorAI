import React from 'react';
import { Mail, Phone, MapPin, Globe, Linkedin, Github, Twitter, ExternalLink } from 'lucide-react';

const ModernTheme = ({ data }) => {
  const { personalInfo, experience, education, skills, projects, certifications } = data;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header with Gradient */}
      <header className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 text-white py-20 px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <h1 className="text-6xl font-extrabold mb-4 tracking-tight">{personalInfo.fullName || 'Your Name'}</h1>
          <p className="text-3xl text-purple-100 mb-8 font-light">{personalInfo.title || 'Your Title'}</p>
          
          <div className="flex flex-wrap gap-8 text-base">
            {personalInfo.email && (
              <div className="flex items-center gap-2 bg-white bg-opacity-20 backdrop-blur-sm px-4 py-2 rounded-full">
                <Mail className="w-5 h-5" />
                <span>{personalInfo.email}</span>
              </div>
            )}
            {personalInfo.phone && (
              <div className="flex items-center gap-2 bg-white bg-opacity-20 backdrop-blur-sm px-4 py-2 rounded-full">
                <Phone className="w-5 h-5" />
                <span>{personalInfo.phone}</span>
              </div>
            )}
            {personalInfo.location && (
              <div className="flex items-center gap-2 bg-white bg-opacity-20 backdrop-blur-sm px-4 py-2 rounded-full">
                <MapPin className="w-5 h-5" />
                <span>{personalInfo.location}</span>
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-4 mt-8">
            {personalInfo.website && (
              <a href={personalInfo.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-white text-purple-600 px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-shadow">
                <Globe className="w-5 h-5" />
                <span>Website</span>
              </a>
            )}
            {personalInfo.linkedin && (
              <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-white text-purple-600 px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-shadow">
                <Linkedin className="w-5 h-5" />
                <span>LinkedIn</span>
              </a>
            )}
            {personalInfo.github && (
              <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-white text-purple-600 px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-shadow">
                <Github className="w-5 h-5" />
                <span>GitHub</span>
              </a>
            )}
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-8 py-16">
        {/* Bio */}
        {personalInfo.bio && (
          <section className="mb-16">
            <div className="bg-white rounded-2xl shadow-xl p-8 border-l-8 border-purple-600">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">About Me</h2>
              <p className="text-xl text-gray-700 leading-relaxed">{personalInfo.bio}</p>
            </div>
          </section>
        )}

        {/* Experience */}
        {experience && experience.length > 0 && (
          <section className="mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-8">Experience</h2>
            <div className="space-y-6">
              {experience.map((exp, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-shadow border-l-8 border-blue-500">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{exp.position}</h3>
                      <p className="text-lg text-purple-600 font-semibold">{exp.company}</p>
                      {exp.location && <p className="text-gray-600">{exp.location}</p>}
                    </div>
                    <span className="px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-semibold whitespace-nowrap">
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  {exp.description && <p className="text-gray-700 mt-4 leading-relaxed">{exp.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects && projects.length > 0 && (
          <section className="mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-8">Featured Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((project, index) => (
                <div key={index} className="bg-gradient-to-br from-purple-50 to-blue-50 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all border-2 border-purple-200">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{project.name}</h3>
                  {project.description && <p className="text-gray-700 mb-4 leading-relaxed">{project.description}</p>}
                  {project.technologies && (
                    <div className="mb-4">
                      <p className="text-sm font-semibold text-purple-800 mb-2">TECHNOLOGIES</p>
                      <p className="text-gray-700">{project.technologies}</p>
                    </div>
                  )}
                  <div className="flex gap-4">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors flex items-center gap-2"
                      >
                        Live Demo <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-gray-800 text-white rounded-lg font-semibold hover:bg-gray-900 transition-colors flex items-center gap-2"
                      >
                        GitHub <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {skills && skills.length > 0 && (
          <section className="mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-8">Skills & Expertise</h2>
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="flex flex-wrap gap-4">
                {skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-6 py-3 bg-gradient-to-r from-purple-100 to-blue-100 text-purple-900 rounded-full font-semibold text-base border-2 border-purple-200"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Education */}
        {education && education.length > 0 && (
          <section className="mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-8">Education</h2>
            <div className="space-y-6">
              {education.map((edu, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-lg p-8 border-l-8 border-indigo-500">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{edu.degree}</h3>
                      <p className="text-lg text-purple-600 font-semibold">{edu.institution}</p>
                      {edu.gpa && <p className="text-gray-600 mt-1">GPA: {edu.gpa}</p>}
                    </div>
                    <span className="px-4 py-2 bg-indigo-100 text-indigo-800 rounded-full text-sm font-semibold whitespace-nowrap">
                      {edu.year}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Certifications */}
        {certifications && certifications.length > 0 && (
          <section className="mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-8">Certifications</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {certifications.map((cert, index) => (
                <div key={index} className="bg-white p-6 rounded-2xl shadow-lg border-2 border-purple-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{cert.name}</h3>
                  <p className="text-purple-600 font-semibold">{cert.issuer}</p>
                  <p className="text-gray-600 text-sm mt-1">{cert.year}</p>
                  {cert.credentialUrl && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-600 hover:text-purple-700 font-semibold text-sm flex items-center gap-1 mt-3"
                    >
                      View Credential <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ModernTheme;
