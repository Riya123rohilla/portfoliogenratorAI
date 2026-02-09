import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { refineTextWithAI } from '../../utils/aiService';
import toast from 'react-hot-toast';
import { ArrowRight, Sparkles, Loader2 } from 'lucide-react';

const PersonalInfoForm = () => {
  const { portfolioData, updatePersonalInfo, nextStep, setIsAIProcessing, isAIProcessing } = usePortfolio();
  const [formData, setFormData] = useState(portfolioData.personalInfo);
  const [refining, setRefining] = useState({ bio: false, title: false });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRefineText = async (field, type) => {
    if (!formData[field] || formData[field].trim().length < 10) {
      toast.error('Please enter at least 10 characters to refine');
      return;
    }

    setRefining((prev) => ({ ...prev, [field]: true }));
    setIsAIProcessing(true);

    try {
      const refined = await refineTextWithAI(formData[field], type);
      setFormData((prev) => ({ ...prev, [field]: refined }));
      toast.success('Text refined successfully!');
    } catch (error) {
      toast.error(error.message || 'Failed to refine text');
    } finally {
      setRefining((prev) => ({ ...prev, [field]: false }));
      setIsAIProcessing(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.title || !formData.email) {
      toast.error('Please fill in all required fields');
      return;
    }

    updatePersonalInfo(formData);
    toast.success('Personal information saved!');
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Personal Information</h2>
        <p className="text-gray-600">Let's start with your basic details</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="input-field"
            placeholder="John Doe"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Professional Title <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="input-field flex-1"
              placeholder="Senior Software Engineer"
              required
            />
            <button
              type="button"
              onClick={() => handleRefineText('title', 'title')}
              disabled={refining.title || isAIProcessing}
              className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all disabled:opacity-50"
              title="Refine with AI"
            >
              {refining.title ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Sparkles className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="input-field"
            placeholder="john.doe@example.com"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="input-field"
            placeholder="+1 (555) 123-4567"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Location
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="input-field"
            placeholder="San Francisco, CA"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Website
          </label>
          <input
            type="url"
            name="website"
            value={formData.website}
            onChange={handleChange}
            className="input-field"
            placeholder="https://yourwebsite.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            LinkedIn Profile
          </label>
          <input
            type="url"
            name="linkedin"
            value={formData.linkedin}
            onChange={handleChange}
            className="input-field"
            placeholder="https://linkedin.com/in/johndoe"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            GitHub Profile
          </label>
          <input
            type="url"
            name="github"
            value={formData.github}
            onChange={handleChange}
            className="input-field"
            placeholder="https://github.com/johndoe"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Twitter/X
          </label>
          <input
            type="url"
            name="twitter"
            value={formData.twitter}
            onChange={handleChange}
            className="input-field"
            placeholder="https://twitter.com/johndoe"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Professional Bio
        </label>
        <div className="space-y-2">
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            rows="5"
            className="input-field resize-none"
            placeholder="Write a brief professional bio about yourself (2-3 sentences)..."
          />
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-500">
              {formData.bio.length} / 500 characters
            </span>
            <button
              type="button"
              onClick={() => handleRefineText('bio', 'bio')}
              disabled={refining.bio || isAIProcessing}
              className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all disabled:opacity-50 flex items-center gap-2"
            >
              {refining.bio ? (
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

      <div className="flex justify-end pt-6 border-t border-gray-200">
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

export default PersonalInfoForm;
