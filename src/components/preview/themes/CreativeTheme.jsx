import React from 'react';
import { Mail, Phone, MapPin, Globe, Linkedin, Github, Twitter, ExternalLink, Star } from 'lucide-react';

const CreativeTheme = ({ data }) => {
  const { personalInfo, experience, education, skills, projects, certifications } = data;

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50">
      {/* Creative Header */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 opacity-90"></div>
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-yellow-300 rounded-full opacity-30 animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-pink-300 rounded-full opacity-30 animate-pulse delay-75"></div>
        </div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-8 py-24 text-white">
          <div className="flex items-center gap-3 mb-4">
            <Star className="w-10 h-10 fill-yellow-300 text-yellow-300 animate-pulse" />
            <h1 className="text-7xl font-black tracking-tight">{personalInfo.fullName || 'Your Name'}</h1>
          </div>
          <p className="text-4xl font-bold text-yellow-100 mb-8 italic">{personalInfo.title || 'Your Title'}</p>
          
          <div className="flex flex-wrap gap-6 text-lg">
            {personalInfo.email && (
              <div className="flex items-center gap-2 bg-white bg-opacity-25 backdrop-blur-lg px-5 py-3 rounded-2xl shadow-lg">
                <Mail className="w-5 h-5" />
                <span className="font-semibold">{personalInfo.email}</span>
              </div>
            )}
            {personalInfo.phone && (
              <div className="flex items-center gap-2 bg-white bg-opacity-25 backdrop-blur-lg px-5 py-3 rounded-2xl shadow-lg">
                <Phone className="w-5 h-5" />
                <span className="font-semibold">{personalInfo.phone}</span>
              </div>
            )}
            {personalInfo.location && (
              <div className="flex items-center gap-2 bg-white bg-opacity-25 backdrop-blur-lg px-5 py-3 rounded-2xl shadow-lg">
                <MapPin className="w-5 h-5" />
                <span className="font-semibold">{personalInfo.location}</span>
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-4 mt-8">
            {personalInfo.website && (
              <a href={personalInfo.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-yellow-400 text-gray-900 px-7 py-4 rounded-2xl font-bold hover:shadow-2xl transition-all transform hover:scale-105">
                <Globe className="w-6 h-6" />
                <span>Website</span>
              </a>
            )}
            {personalInfo.linkedin && (
              <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-yellow-400 text-gray-900 px-7 py-4 rounded-2xl font-bold hover:shadow-2xl transition-all transform hover:scale-105">
                <Linkedin className="w-6 h-6" />
                <span>LinkedIn</span>
              </a>
            )}
            {personalInfo.github && (
              <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-yellow-400 text-gray-900 px-7 py-4 rounded-2xl font-bold hover:shadow-2xl transition-all transform hover:scale-105">
                <Github className="w-6 h-6" />
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
            <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-3xl shadow-2xl p-10 border-4 border-orange-300 transform rotate-1">
              <h2 className="text-5xl font-black text-orange-900 mb-6 -rotate-1">About Me</h2>
              <p className="text-2xl text-gray-800 leading-relaxed font-medium">{personalInfo.bio}</p>
            </div>
          </section>
        )}

        {/* Experience */}
        {experience && experience.length > 0 && (
          <section className="mb-16">
            <h2 className="text-5xl font-black text-orange-900 mb-10 flex items-center gap-3">
              <span className="bg-gradient-to-r from-orange-400 to-red-500 text-white px-6 py-2 rounded-2xl shadow-lg">Experience</span>
            </h2>
            <div className="space-y-8">
              {experience.map((exp, index) => (
                <div key={index} className="bg-white rounded-3xl shadow-xl p-8 border-4 border-orange-200 hover:shadow-2xl transition-all transform hover:-rotate-1">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-3xl font-black text-gray-900">{exp.position}</h3>
                      <p className="text-2xl text-orange-600 font-bold mt-1">{exp.company}</p>
                      {exp.location && <p className="text-gray-700 font-semibold mt-1">{exp.location}</p>}
                    </div>
                    <span className="px-5 py-3 bg-gradient-to-r from-orange-400 to-red-500 text-white rounded-2xl font-bold shadow-lg whitespace-nowrap">
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  {exp.description && <p className="text-gray-700 text-lg mt-4 leading-relaxed">{exp.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects && projects.length > 0 && (
          <section className="mb-16">
            <h2 className="text-5xl font-black text-orange-900 mb-10 flex items-center gap-3">
              <span className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-2 rounded-2xl shadow-lg">Projects</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projects.map((project, index) => (
                <div key={index} className="bg-gradient-to-br from-pink-100 to-purple-100 p-8 rounded-3xl shadow-xl border-4 border-pink-300 hover:shadow-2xl transition-all transform hover:rotate-1">
                  <h3 className="text-3xl font-black text-gray-900 mb-4">{project.name}</h3>
                  {project.description && <p className="text-gray-800 mb-4 text-lg leading-relaxed">{project.description}</p>}
                  {project.technologies && (
                    <div className="mb-5">
                      <p className="text-sm font-black text-purple-900 mb-2 uppercase tracking-wide">Tech Stack</p>
                      <p className="text-gray-800 font-semibold">{project.technologies}</p>
                    </div>
                  )}
                  <div className="flex gap-4">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-2xl font-bold hover:shadow-lg transition-all transform hover:scale-105 flex items-center gap-2"
                      >
                        Live Demo <ExternalLink className="w-5 h-5" />
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 bg-gray-900 text-white rounded-2xl font-bold hover:shadow-lg transition-all transform hover:scale-105 flex items-center gap-2"
                      >
                        GitHub <ExternalLink className="w-5 h-5" />
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
            <h2 className="text-5xl font-black text-orange-900 mb-10 flex items-center gap-3">
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-2 rounded-2xl shadow-lg">Skills</span>
            </h2>
            <div className="bg-white rounded-3xl shadow-2xl p-10 border-4 border-yellow-300">
              <div className="flex flex-wrap gap-4">
                {skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-7 py-4 bg-gradient-to-r from-yellow-200 to-orange-200 text-orange-900 rounded-2xl font-black text-lg border-3 border-orange-400 shadow-md transform hover:scale-110 transition-transform"
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
            <h2 className="text-5xl font-black text-orange-900 mb-10 flex items-center gap-3">
              <span className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-6 py-2 rounded-2xl shadow-lg">Education</span>
            </h2>
            <div className="space-y-8">
              {education.map((edu, index) => (
                <div key={index} className="bg-gradient-to-r from-blue-100 to-indigo-100 rounded-3xl shadow-xl p-8 border-4 border-blue-300 transform -rotate-1 hover:rotate-0 transition-transform">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-3xl font-black text-gray-900">{edu.degree}</h3>
                      <p className="text-2xl text-blue-700 font-bold mt-1">{edu.institution}</p>
                      {edu.gpa && <p className="text-gray-700 font-semibold mt-2">GPA: {edu.gpa}</p>}
                    </div>
                    <span className="px-5 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-2xl font-bold shadow-lg whitespace-nowrap">
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
            <h2 className="text-5xl font-black text-orange-900 mb-10 flex items-center gap-3">
              <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-2 rounded-2xl shadow-lg">Certifications</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {certifications.map((cert, index) => (
                <div key={index} className="bg-gradient-to-r from-green-100 to-emerald-100 p-8 rounded-3xl shadow-xl border-4 border-green-300">
                  <h3 className="text-2xl font-black text-gray-900 mb-2">{cert.name}</h3>
                  <p className="text-xl text-green-700 font-bold">{cert.issuer}</p>
                  <p className="text-gray-700 font-semibold mt-1">{cert.year}</p>
                  {cert.credentialUrl && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 mt-4 px-5 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-2xl font-bold hover:shadow-lg transition-all"
                    >
                      View Credential <ExternalLink className="w-5 h-5" />
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

export default CreativeTheme;
