import React, { useState } from 'react';
import { useLocation } from '@docusaurus/router';

const PersonalizeButton = () => {
  const [isPersonalized, setIsPersonalized] = useState(false);
  const location = useLocation();

  const togglePersonalization = () => {
    setIsPersonalized(!isPersonalized);
    // In a real implementation, this would trigger personalization features
    alert(`${isPersonalized ? 'Disabling' : 'Enabling'} personalized content for ${location.pathname}`);
  };

  return (
    <button
      className="personalize-button"
      onClick={togglePersonalization}
      title="Personalize content"
    >
      {isPersonalized ? '👤 Personalized' : '👤 Personalize'}
    </button>
  );
};

export default PersonalizeButton;