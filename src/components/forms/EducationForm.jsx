import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import toast from 'react-hot-toast';
import { ArrowRight, ArrowLeft, Plus, Trash2 } from 'lucide-react';

const EducationForm = () => {
  const { portfolioData, updateEducation, nextStep, prevStep } = usePortfolio();
  const [education, setEducation] = useState(
    portfolioData.education.length > 0
      ? portfolioData.education
      : [{ degree: '', institution: '', location: '', year: '', gpa: '' }]
  );

  const addEducation = () => {
    setEducation([
      ...education,
      { degree: '', institution: '', location: '', year: '', gpa: '' },
    ]);
  };

  const removeEducation = (index) => {
    if (education.length > 1) {
      setEducation(education.filter((_, i) => i !== index));
    }
  };

  const handleChange = (index, field, value) => {
    const updated = [...education];
    updated[index][field] = value;
    setEducation(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const validEducation = education.filter(
      edu => edu.degree && edu.institution
    );

    updateEducation(validEducation);
    toast.success('Education saved!');
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Education</h2>
        <p className="text-gray-600">Add your educational background</p>
      </div>

      <div className="space-y-6">
        {education.map((edu, index) => (
          <div key={index} className="p-6 bg-gray-50 rounded-xl border-2 border-gray-200 relative">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Education #{index + 1}
              </h3>
              {education.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeEducation(index)}
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
                  Degree/Program
                </label>
                <input
                  type="text"
                  value={edu.degree}
                  onChange={(e) => handleChange(index, 'degree', e.target.value)}
                  className="input-field"
                  placeholder="Bachelor of Science in Computer Science"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Institution
                </label>
                <input
                  type="text"
                  value={edu.institution}
                  onChange={(e) => handleChange(index, 'institution', e.target.value)}
                  className="input-field"
                  placeholder="Stanford University"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  value={edu.location}
                  onChange={(e) => handleChange(index, 'location', e.target.value)}
                  className="input-field"
                  placeholder="Stanford, CA"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Year/Period
                </label>
                <input
                  type="text"
                  value={edu.year}
                  onChange={(e) => handleChange(index, 'year', e.target.value)}
                  className="input-field"
                  placeholder="2018 - 2022"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  GPA (optional)
                </label>
                <input
                  type="text"
                  value={edu.gpa}
                  onChange={(e) => handleChange(index, 'gpa', e.target.value)}
                  className="input-field"
                  placeholder="3.8/4.0"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={addEducation}
        className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-primary-500 hover:text-primary-600 transition-colors flex items-center justify-center gap-2 font-medium"
      >
        <Plus className="w-5 h-5" />
        Add Another Education
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

export default EducationForm;
