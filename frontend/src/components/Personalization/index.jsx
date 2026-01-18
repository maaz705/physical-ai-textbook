import React, { useState, useEffect } from 'react';
import styles from './Personalization.module.css';

const PersonalizationComponent = ({ onPreferencesChange, initialPreferences = {} }) => {
  const [preferences, setPreferences] = useState({
    difficulty_level: initialPreferences.difficulty_level || 'intermediate',
    content_format: initialPreferences.content_format || 'mixed',
    hardware_focus: initialPreferences.hardware_focus || 'simulation',
    language: initialPreferences.language || 'en',
    notification_preferences: initialPreferences.notification_preferences || {
      progress_updates: true,
      new_content: true,
      community_digest: false
    }
  });

  useEffect(() => {
    if (onPreferencesChange) {
      onPreferencesChange(preferences);
    }
  }, [preferences, onPreferencesChange]);

  const handleChange = (category, key, value) => {
    if (category === 'notification_preferences') {
      setPreferences(prev => ({
        ...prev,
        notification_preferences: {
          ...prev.notification_preferences,
          [key]: value
        }
      }));
    } else {
      setPreferences(prev => ({
        ...prev,
        [category]: value
      }));
    }
  };

  const handleReset = () => {
    setPreferences({
      difficulty_level: 'intermediate',
      content_format: 'mixed',
      hardware_focus: 'simulation',
      language: 'en',
      notification_preferences: {
        progress_updates: true,
        new_content: true,
        community_digest: false
      }
    });
  };

  return (
    <div className={styles.personalizationContainer}>
      <h3>Personalization Settings</h3>

      <div className={styles.settingsSection}>
        <h4>Learning Difficulty</h4>
        <div className={styles.optionGroup}>
          {['beginner', 'intermediate', 'advanced'].map(level => (
            <label key={level} className={styles.radioOption}>
              <input
                type="radio"
                name="difficulty_level"
                value={level}
                checked={preferences.difficulty_level === level}
                onChange={(e) => handleChange('difficulty_level', 'difficulty_level', e.target.value)}
              />
              <span className={styles.radioButton}></span>
              <span className={styles.label}>{level.charAt(0).toUpperCase() + level.slice(1)}</span>
            </label>
          ))}
        </div>
      </div>

      <div className={styles.settingsSection}>
        <h4>Content Format</h4>
        <div className={styles.optionGroup}>
          {['text_only', 'text_visual', 'mixed', 'interactive'].map(format => (
            <label key={format} className={styles.radioOption}>
              <input
                type="radio"
                name="content_format"
                value={format}
                checked={preferences.content_format === format}
                onChange={(e) => handleChange('content_format', 'content_format', e.target.value)}
              />
              <span className={styles.radioButton}></span>
              <span className={styles.label}>
                {format.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className={styles.settingsSection}>
        <h4>Hardware Focus</h4>
        <div className={styles.optionGroup}>
          {['simulation', 'physical_hardware', 'both'].map(focus => (
            <label key={focus} className={styles.radioOption}>
              <input
                type="radio"
                name="hardware_focus"
                value={focus}
                checked={preferences.hardware_focus === focus}
                onChange={(e) => handleChange('hardware_focus', 'hardware_focus', e.target.value)}
              />
              <span className={styles.radioButton}></span>
              <span className={styles.label}>{focus.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</span>
            </label>
          ))}
        </div>
      </div>

      <div className={styles.settingsSection}>
        <h4>Language Preference</h4>
        <div className={styles.optionGroup}>
          {[
            { value: 'en', label: 'English' },
            { value: 'ur', label: 'Urdu' }
          ].map(lang => (
            <label key={lang.value} className={styles.radioOption}>
              <input
                type="radio"
                name="language"
                value={lang.value}
                checked={preferences.language === lang.value}
                onChange={(e) => handleChange('language', 'language', e.target.value)}
              />
              <span className={styles.radioButton}></span>
              <span className={styles.label}>{lang.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className={styles.settingsSection}>
        <h4>Notification Preferences</h4>
        <div className={styles.checkboxGroup}>
          <label className={styles.checkboxOption}>
            <input
              type="checkbox"
              checked={preferences.notification_preferences.progress_updates}
              onChange={(e) => handleChange('notification_preferences', 'progress_updates', e.target.checked)}
            />
            <span className={styles.checkbox}></span>
            <span className={styles.label}>Progress updates</span>
          </label>

          <label className={styles.checkboxOption}>
            <input
              type="checkbox"
              checked={preferences.notification_preferences.new_content}
              onChange={(e) => handleChange('notification_preferences', 'new_content', e.target.checked)}
            />
            <span className={styles.checkbox}></span>
            <span className={styles.label}>New content notifications</span>
          </label>

          <label className={styles.checkboxOption}>
            <input
              type="checkbox"
              checked={preferences.notification_preferences.community_digest}
              onChange={(e) => handleChange('notification_preferences', 'community_digest', e.target.checked)}
            />
            <span className={styles.checkbox}></span>
            <span className={styles.label}>Weekly community digest</span>
          </label>
        </div>
      </div>

      <div className={styles.actionButtons}>
        <button onClick={handleReset} className={styles.resetButton}>
          Reset to Default
        </button>
      </div>
    </div>
  );
};

export default PersonalizationComponent;