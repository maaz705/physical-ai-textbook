import React, { useState } from 'react';
import { useLocation } from '@docusaurus/router';
import { translate } from '@docusaurus/core/lib/client/exports/Translate';

const LanguageToggle = () => {
  const [isUrdu, setIsUrdu] = useState(false);
  const location = useLocation();

  const toggleLanguage = () => {
    setIsUrdu(!isUrdu);
    // In a real implementation, this would trigger actual language switching
    alert(`Switching to ${isUrdu ? 'English' : 'Urdu'} language`);
  };

  return (
    <button
      className="translate-button"
      onClick={toggleLanguage}
      title="Translate to Urdu"
    >
      {isUrdu ? '🇺🇸 EN' : '🇵🇰 UR'}
    </button>
  );
};

export default LanguageToggle;