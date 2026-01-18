import React, { useState, useEffect } from 'react';
import styles from './Content.module.css';
import RAGChatbot from '../RAGChatbot';

const ContentDisplay = ({ moduleId, chapterId, content, title }) => {
  const [selectedText, setSelectedText] = useState('');
  const [showChatbot, setShowChatbot] = useState(false);
  const [contentData, setContentData] = useState(null);

  // Handle text selection
  useEffect(() => {
    const handleSelection = () => {
      const selection = window.getSelection();
      if (selection.toString().trim() !== '') {
        const selectedText = selection.toString().substring(0, 500); // Limit length
        setSelectedText(selectedText);
      } else {
        setSelectedText('');
      }
    };

    document.addEventListener('mouseup', handleSelection);
    return () => {
      document.removeEventListener('mouseup', handleSelection);
    };
  }, []);

  // Load content based on props
  useEffect(() => {
    if (content) {
      setContentData(content);
    } else if (chapterId) {
      // In a real implementation, fetch content from API
      loadChapterContent();
    }
  }, [chapterId, content]);

  const loadChapterContent = async () => {
    try {
      const response = await fetch(`/api/v1/content/chapters/${chapterId}`);
      if (response.ok) {
        const data = await response.json();
        setContentData(data.content);
      } else {
        console.error('Failed to load chapter content');
      }
    } catch (error) {
      console.error('Error loading chapter content:', error);
    }
  };

  const handleChatbotToggle = () => {
    setShowChatbot(!showChatbot);
  };

  return (
    <div className={styles.contentContainer}>
      <div className={styles.contentHeader}>
        <h1>{title || 'Chapter Content'}</h1>
        <div className={styles.headerActions}>
          <button
            onClick={handleChatbotToggle}
            className={styles.chatbotButton}
          >
            {showChatbot ? 'Hide Assistant' : 'Show Assistant'}
          </button>
          <button className={styles.personalizeButton}>
            Personalize Content
          </button>
          <button className={styles.translateButton}>
            Translate to Urdu
          </button>
        </div>
      </div>

      <div className={styles.contentArea}>
        {showChatbot && (
          <div className={styles.chatbotPanel}>
            <RAGChatbot selectedText={selectedText} />
          </div>
        )}

        <div className={styles.textContent}>
          {contentData ? (
            <div
              className={styles.chapterContent}
              onMouseUp={() => {
                const selection = window.getSelection();
                if (selection.toString().trim() !== '') {
                  const selectedText = selection.toString().substring(0, 500);
                  setSelectedText(selectedText);
                }
              }}
            >
              {typeof contentData === 'string' ? (
                <div dangerouslySetInnerHTML={{ __html: contentData }} />
              ) : (
                <pre>{JSON.stringify(contentData, null, 2)}</pre>
              )}
            </div>
          ) : (
            <div className={styles.loading}>
              <p>Loading content...</p>
            </div>
          )}
        </div>
      </div>

      {selectedText && (
        <div className={styles.selectionToolbar}>
          <p>Selected: "{selectedText.substring(0, 100)}{selectedText.length > 100 ? '...' : ''}"</p>
          <button
            onClick={() => setShowChatbot(true)}
            className={styles.askAboutSelection}
          >
            Ask Assistant About Selection
          </button>
        </div>
      )}
    </div>
  );
};

export default ContentDisplay;