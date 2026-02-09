import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { exportAsHTML, exportAsReact, exportAsPDF } from '../utils/exportUtils';
import toast from 'react-hot-toast';
import { Download, FileCode, FileText, ArrowLeft, Palette } from 'lucide-react';
import PortfolioPreview from './preview/PortfolioPreview';

const PreviewExport = () => {
  const { portfolioData, updateTheme, prevStep } = usePortfolio();
  const [selectedTheme, setSelectedTheme] = useState(portfolioData.theme);
  const [exporting, setExporting] = useState(false);

  const themes = [
    { id: 'minimal', name: 'Minimal', description: 'Clean and professional' },
    { id: 'modern', name: 'Modern', description: 'Bold and contemporary' },
    { id: 'creative', name: 'Creative', description: 'Vibrant and unique' },
  ];

  const handleThemeChange = (themeId) => {
    setSelectedTheme(themeId);
    updateTheme(themeId);
    toast.success(`Theme changed to ${themeId}`);
  };

  const handleExportHTML = () => {
    try {
      exportAsHTML(portfolioData, selectedTheme);
      toast.success('HTML file downloaded successfully!');
    } catch (error) {
      toast.error('Failed to export HTML');
    }
  };

  const handleExportReact = () => {
    try {
      exportAsReact(portfolioData, selectedTheme);
      toast.success('React template downloaded successfully!');
    } catch (error) {
      toast.error('Failed to export React template');
    }
  };

  const handleExportPDF = async () => {
    setExporting(true);
    try {
      const filename = `${portfolioData.personalInfo.fullName.replace(/\s+/g, '-').toLowerCase()}-portfolio.pdf`;
      await exportAsPDF('portfolio-preview', filename);
      toast.success('PDF downloaded successfully!');
    } catch (error) {
      toast.error(error.message || 'Failed to export PDF');
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Preview & Export</h2>
        <p className="text-gray-600">Choose a theme and export your portfolio</p>
      </div>

      {/* Theme Selection */}
      <div className="card">
        <div className="flex items-center gap-2 mb-4">
          <Palette className="w-6 h-6 text-primary-600" />
          <h3 className="text-xl font-semibold text-gray-900">Choose Theme</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {themes.map((theme) => (
            <button
              key={theme.id}
              onClick={() => handleThemeChange(theme.id)}
              className={`p-4 rounded-xl border-2 transition-all text-left ${
                selectedTheme === theme.id
                  ? 'border-primary-600 bg-primary-50 shadow-md'
                  : 'border-gray-200 hover:border-primary-300 bg-white'
              }`}
            >
              <div className="font-semibold text-gray-900 mb-1">{theme.name}</div>
              <div className="text-sm text-gray-600">{theme.description}</div>
              {selectedTheme === theme.id && (
                <div className="mt-2 text-xs font-medium text-primary-600">✓ Selected</div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Export Options */}
      <div className="card">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Export Options</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={handleExportHTML}
            className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border-2 border-blue-200 hover:border-blue-400 transition-all group"
          >
            <FileText className="w-8 h-8 text-blue-600 mb-3" />
            <div className="font-semibold text-gray-900 mb-1">Export as HTML</div>
            <div className="text-sm text-gray-600">Standalone HTML file</div>
          </button>

          <button
            onClick={handleExportReact}
            className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border-2 border-purple-200 hover:border-purple-400 transition-all group"
          >
            <FileCode className="w-8 h-8 text-purple-600 mb-3" />
            <div className="font-semibold text-gray-900 mb-1">Export as React</div>
            <div className="text-sm text-gray-600">React component template</div>
          </button>

          <button
            onClick={handleExportPDF}
            disabled={exporting}
            className="p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border-2 border-green-200 hover:border-green-400 transition-all group disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Download className="w-8 h-8 text-green-600 mb-3" />
            <div className="font-semibold text-gray-900 mb-1">
              {exporting ? 'Generating PDF...' : 'Export as PDF'}
            </div>
            <div className="text-sm text-gray-600">Print-ready document</div>
          </button>
        </div>
      </div>

      {/* Live Preview */}
      <div className="card">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Live Preview</h3>
        <div className="bg-gray-100 rounded-lg p-4 max-h-[800px] overflow-auto">
          <PortfolioPreview data={portfolioData} theme={selectedTheme} />
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-6 border-t border-gray-200">
        <button
          onClick={prevStep}
          className="btn-secondary flex items-center gap-2"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>
        <div className="text-sm text-gray-600 flex items-center gap-2">
          ✅ Portfolio Complete! Export your work above.
        </div>
      </div>
    </div>
  );
};

export default PreviewExport;
