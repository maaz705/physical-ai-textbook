import React from 'react';
import clsx from 'clsx';
import {translate} from '@docusaurus/Translate';
import Link from '@docusaurus/Link';
import {useLocation} from '@docusaurus/router';

export default function NavbarItem() {
  const [isUrdu, setIsUrdu] = React.useState(false);
  const [isPersonalized, setIsPersonalized] = React.useState(false);
  const location = useLocation();

  const toggleLanguage = () => {
    setIsUrdu(!isUrdu);
    // In a real implementation, this would trigger actual language switching
    alert(`Switching to ${isUrdu ? 'English' : 'Urdu'} language`);
  };

  const togglePersonalization = () => {
    setIsPersonalized(!isPersonalized);
    // In a real implementation, this would trigger personalization features
    alert(`${isPersonalized ? 'Disabling' : 'Enabling'} personalized content for ${location.pathname}`);
  };

  return (
    <div className={clsx('navbar__item', 'dropdown', 'dropdown--nocaret')}>
      <button
        className="translate-button"
        onClick={toggleLanguage}
        title="Translate to Urdu"
        style={{marginRight: '10px'}}
      >
        {isUrdu ? '🇺🇸 EN' : '🇵🇰 UR'}
      </button>
      <button
        className="personalize-button"
        onClick={togglePersonalization}
        title="Personalize content"
      >
        {isPersonalized ? '👤 Personalized' : '👤 Personalize'}
      </button>
    </div>
  );
}