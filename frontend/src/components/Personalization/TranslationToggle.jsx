import React, { useState, useEffect } from 'react';
import styles from './TranslationToggle.module.css';

const TranslationToggle = ({ currentLanguage = 'en', onLanguageChange }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(currentLanguage);

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'ur', name: 'اردو' }
  ];

  useEffect(() => {
    setSelectedLanguage(currentLanguage);
  }, [currentLanguage]);

  const handleLanguageSelect = (languageCode) => {
    setSelectedLanguage(languageCode);
    if (onLanguageChange) {
      onLanguageChange(languageCode);
    }
    setIsDropdownOpen(false);
  };

  const currentLangName = languages.find(lang => lang.code === selectedLanguage)?.name;

  return (
    <div className={styles.translationContainer}>
      <button
        className={styles.dropdownButton}
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <span className={styles.currentLanguage}>{currentLangName}</span>
        <span className={styles.arrow}>{isDropdownOpen ? '▲' : '▼'}</span>
      </button>

      {isDropdownOpen && (
        <div className={styles.dropdownMenu}>
          {languages.map(lang => (
            <button
              key={lang.code}
              className={`${styles.dropdownItem} ${selectedLanguage === lang.code ? styles.active : ''}`}
              onClick={() => handleLanguageSelect(lang.code)}
            >
              {lang.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default TranslationToggle;