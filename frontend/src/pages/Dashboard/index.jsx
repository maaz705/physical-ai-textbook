import React, { useState, useEffect } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import HardwareQuestionnaire from '../../components/HardwareQuestionnaire';
import styles from './Dashboard.module.css';

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [hardwareProfile, setHardwareProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    // In a real implementation, fetch user data from API
    // For now, using mock data
    const mockUserData = {
      id: 'user-123',
      name: 'John Doe',
      email: 'john.doe@example.com',
      hardware_background: 'intermediate',
      software_background: 'advanced',
      preferred_language: 'en',
      created_at: new Date().toISOString(),
      last_accessed_module: 2,
      progress_tracking: {
        completed_modules: 2,
        total_modules: 4,
        overall_progress: 50
      }
    };

    const mockHardwareProfile = {
      workstation_gpu: 'RTX 4070 Ti',
      workstation_specs: {
        cpu: 'Intel i7-12700K',
        ram: '32GB DDR4-3200MHz',
        storage: '1TB NVMe SSD'
      },
      edge_kit_type: 'Jetson Orin NX',
      edge_kit_specs: {
        memory: '16GB',
        connectivity: 'USB-C, HDMI, Ethernet',
        sensors: 'Stereo cameras, IMU'
      },
      access_level: 'physical_hardware'
    };

    setTimeout(() => {
      setUserData(mockUserData);
      setHardwareProfile(mockHardwareProfile);
      setLoading(false);
    }, 500);
  }, []);

  const handleHardwareProfileSubmit = async (formData) => {
    // In a real implementation, submit to API
    console.log('Submitting hardware profile:', formData);
    setHardwareProfile(formData);
    alert('Hardware profile updated successfully!');
  };

  if (loading) {
    return (
      <Layout title="Dashboard" description="Your personalized learning dashboard">
        <div className="container margin-vert--lg">
          <div className="row">
            <div className="col col--8 col--offset-2">
              <div className={styles.loading}>
                Loading dashboard...
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Dashboard" description="Your personalized learning dashboard">
      <div className="container margin-vert--lg">
        <div className="row">
          <div className="col col--12">
            <h1 className={styles.title}>Learning Dashboard</h1>

            <div className={styles.tabs}>
              <button
                className={`${styles.tabButton} ${activeTab === 'overview' ? styles.active : ''}`}
                onClick={() => setActiveTab('overview')}
              >
                Overview
              </button>
              <button
                className={`${styles.tabButton} ${activeTab === 'profile' ? styles.active : ''}`}
                onClick={() => setActiveTab('profile')}
              >
                Profile
              </button>
              <button
                className={`${styles.tabButton} ${activeTab === 'hardware' ? styles.active : ''}`}
                onClick={() => setActiveTab('hardware')}
              >
                Hardware Setup
              </button>
              <button
                className={`${styles.tabButton} ${activeTab === 'progress' ? styles.active : ''}`}
                onClick={() => setActiveTab('progress')}
              >
                Progress
              </button>
            </div>

            <div className={styles.tabContent}>
              {activeTab === 'overview' && (
                <div className={styles.overview}>
                  <div className={styles.stats}>
                    <div className={styles.statCard}>
                      <h3>{userData?.progress_tracking?.overall_progress}%</h3>
                      <p>Overall Progress</p>
                    </div>
                    <div className={styles.statCard}>
                      <h3>{userData?.progress_tracking?.completed_modules}/{userData?.progress_tracking?.total_modules}</h3>
                      <p>Modules Completed</p>
                    </div>
                    <div className={styles.statCard}>
                      <h3>{userData?.last_accessed_module || 1}</h3>
                      <p>Current Module</p>
                    </div>
                  </div>

                  <div className={styles.quickActions}>
                    <h3>Quick Actions</h3>
                    <div className={styles.actionButtons}>
                      <Link className={styles.actionButton} to="/modules">
                        Browse Modules
                      </Link>
                      <Link className={styles.actionButton} to={`/modules/${userData?.last_accessed_module || 1}`}>
                        Continue Learning
                      </Link>
                      <Link className={styles.actionButton} to="/chapters">
                        View Chapters
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'profile' && (
                <div className={styles.profile}>
                  <h2>Personal Profile</h2>

                  <div className={styles.profileSection}>
                    <h3>Account Information</h3>
                    <div className={styles.infoRow}>
                      <span>Name:</span>
                      <span>{userData?.name}</span>
                    </div>
                    <div className={styles.infoRow}>
                      <span>Email:</span>
                      <span>{userData?.email}</span>
                    </div>
                    <div className={styles.infoRow}>
                      <span>Member Since:</span>
                      <span>{userData?.created_at ? new Date(userData.created_at).toLocaleDateString() : 'N/A'}</span>
                    </div>
                  </div>

                  <div className={styles.profileSection}>
                    <h3>Background Information</h3>
                    <div className={styles.infoRow}>
                      <span>Hardware Background:</span>
                      <span>{userData?.hardware_background || 'Not specified'}</span>
                    </div>
                    <div className={styles.infoRow}>
                      <span>Software Background:</span>
                      <span>{userData?.software_background || 'Not specified'}</span>
                    </div>
                    <div className={styles.infoRow}>
                      <span>Preferred Language:</span>
                      <span>{userData?.preferred_language || 'English'}</span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'hardware' && (
                <div className={styles.hardware}>
                  <h2>Hardware Profile</h2>
                  {hardwareProfile ? (
                    <div className={styles.hardwareOverview}>
                      <div className={styles.hardwareSection}>
                        <h3>Development Workstation</h3>
                        <div className={styles.infoRow}>
                          <span>GPU:</span>
                          <span>{hardwareProfile.workstation_gpu}</span>
                        </div>
                        <div className={styles.infoRow}>
                          <span>CPU:</span>
                          <span>{hardwareProfile.workstation_specs.cpu}</span>
                        </div>
                        <div className={styles.infoRow}>
                          <span>RAM:</span>
                          <span>{hardwareProfile.workstation_specs.ram}</span>
                        </div>
                        <div className={styles.infoRow}>
                          <span>Storage:</span>
                          <span>{hardwareProfile.workstation_specs.storage}</span>
                        </div>
                      </div>

                      <div className={styles.hardwareSection}>
                        <h3>Edge Computing Device</h3>
                        <div className={styles.infoRow}>
                          <span>Type:</span>
                          <span>{hardwareProfile.edge_kit_type}</span>
                        </div>
                        <div className={styles.infoRow}>
                          <span>Memory:</span>
                          <span>{hardwareProfile.edge_kit_specs.memory}</span>
                        </div>
                        <div className={styles.infoRow}>
                          <span>Connectivity:</span>
                          <span>{hardwareProfile.edge_kit_specs.connectivity}</span>
                        </div>
                        <div className={styles.infoRow}>
                          <span>Additional Sensors:</span>
                          <span>{hardwareProfile.edge_kit_specs.sensors}</span>
                        </div>
                      </div>

                      <div className={styles.hardwareSection}>
                        <h3>Access Level</h3>
                        <div className={styles.infoRow}>
                          <span>Level:</span>
                          <span>{hardwareProfile.access_level}</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p>You haven't set up your hardware profile yet. Complete the questionnaire below to personalize your learning experience.</p>
                  )}

                  <div className={styles.hardwareForm}>
                    <HardwareQuestionnaire
                      onSubmit={handleHardwareProfileSubmit}
                      initialData={hardwareProfile || {}}
                    />
                  </div>
                </div>
              )}

              {activeTab === 'progress' && (
                <div className={styles.progress}>
                  <h2>Learning Progress</h2>
                  <div className={styles.progressOverview}>
                    <div className={styles.progressBar}>
                      <div
                        className={styles.progressFill}
                        style={{ width: `${userData?.progress_tracking?.overall_progress}%` }}
                      ></div>
                    </div>
                    <p>{userData?.progress_tracking?.overall_progress}% Complete</p>
                  </div>

                  <div className={styles.moduleProgress}>
                    <h3>Module Progress</h3>
                    {[1, 2, 3, 4].map((moduleNum) => (
                      <div key={moduleNum} className={styles.moduleItem}>
                        <div className={styles.moduleInfo}>
                          <h4>Module {moduleNum}: {getModuleName(moduleNum)}</h4>
                          <span className={styles.moduleStatus}>
                            {moduleNum <= (userData?.progress_tracking?.completed_modules || 0) ? 'Completed' : 'In Progress'}
                          </span>
                        </div>
                        <div className={styles.moduleBar}>
                          <div
                            className={styles.moduleFill}
                            style={{ width: `${moduleNum <= (userData?.progress_tracking?.completed_modules || 0) ? 100 : 30}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

const getModuleName = (moduleNum) => {
  const modules = {
    1: 'ROS 2 Foundations',
    2: 'Digital Twin Systems',
    3: 'AI-Robot Brain',
    4: 'Vision-Language-Action Models'
  };
  return modules[moduleNum] || `Module ${moduleNum}`;
};

export default Dashboard;