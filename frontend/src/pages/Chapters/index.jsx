import React, { useState, useEffect } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import ContentDisplay from '../../components/Content';
import RAGChatbot from '../../components/RAGChatbot';
import styles from './Chapters.module.css';

const ChaptersPage = ({ moduleId, chapterId }) => {
  const [module, setModule] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [currentChapter, setCurrentChapter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showChatbot, setShowChatbot] = useState(false);

  useEffect(() => {
    // In a real implementation, fetch module and chapters from API
    // For now, using mock data
    const mockModule = {
      id: moduleId || '1',
      title: 'ROS 2 Foundations',
      description: 'Learn the fundamentals of Robot Operating System 2 for building robust robotic applications.'
    };

    const mockChapters = [
      {
        id: '1',
        title: 'Introduction to ROS 2',
        module_id: '1',
        content: `
          <h2>Introduction to ROS 2</h2>
          <p>Robot Operating System 2 (ROS 2) is a flexible framework for writing robot software. It is a collection of tools, libraries, and conventions that aim to simplify the task of creating complex and robust robot behavior across a wide variety of robotic platforms.</p>

          <h3>Key Concepts</h3>
          <p>ROS 2 introduces several key concepts that are essential for developing robotic applications:</p>

          <ul>
            <li><strong>Nodes</strong>: Processes that perform computation</li>
            <li><strong>Topics</strong>: Named buses over which nodes exchange messages</li>
            <li><strong>Services</strong>: Synchronous request/reply mechanism</li>
            <li><strong>Parameters</strong>: Configuration values accessible by name</li>
          </ul>

          <h3>Why ROS 2?</h3>
          <p>ROS 2 addresses limitations of ROS 1 by providing:</p>

          <ul>
            <li>Real-time support</li>
            <li>Multilingual support</li>
            <li>Improved security</li>
            <li>Support for commercial products</li>
          </ul>
        `,
        order: 1,
        estimated_duration: '2 hours'
      },
      {
        id: '2',
        title: 'Nodes and Communication',
        module_id: '1',
        content: `
          <h2>Nodes and Communication</h2>
          <p>In ROS 2, nodes are the fundamental building blocks of a robotic application. Each node implements a specific part of the robot's functionality and communicates with other nodes to achieve complex behaviors.</p>

          <h3>Node Implementation</h3>
          <p>Nodes can be implemented in multiple languages including C++, Python, and others. A typical node contains:</p>

          <ul>
            <li>Initialization and shutdown procedures</li>
            <li>Callback functions for handling incoming messages</li>
            <li>Logic for publishing messages and providing services</li>
          </ul>

          <h3>Communication Patterns</h3>
          <p>ROS 2 supports several communication patterns:</p>

          <ol>
            <li>Publish/Subscribe (topics) - asynchronous, many-to-many</li>
            <li>Request/Response (services) - synchronous, one-to-one</li>
            <li>Action-based communication - goal-oriented, with feedback</li>
          </ol>
        `,
        order: 2,
        estimated_duration: '3 hours'
      },
      {
        id: '3',
        title: 'Package Management',
        module_id: '1',
        content: `
          <h2>Package Management</h2>
          <p>ROS 2 organizes code into packages, which are the basic units of software organization. Packages contain nodes, libraries, datasets, and other resources needed for robot applications.</p>

          <h3>Package Structure</h3>
          <p>A typical ROS 2 package includes:</p>

          <ul>
            <li>CMakeLists.txt - build configuration for C++ packages</li>
            <li>package.xml - package manifest with dependencies</li>
            <li>src/ - source code files</li>
            <li>include/ - header files</li>
            <li>launch/ - launch files for starting multiple nodes</li>
          </ul>

          <h3>Creating Packages</h3>
          <p>Use the ros2 pkg create command to initialize a new package with the proper structure and boilerplate code.</p>
        `,
        order: 3,
        estimated_duration: '2.5 hours'
      }
    ];

    setTimeout(() => {
      setModule(mockModule);
      setChapters(mockChapters);

      if (chapterId) {
        const chapter = mockChapters.find(c => c.id === chapterId);
        setCurrentChapter(chapter);
      } else if (mockChapters.length > 0) {
        setCurrentChapter(mockChapters[0]);
      }

      setLoading(false);
    }, 500);
  }, [moduleId, chapterId]);

  const handleChapterChange = (chapterId) => {
    const chapter = chapters.find(c => c.id === chapterId);
    setCurrentChapter(chapter);
    // Close chatbot when changing chapters
    setShowChatbot(false);
  };

  const toggleChatbot = () => {
    setShowChatbot(!showChatbot);
  };

  return (
    <Layout
      title={currentChapter ? currentChapter.title : "Chapters"}
      description="Study individual chapters of the Physical AI & Humanoid Robotics textbook"
    >
      <div className="container margin-vert--lg">
        <div className="row">
          <div className="col col--12">
            {loading ? (
              <div className={styles.loading}>
                Loading chapter content...
              </div>
            ) : (
              <div className={styles.chapterLayout}>
                <div className={styles.sidebar}>
                  <h3>{module?.title || 'Module Chapters'}</h3>
                  <nav className={styles.chapterNav}>
                    {chapters.map((chapter) => (
                      <button
                        key={chapter.id}
                        className={`${styles.navItem} ${
                          currentChapter?.id === chapter.id ? styles.active : ''
                        }`}
                        onClick={() => handleChapterChange(chapter.id)}
                      >
                        <span className={styles.chapterOrder}>{chapter.order}.</span>
                        <span className={styles.chapterTitle}>{chapter.title}</span>
                        <span className={styles.chapterDuration}>{chapter.estimated_duration}</span>
                      </button>
                    ))}
                  </nav>

                  <div className={styles.moduleInfo}>
                    <h4>About this module</h4>
                    <p>{module?.description}</p>
                  </div>
                </div>

                <div className={styles.mainContent}>
                  {currentChapter ? (
                    <>
                      <div className={styles.chapterHeader}>
                        <h1>{currentChapter.title}</h1>
                        <div className={styles.chapterActions}>
                          <button
                            className={styles.chatbotToggle}
                            onClick={toggleChatbot}
                          >
                            {showChatbot ? 'Hide Assistant' : 'Show Assistant'}
                          </button>
                          <button className={styles.personalizeBtn}>
                            Personalize Content
                          </button>
                          <button className={styles.translateBtn}>
                            Translate to Urdu
                          </button>
                        </div>
                      </div>

                      <div className={styles.contentAndChat}>
                        <div className={styles.chapterContent}>
                          <ContentDisplay
                            chapterId={currentChapter.id}
                            content={currentChapter.content}
                            title={currentChapter.title}
                          />
                        </div>

                        {showChatbot && (
                          <div className={styles.chatbotSidebar}>
                            <RAGChatbot />
                          </div>
                        )}
                      </div>
                    </>
                  ) : (
                    <div className={styles.noChapter}>
                      <p>Select a chapter to begin studying.</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ChaptersPage;