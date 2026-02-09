import { createContext, useContext, useState, useCallback } from 'react';

const PortfolioContext = createContext();

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within PortfolioProvider');
  }
  return context;
};

const initialPortfolioData = {
  personalInfo: {
    fullName: '',
    title: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    linkedin: '',
    github: '',
    twitter: '',
    bio: '',
  },
  experience: [],
  education: [],
  skills: [],
  projects: [],
  certifications: [],
  theme: 'minimal',
};

export const PortfolioProvider = ({ children }) => {
  const [portfolioData, setPortfolioData] = useState(initialPortfolioData);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState('');

  const updatePortfolioData = useCallback((data) => {
    setPortfolioData(data);
  }, []);

  const updateTheme = useCallback((theme) => {
    setPortfolioData((prev) => ({
      ...prev,
      theme,
    }));
  }, []);

  const resetPortfolio = useCallback(() => {
    setPortfolioData(initialPortfolioData);
  }, []);

  const value = {
    portfolioData,
    isGenerating,
    generationStep,
    setIsGenerating,
    setGenerationStep,
    updatePortfolioData,
    updateTheme,
    resetPortfolio,
  };

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  );
};
