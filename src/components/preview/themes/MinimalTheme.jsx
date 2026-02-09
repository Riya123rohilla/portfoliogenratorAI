import React from 'react';
import { Mail, Phone, MapPin, Globe, Linkedin, Github, Twitter, ExternalLink } from 'lucide-react';

const MinimalTheme = ({ data }) => {
  const { personalInfo, experience, education, skills, projects, certifications } = data;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-gray-900 text-white py-16 px-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-5xl font-bold mb-3">{personalInfo.fullName || 'Your Name'}</h1>
          <p className="text-2xl text-gray-300 mb-6">{personalInfo.title || 'Your Title'}</p>
          
          <div className="flex flex-wrap gap-6 text-sm">
            {personalInfo.email && (
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>{personalInfo.email}</span>
              </div>
            )}
            {personalInfo.phone && (
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>{personalInfo.phone}</span>
              </div>
            )}
            {personalInfo.location && (
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>{personalInfo.location}</span>
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-4 mt-6">
            {personalInfo.website && (
              <a href={personalInfo.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-blue-400 hover:text-blue-300">
                <Globe className="w-4 h-4" />
                <span className="text-sm">Website</span>
              </a>
            )}
            {personalInfo.linkedin && (
              <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-blue-400 hover:text-blue-300">
                <Linkedin className="w-4 h-4" />
                <span className="text-sm">LinkedIn</span>
              </a>
            )}
            {personalInfo.github && (
              <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-blue-400 hover:text-blue-300">
                <Github className="w-4 h-4" />
                <span className="text-sm">GitHub</span>
              </a>
            )}
            {personalInfo.twitter && (
              <a href={personalInfo.twitter} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-blue-400 hover:text-blue-300">
                <Twitter className="w-4 h-4" />
                <span className="text-sm">Twitter</span>
              </a>
            )}
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-8 py-12">
        {/* Bio */}
        {personalInfo.bio && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 pb-2 border-b-4 border-blue-600">About Me</h2>
            <p className="text-lg text-gray-700 leading-relaxed">{personalInfo.bio}</p>
          </section>
        )}

        {/* Experience */}
        {experience && experience.length > 0 && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-2 border-b-4 border-blue-600">Experience</h2>
            <div className="space-y-8">
              {experience.map((exp, index) => (
                <div key={index} className="bg-white border-l-4 border-gray-300 pl-6 py-2">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{exp.position}</h3>
                      <p className="text-gray-700">{exp.company}{exp.location ? ` • ${exp.location}` : ''}</p>
                    </div>
                    <span className="text-sm text-gray-600 whitespace-nowrap">
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  {exp.description && <p className="text-gray-600 mt-2">{exp.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects && projects.length > 0 && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-2 border-b-4 border-blue-600">Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((project, index) => (
                <div key={index} className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{project.name}</h3>
                  {project.description && <p className="text-gray-700 mb-3">{project.description}</p>}
                  {project.technologies && (
                    <p className="text-sm text-gray-600 mb-3">
                      <strong>Technologies:</strong> {project.technologies}
                    </p>
                  )}
                  <div className="flex gap-3">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700 text-sm flex items-center gap-1"
                      >
                        Live Demo <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700 text-sm flex items-center gap-1"
                      >
                        GitHub <ExternalLink className="w-3 h-3" />
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
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-2 border-b-4 border-blue-600">Skills</h2>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-gray-100 text-gray-800 rounded-md font-medium text-sm"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {education && education.length > 0 && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-2 border-b-4 border-blue-600">Education</h2>
            <div className="space-y-6">
              {education.map((edu, index) => (
                <div key={index} className="bg-white border-l-4 border-gray-300 pl-6 py-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{edu.degree}</h3>
                      <p className="text-gray-700">{edu.institution}</p>
                      {edu.gpa && <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>}
                    </div>
                    <span className="text-sm text-gray-600 whitespace-nowrap">{edu.year}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Certifications */}
        {certifications && certifications.length > 0 && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-2 border-b-4 border-blue-600">Certifications</h2>
            <div className="space-y-4">
              {certifications.map((cert, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <h3 className="font-semibold text-gray-900">{cert.name}</h3>
                  <p className="text-gray-700 text-sm">{cert.issuer} • {cert.year}</p>
                  {cert.credentialUrl && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700 text-sm flex items-center gap-1 mt-2"
                    >
                      View Credential <ExternalLink className="w-3 h-3" />
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

export default MinimalTheme;
