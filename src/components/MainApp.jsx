import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import PromptGenerator from './PromptGenerator';
import PortfolioViewer from './PortfolioViewer';

const MainApp = () => {
  const { portfolioData } = usePortfolio();
  const [hasGenerated, setHasGenerated] = useState(false);

  const handleGenerated = () => {
    setHasGenerated(true);
  };

  const handleStartOver = () => {
    setHasGenerated(false);
  };

  return (
    <div className="min-h-screen">
      {!hasGenerated || !portfolioData.personalInfo.fullName ? (
        <PromptGenerator onGenerated={handleGenerated} />
      ) : (
        <PortfolioViewer onStartOver={handleStartOver} />
      )}
    </div>
  );
};

export default MainApp;
