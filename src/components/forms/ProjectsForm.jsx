import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { refineTextWithAI, generateProjectDescription } from '../../utils/aiService';
import toast from 'react-hot-toast';
import { ArrowRight, ArrowLeft, Plus, Trash2, Sparkles, Loader2, ExternalLink } from 'lucide-react';

const ProjectsForm = () => {
  const { portfolioData, updateProjects, nextStep, prevStep, setIsAIProcessing, isAIProcessing } = usePortfolio();
  const [projects, setProjects] = useState(
    portfolioData.projects.length > 0
      ? portfolioData.projects
      : [{ name: '', description: '', technologies: '', liveUrl: '', githubUrl: '' }]
  );
  const [refiningIndex, setRefiningIndex] = useState(null);
  const [generatingIndex, setGeneratingIndex] = useState(null);

  const addProject = () => {
    setProjects([
      ...projects,
      { name: '', description: '', technologies: '', liveUrl: '', githubUrl: '' },
    ]);
  };

  const removeProject = (index) => {
    if (projects.length > 1) {
      setProjects(projects.filter((_, i) => i !== index));
    }
  };

  const handleChange = (index, field, value) => {
    const updated = [...projects];
    updated[index][field] = value;
    setProjects(updated);
  };

  const handleRefineDescription = async (index) => {
    const project = projects[index];
    
    if (!project.description || project.description.trim().length < 10) {
      toast.error('Please enter at least 10 characters to refine');
      return;
    }

    setRefiningIndex(index);
    setIsAIProcessing(true);

    try {
      const refined = await refineTextWithAI(project.description, 'description');
      handleChange(index, 'description', refined);
      toast.success('Description refined successfully!');
    } catch (error) {
      toast.error(error.message || 'Failed to refine description');
    } finally {
      setRefiningIndex(null);
      setIsAIProcessing(false);
    }
  };

  const handleGenerateDescription = async (index) => {
    const project = projects[index];
    
    if (!project.name || !project.technologies) {
      toast.error('Please enter project name and technologies first');
      return;
    }

    setGeneratingIndex(index);
    setIsAIProcessing(true);

    try {
      const generated = await generateProjectDescription(project.name, project.technologies);
      handleChange(index, 'description', generated);
      toast.success('Description generated successfully!');
    } catch (error) {
      toast.error(error.message || 'Failed to generate description');
    } finally {
      setGeneratingIndex(null);
      setIsAIProcessing(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const validProjects = projects.filter(
      proj => proj.name && proj.description
    );

    updateProjects(validProjects);
    toast.success('Projects saved!');
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Projects</h2>
        <p className="text-gray-600">Showcase your best work</p>
      </div>

      <div className="space-y-8">
        {projects.map((project, index) => (
          <div key={index} className="p-6 bg-gray-50 rounded-xl border-2 border-gray-200 relative">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Project #{index + 1}
              </h3>
              {projects.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeProject(index)}
                  className="text-red-600 hover:text-red-700 transition-colors p-2"
                  title="Remove"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              )}
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Project Name
                  </label>
                  <input
                    type="text"
                    value={project.name}
                    onChange={(e) => handleChange(index, 'name', e.target.value)}
                    className="input-field"
                    placeholder="E-commerce Platform"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Technologies Used
                  </label>
                  <input
                    type="text"
                    value={project.technologies}
                    onChange={(e) => handleChange(index, 'technologies', e.target.value)}
                    className="input-field"
                    placeholder="React, Node.js, MongoDB"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Live URL
                  </label>
                  <div className="relative">
                    <input
                      type="url"
                      value={project.liveUrl}
                      onChange={(e) => handleChange(index, 'liveUrl', e.target.value)}
                      className="input-field pr-10"
                      placeholder="https://myproject.com"
                    />
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-primary-600 hover:text-primary-700"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    GitHub URL
                  </label>
                  <div className="relative">
                    <input
                      type="url"
                      value={project.githubUrl}
                      onChange={(e) => handleChange(index, 'githubUrl', e.target.value)}
                      className="input-field pr-10"
                      placeholder="https://github.com/username/repo"
                    />
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-primary-600 hover:text-primary-700"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project Description
                </label>
                <textarea
                  value={project.description}
                  onChange={(e) => handleChange(index, 'description', e.target.value)}
                  rows="4"
                  className="input-field resize-none"
                  placeholder="Describe what the project does, the problem it solves, and your role..."
                />
                <div className="flex justify-end gap-2 mt-2">
                  <button
                    type="button"
                    onClick={() => handleGenerateDescription(index)}
                    disabled={generatingIndex === index || isAIProcessing}
                    className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white text-sm rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all disabled:opacity-50 flex items-center gap-2"
                  >
                    {generatingIndex === index ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        Generate Description
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRefineDescription(index)}
                    disabled={refiningIndex === index || isAIProcessing}
                    className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all disabled:opacity-50 flex items-center gap-2"
                  >
                    {refiningIndex === index ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Refining...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        Refine Description
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={addProject}
        className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-primary-500 hover:text-primary-600 transition-colors flex items-center justify-center gap-2 font-medium"
      >
        <Plus className="w-5 h-5" />
        Add Another Project
      </button>

      <div className="flex justify-between pt-6 border-t border-gray-200">
        <button
          type="button"
          onClick={prevStep}
          className="btn-secondary flex items-center gap-2"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>
        <button
          type="submit"
          className="btn-primary flex items-center gap-2"
        >
          Continue
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </form>
  );
};

export default ProjectsForm;
