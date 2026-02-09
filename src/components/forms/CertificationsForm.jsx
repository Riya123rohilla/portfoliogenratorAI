import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import toast from 'react-hot-toast';
import { ArrowRight, ArrowLeft, Plus, Trash2 } from 'lucide-react';

const CertificationsForm = () => {
  const { portfolioData, updateCertifications, nextStep, prevStep } = usePortfolio();
  const [certifications, setCertifications] = useState(
    portfolioData.certifications.length > 0
      ? portfolioData.certifications
      : []
  );

  const addCertification = () => {
    setCertifications([
      ...certifications,
      { name: '', issuer: '', year: '', credentialUrl: '' },
    ]);
  };

  const removeCertification = (index) => {
    setCertifications(certifications.filter((_, i) => i !== index));
  };

  const handleChange = (index, field, value) => {
    const updated = [...certifications];
    updated[index][field] = value;
    setCertifications(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const validCertifications = certifications.filter(
      cert => cert.name && cert.issuer
    );

    updateCertifications(validCertifications);
    toast.success('Certifications saved!');
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Certifications</h2>
        <p className="text-gray-600">Add your professional certifications (optional)</p>
      </div>

      {certifications.length > 0 && (
        <div className="space-y-6">
          {certifications.map((cert, index) => (
            <div key={index} className="p-6 bg-gray-50 rounded-xl border-2 border-gray-200 relative">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  Certification #{index + 1}
                </h3>
                <button
                  type="button"
                  onClick={() => removeCertification(index)}
                  className="text-red-600 hover:text-red-700 transition-colors p-2"
                  title="Remove"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Certification Name
                  </label>
                  <input
                    type="text"
                    value={cert.name}
                    onChange={(e) => handleChange(index, 'name', e.target.value)}
                    className="input-field"
                    placeholder="AWS Certified Solutions Architect"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Issuing Organization
                  </label>
                  <input
                    type="text"
                    value={cert.issuer}
                    onChange={(e) => handleChange(index, 'issuer', e.target.value)}
                    className="input-field"
                    placeholder="Amazon Web Services"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Year
                  </label>
                  <input
                    type="text"
                    value={cert.year}
                    onChange={(e) => handleChange(index, 'year', e.target.value)}
                    className="input-field"
                    placeholder="2024"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Credential URL
                  </label>
                  <input
                    type="url"
                    value={cert.credentialUrl}
                    onChange={(e) => handleChange(index, 'credentialUrl', e.target.value)}
                    className="input-field"
                    placeholder="https://credential-url.com"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {certifications.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
          <p className="text-gray-600 mb-4">No certifications added yet.</p>
          <p className="text-sm text-gray-500">Certifications are optional but can strengthen your portfolio.</p>
        </div>
      )}

      <button
        type="button"
        onClick={addCertification}
        className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-primary-500 hover:text-primary-600 transition-colors flex items-center justify-center gap-2 font-medium"
      >
        <Plus className="w-5 h-5" />
        Add Certification
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
          Continue to Preview
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </form>
  );
};

export default CertificationsForm;
