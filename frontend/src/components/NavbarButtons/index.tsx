import React from 'react';
import LanguageToggle from '../LanguageToggle';
import PersonalizeButton from '../PersonalizeButton';

// Client module to render navbar components
export default function NavbarEndItems() {
  return (
    <>
      <div className="navbar__item">
        <LanguageToggle />
      </div>
      <div className="navbar__item">
        <PersonalizeButton />
      </div>
    </>
  );
}