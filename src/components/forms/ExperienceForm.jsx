import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { refineTextWithAI } from '../../utils/aiService';
import toast from 'react-hot-toast';
import { ArrowRight, ArrowLeft, Plus, Trash2, Sparkles, Loader2 } from 'lucide-react';

const ExperienceForm = () => {
  const { portfolioData, updateExperience, nextStep, prevStep, setIsAIProcessing, isAIProcessing } = usePortfolio();
  const [experiences, setExperiences] = useState(
    portfolioData.experience.length > 0
      ? portfolioData.experience
      : [{ position: '', company: '', location: '', startDate: '', endDate: '', description: '', current: false }]
  );
  const [refiningIndex, setRefiningIndex] = useState(null);

  const addExperience = () => {
    setExperiences([
      ...experiences,
      { position: '', company: '', location: '', startDate: '', endDate: '', description: '', current: false },
    ]);
  };

  const removeExperience = (index) => {
    if (experiences.length > 1) {
      setExperiences(experiences.filter((_, i) => i !== index));
    }
  };

  const handleChange = (index, field, value) => {
    const updated = [...experiences];
    updated[index][field] = value;
    
    if (field === 'current') {
      updated[index].endDate = value ? '' : updated[index].endDate;
    }
    
    setExperiences(updated);
  };

  const handleRefineDescription = async (index) => {
    const experience = experiences[index];
    
    if (!experience.description || experience.description.trim().length < 10) {
      toast.error('Please enter at least 10 characters to refine');
      return;
    }

    setRefiningIndex(index);
    setIsAIProcessing(true);

    try {
      const refined = await refineTextWithAI(experience.description, 'description');
      handleChange(index, 'description', refined);
      toast.success('Description refined successfully!');
    } catch (error) {
      toast.error(error.message || 'Failed to refine description');
    } finally {
      setRefiningIndex(null);
      setIsAIProcessing(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const validExperiences = experiences.filter(
      exp => exp.position && exp.company && exp.startDate
    );

    updateExperience(validExperiences);
    toast.success('Experience saved!');
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Work Experience</h2>
        <p className="text-gray-600">Add your professional experience</p>
      </div>

      <div className="space-y-8">
        {experiences.map((experience, index) => (
          <div key={index} className="p-6 bg-gray-50 rounded-xl border-2 border-gray-200 relative">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Experience #{index + 1}
              </h3>
              {experiences.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeExperience(index)}
                  className="text-red-600 hover:text-red-700 transition-colors p-2"
                  title="Remove"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Position/Role
                </label>
                <input
                  type="text"
                  value={experience.position}
                  onChange={(e) => handleChange(index, 'position', e.target.value)}
                  className="input-field"
                  placeholder="Senior Software Engineer"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company
                </label>
                <input
                  type="text"
                  value={experience.company}
                  onChange={(e) => handleChange(index, 'company', e.target.value)}
                  className="input-field"
                  placeholder="Tech Corp"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  value={experience.location}
                  onChange={(e) => handleChange(index, 'location', e.target.value)}
                  className="input-field"
                  placeholder="San Francisco, CA"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Start Date
                </label>
                <input
                  type="month"
                  value={experience.startDate}
                  onChange={(e) => handleChange(index, 'startDate', e.target.value)}
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  End Date
                </label>
                <input
                  type="month"
                  value={experience.endDate}
                  onChange={(e) => handleChange(index, 'endDate', e.target.value)}
                  className="input-field"
                  disabled={experience.current}
                />
              </div>

              <div className="flex items-center pt-8">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={experience.current}
                    onChange={(e) => handleChange(index, 'current', e.target.checked)}
                    className="w-4 h-4 text-primary-600 rounded focus:ring-2 focus:ring-primary-500"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Currently working here
                  </span>
                </label>
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={experience.description}
                onChange={(e) => handleChange(index, 'description', e.target.value)}
                rows="4"
                className="input-field resize-none"
                placeholder="Describe your responsibilities, achievements, and impact..."
              />
              <div className="flex justify-end mt-2">
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
                      Refine with AI
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={addExperience}
        className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-primary-500 hover:text-primary-600 transition-colors flex items-center justify-center gap-2 font-medium"
      >
        <Plus className="w-5 h-5" />
        Add Another Experience
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

export default ExperienceForm;
