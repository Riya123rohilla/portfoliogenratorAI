import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { suggestSkills } from '../../utils/aiService';
import toast from 'react-hot-toast';
import { ArrowRight, ArrowLeft, Plus, X, Sparkles, Loader2 } from 'lucide-react';

const SkillsForm = () => {
  const { portfolioData, updateSkills, nextStep, prevStep, setIsAIProcessing, isAIProcessing } = usePortfolio();
  const [skills, setSkills] = useState(
    portfolioData.skills.length > 0 ? portfolioData.skills : []
  );
  const [newSkill, setNewSkill] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Technical');
  const [suggesting, setSuggesting] = useState(false);

  const categories = ['Technical', 'Soft Skills', 'Tools', 'Languages', 'Other'];

  const addSkill = () => {
    if (newSkill.trim()) {
      setSkills([
        ...skills,
        { name: newSkill.trim(), category: selectedCategory, level: 'Intermediate' }
      ]);
      setNewSkill('');
      toast.success('Skill added!');
    }
  };

  const removeSkill = (index) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  const handleSkillChange = (index, field, value) => {
    const updated = [...skills];
    updated[index][field] = value;
    setSkills(updated);
  };

  const handleSuggestSkills = async () => {
    if (!portfolioData.experience.length && !portfolioData.education.length) {
      toast.error('Please add experience or education first to get AI suggestions');
      return;
    }

    setSuggesting(true);
    setIsAIProcessing(true);

    try {
      const suggestedSkills = await suggestSkills(
        portfolioData.experience,
        portfolioData.education
      );

      const newSkills = suggestedSkills
        .filter(skillName => !skills.some(s => s.name.toLowerCase() === skillName.toLowerCase()))
        .map(skillName => ({
          name: skillName,
          category: 'Technical',
          level: 'Intermediate'
        }));

      setSkills([...skills, ...newSkills]);
      toast.success(`Added ${newSkills.length} suggested skills!`);
    } catch (error) {
      toast.error(error.message || 'Failed to get skill suggestions');
    } finally {
      setSuggesting(false);
      setIsAIProcessing(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateSkills(skills);
    toast.success('Skills saved!');
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Skills & Expertise</h2>
        <p className="text-gray-600">Add your professional skills</p>
      </div>

      {/* AI Suggestions */}
      <div className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl border border-purple-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-600" />
              AI Skill Suggestions
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              Let AI suggest relevant skills based on your experience
            </p>
          </div>
          <button
            type="button"
            onClick={handleSuggestSkills}
            disabled={suggesting || isAIProcessing}
            className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all disabled:opacity-50 flex items-center gap-2 whitespace-nowrap"
          >
            {suggesting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Suggesting...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Get Suggestions
              </>
            )}
          </button>
        </div>
      </div>

      {/* Add New Skill */}
      <div className="p-6 bg-gray-50 rounded-xl border-2 border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Add New Skill</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Skill Name
            </label>
            <input
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
              className="input-field"
              placeholder="e.g., React, Python, Leadership"
            />
          </div>

          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="input-field"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="flex items-end">
            <button
              type="button"
              onClick={addSkill}
              className="w-full btn-primary flex items-center justify-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Add Skill
            </button>
          </div>
        </div>
      </div>

      {/* Skills List */}
      {skills.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Your Skills ({skills.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start gap-2">
                  <div className="flex-1 space-y-3">
                    <input
                      type="text"
                      value={skill.name}
                      onChange={(e) => handleSkillChange(index, 'name', e.target.value)}
                      className="w-full font-medium text-gray-900 bg-transparent border-b border-transparent hover:border-gray-300 focus:border-primary-500 outline-none px-1"
                    />
                    
                    <div className="grid grid-cols-2 gap-2">
                      <select
                        value={skill.category}
                        onChange={(e) => handleSkillChange(index, 'category', e.target.value)}
                        className="text-sm px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                      >
                        {categories.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>

                      <select
                        value={skill.level}
                        onChange={(e) => handleSkillChange(index, 'level', e.target.value)}
                        className="text-sm px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                      >
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                        <option value="Expert">Expert</option>
                      </select>
                    </div>
                  </div>
                  
                  <button
                    type="button"
                    onClick={() => removeSkill(index)}
                    className="text-red-600 hover:text-red-700 transition-colors p-1"
                    title="Remove skill"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {skills.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
          <p className="text-gray-600">No skills added yet. Add your first skill above!</p>
        </div>
      )}

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

export default SkillsForm;
