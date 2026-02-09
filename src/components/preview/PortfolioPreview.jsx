import React from 'react';
import MinimalTheme from './themes/MinimalTheme';
import ModernTheme from './themes/ModernTheme';
import CreativeTheme from './themes/CreativeTheme';

const PortfolioPreview = ({ data, theme }) => {
  const themes = {
    minimal: MinimalTheme,
    modern: ModernTheme,
    creative: CreativeTheme,
  };

  const ThemeComponent = themes[theme] || MinimalTheme;

  return (
    <div id="portfolio-preview" className="bg-white">
      <ThemeComponent data={data} />
    </div>
  );
};

export default PortfolioPreview;
