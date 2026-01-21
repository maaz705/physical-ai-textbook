import React from 'react';
import {translate} from '@docusaurus/Translate';
import {useLocation} from '@docusaurus/router';

interface Props {
  readonly label?: string;
  readonly position?: string;
}

export default function PersonalizeButton({label, position}: Props): JSX.Element {
  const [isPersonalized, setIsPersonalized] = React.useState(false);
  const location = useLocation();

  const togglePersonalization = () => {
    setIsPersonalized(!isPersonalized);
    // In a real implementation, this would trigger personalization features
    alert(`Toggling personalization features`);
  };

  return (
    <button
      className="personalize-button"
      onClick={togglePersonalization}
      title="Personalize your learning experience"
      style={{marginLeft: '10px'}}
    >
      {isPersonalized ? '👤 On' : '👤 Off'}
    </button>
  );
}