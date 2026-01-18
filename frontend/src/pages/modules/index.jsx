import React, { useState, useEffect } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import styles from './Modules.module.css';

const ModulesPage = () => {
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real implementation, fetch modules from API
    // For now, using mock data
    const mockModules = [
      {
        id: '1',
        title: 'ROS 2 Foundations',
        description: 'Learn the fundamentals of Robot Operating System 2 for building robust robotic applications.',
        week: 'Weeks 1-3',
        chapters: 5,
        duration: '15 hours'
      },
      {
        id: '2',
        title: 'Digital Twin Systems',
        description: 'Explore digital twin technology for simulating and controlling robotic systems.',
        week: 'Weeks 4-6',
        chapters: 4,
        duration: '12 hours'
      },
      {
        id: '3',
        title: 'AI-Robot Brain',
        description: 'Develop intelligent control systems for autonomous robots using AI and machine learning.',
        week: 'Weeks 7-10',
        chapters: 6,
        duration: '18 hours'
      },
      {
        id: '4',
        title: 'Vision-Language-Action Models',
        description: 'Implement VLA models for advanced robot perception and manipulation.',
        week: 'Weeks 11-13',
        chapters: 4,
        duration: '12 hours'
      }
    ];

    setTimeout(() => {
      setModules(mockModules);
      setLoading(false);
    }, 500);
  }, []);

  return (
    <Layout title="Course Modules" description="Browse the Physical AI & Humanoid Robotics curriculum">
      <div className="container margin-vert--lg">
        <div className="row">
          <div className="col col--8 col--offset-2">
            <h1 className={styles.title}>Course Modules</h1>
            <p className={styles.subtitle}>
              Explore the comprehensive 13-week curriculum designed to teach Physical AI and Humanoid Robotics
            </p>

            {loading ? (
              <div className={styles.loading}>
                Loading modules...
              </div>
            ) : (
              <div className={styles.modulesGrid}>
                {modules.map((module) => (
                  <div key={module.id} className={styles.moduleCard}>
                    <div className={styles.moduleHeader}>
                      <h2 className={styles.moduleTitle}>{module.title}</h2>
                      <span className={styles.weekLabel}>{module.week}</span>
                    </div>
                    <p className={styles.moduleDescription}>{module.description}</p>
                    <div className={styles.moduleStats}>
                      <span>{module.chapters} chapters</span>
                      <span>{module.duration}</span>
                    </div>
                    <div className={styles.moduleActions}>
                      <Link
                        className={styles.viewButton}
                        to={`/docs/modules/${module.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '')}`}
                      >
                        View Module
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ModulesPage;