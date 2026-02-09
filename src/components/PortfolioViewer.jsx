import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { exportAsHTML, exportAsReact, exportAsPDF } from '../utils/exportUtils';
import toast from 'react-hot-toast';
import { Download, FileCode, FileText, RefreshCw, Palette, Sparkles } from 'lucide-react';
import PortfolioPreview from './preview/PortfolioPreview';

const PortfolioViewer = ({ onStartOver }) => {
  const { portfolioData, updateTheme, resetPortfolio } = usePortfolio();
  const [selectedTheme, setSelectedTheme] = useState(portfolioData.theme);
  const [exporting, setExporting] = useState(false);

  const themes = [
    { id: 'minimal', name: 'Minimal', description: 'Clean and professional', gradient: 'from-gray-400 to-gray-600' },
    { id: 'modern', name: 'Modern', description: 'Bold and contemporary', gradient: 'from-purple-500 to-blue-600' },
    { id: 'creative', name: 'Creative', description: 'Vibrant and unique', gradient: 'from-orange-400 to-red-500' },
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

  const handleStartOver = () => {
    if (window.confirm('Are you sure? This will clear your current portfolio.')) {
      resetPortfolio();
      onStartOver();
      toast.success('Starting fresh!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-md border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-2 rounded-lg">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Your AI-Generated Portfolio</h1>
                <p className="text-sm text-gray-600">Review, customize theme, and export</p>
              </div>
            </div>
            <button
              onClick={handleStartOver}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              <span className="font-medium">Start Over</span>
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Controls */}
          <div className="lg:col-span-1 space-y-6">
            {/* Theme Selection */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 sticky top-24">
              <div className="flex items-center gap-2 mb-4">
                <Palette className="w-6 h-6 text-purple-600" />
                <h3 className="text-lg font-bold text-gray-900">Choose Theme</h3>
              </div>
              <div className="space-y-3">
                {themes.map((theme) => (
                  <button
                    key={theme.id}
                    onClick={() => handleThemeChange(theme.id)}
                    className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                      selectedTheme === theme.id
                        ? 'border-purple-600 bg-purple-50 shadow-md'
                        : 'border-gray-200 hover:border-purple-300 bg-white'
                    }`}
                  >
                    <div className={`h-2 w-full bg-gradient-to-r ${theme.gradient} rounded-full mb-2`}></div>
                    <div className="font-semibold text-gray-900">{theme.name}</div>
                    <div className="text-xs text-gray-600">{theme.description}</div>
                    {selectedTheme === theme.id && (
                      <div className="mt-2 text-xs font-semibold text-purple-600">✓ Active</div>
                    )}
                  </button>
                ))}
              </div>

              {/* Export Options */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">Export</h4>
                <div className="space-y-2">
                  <button
                    onClick={handleExportHTML}
                    className="w-full py-3 px-4 bg-blue-50 hover:bg-blue-100 border-2 border-blue-200 rounded-lg flex items-center gap-2 transition-colors group"
                  >
                    <FileText className="w-5 h-5 text-blue-600" />
                    <div className="text-left flex-1">
                      <div className="text-sm font-semibold text-gray-900">HTML</div>
                      <div className="text-xs text-gray-600">Standalone file</div>
                    </div>
                  </button>

                  <button
                    onClick={handleExportReact}
                    className="w-full py-3 px-4 bg-purple-50 hover:bg-purple-100 border-2 border-purple-200 rounded-lg flex items-center gap-2 transition-colors group"
                  >
                    <FileCode className="w-5 h-5 text-purple-600" />
                    <div className="text-left flex-1">
                      <div className="text-sm font-semibold text-gray-900">React</div>
                      <div className="text-xs text-gray-600">Component</div>
                    </div>
                  </button>

                  <button
                    onClick={handleExportPDF}
                    disabled={exporting}
                    className="w-full py-3 px-4 bg-green-50 hover:bg-green-100 border-2 border-green-200 rounded-lg flex items-center gap-2 transition-colors group disabled:opacity-50"
                  >
                    <Download className="w-5 h-5 text-green-600" />
                    <div className="text-left flex-1">
                      <div className="text-sm font-semibold text-gray-900">
                        {exporting ? 'Generating...' : 'PDF'}
                      </div>
                      <div className="text-xs text-gray-600">Print-ready</div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Preview */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-4">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  Live Preview
                </h2>
              </div>
              <div className="p-4 bg-gray-100">
                <div className="bg-white rounded-lg shadow-inner max-h-[calc(100vh-250px)] overflow-auto">
                  <PortfolioPreview data={portfolioData} theme={selectedTheme} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioViewer;
