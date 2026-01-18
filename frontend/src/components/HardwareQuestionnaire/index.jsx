import React, { useState, useEffect } from 'react';
import styles from './HardwareQuestionnaire.module.css';

const HardwareQuestionnaire = ({ onSubmit, initialData = {} }) => {
  const [formData, setFormData] = useState({
    workstation_gpu: initialData.workstation_gpu || '',
    workstation_specs: initialData.workstation_specs || {},
    edge_kit_type: initialData.edge_kit_type || '',
    edge_kit_specs: initialData.edge_kit_specs || {},
    access_level: initialData.access_level || 'none'
  });
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSpecChange = (category, field, value) => {
    setFormData(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: value
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await onSubmit(formData);
    } catch (err) {
      setError('Failed to save hardware profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => setStep(prev => Math.min(prev + 1, 3));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  return (
    <div className={styles.questionnaireContainer}>
      <div className={styles.questionnaireHeader}>
        <h2>Hardware Profile Questionnaire</h2>
        <p>Tell us about your hardware setup to personalize your learning experience</p>
        <div className={styles.progressBar}>
          <div className={styles.progressStep}>
            <div className={`${styles.stepIndicator} ${step >= 1 ? styles.active : ''}`}>1</div>
            <span>Workstation</span>
          </div>
          <div className={styles.progressStep}>
            <div className={`${styles.stepIndicator} ${step >= 2 ? styles.active : ''}`}>2</div>
            <span>Edge Devices</span>
          </div>
          <div className={styles.progressStep}>
            <div className={`${styles.stepIndicator} ${step >= 3 ? styles.active : ''}`}>3</div>
            <span>Review</span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className={styles.questionnaireForm}>
        {error && <div className={styles.error}>{error}</div>}

        {step === 1 && (
          <div className={styles.stepContent}>
            <h3>Your Development Workstation</h3>

            <div className={styles.formGroup}>
              <label htmlFor="workstation_gpu">GPU Model</label>
              <select
                id="workstation_gpu"
                name="workstation_gpu"
                value={formData.workstation_gpu}
                onChange={handleChange}
              >
                <option value="">Select your GPU</option>
                <option value="None">No dedicated GPU</option>
                <option value="RTX 3060">RTX 3060</option>
                <option value="RTX 3070">RTX 3070</option>
                <option value="RTX 3080">RTX 3080</option>
                <option value="RTX 4070 Ti">RTX 4070 Ti (Minimum)</option>
                <option value="RTX 4080">RTX 4080</option>
                <option value="RTX 4090">RTX 4090</option>
                <option value="Other">Other (please specify)</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label>CPU Specifications</label>
              <input
                type="text"
                placeholder="e.g., Intel i7-12700K or AMD Ryzen 7 5800X"
                value={formData.workstation_specs.cpu || ''}
                onChange={(e) => handleSpecChange('workstation_specs', 'cpu', e.target.value)}
              />
            </div>

            <div className={styles.formGroup}>
              <label>RAM</label>
              <input
                type="text"
                placeholder="e.g., 32GB DDR4-3200MHz"
                value={formData.workstation_specs.ram || ''}
                onChange={(e) => handleSpecChange('workstation_specs', 'ram', e.target.value)}
              />
            </div>

            <div className={styles.formGroup}>
              <label>Storage</label>
              <input
                type="text"
                placeholder="e.g., 1TB NVMe SSD"
                value={formData.workstation_specs.storage || ''}
                onChange={(e) => handleSpecChange('workstation_specs', 'storage', e.target.value)}
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className={styles.stepContent}>
            <h3>Your Edge Computing Devices</h3>

            <div className={styles.formGroup}>
              <label htmlFor="edge_kit_type">Edge Device Type</label>
              <select
                id="edge_kit_type"
                name="edge_kit_type"
                value={formData.edge_kit_type}
                onChange={handleChange}
              >
                <option value="">Select your edge device</option>
                <option value="None">No edge device</option>
                <option value="Jetson Orin Nano">Jetson Orin Nano</option>
                <option value="Jetson Orin NX">Jetson Orin NX</option>
                <option value="Jetson AGX Orin">Jetson AGX Orin</option>
                <option value="Raspberry Pi">Raspberry Pi 4/5</option>
                <option value="Other">Other (please specify)</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label>Memory</label>
              <input
                type="text"
                placeholder="e.g., 8GB or 16GB"
                value={formData.edge_kit_specs.memory || ''}
                onChange={(e) => handleSpecChange('edge_kit_specs', 'memory', e.target.value)}
              />
            </div>

            <div className={styles.formGroup}>
              <label>Connectivity</label>
              <input
                type="text"
                placeholder="e.g., USB-C, HDMI, Ethernet"
                value={formData.edge_kit_specs.connectivity || ''}
                onChange={(e) => handleSpecChange('edge_kit_specs', 'connectivity', e.target.value)}
              />
            </div>

            <div className={styles.formGroup}>
              <label>Additional Sensors</label>
              <textarea
                placeholder="Describe any additional sensors (cameras, LiDAR, IMU, etc.)"
                value={formData.edge_kit_specs.sensors || ''}
                onChange={(e) => handleSpecChange('edge_kit_specs', 'sensors', e.target.value)}
                rows="3"
              />
            </div>
          </div>
        )}

        {step === 3 && (
          <div className={styles.stepContent}>
            <h3>Access Level & Review</h3>

            <div className={styles.formGroup}>
              <label htmlFor="access_level">Hardware Access Level</label>
              <select
                id="access_level"
                name="access_level"
                value={formData.access_level}
                onChange={handleChange}
              >
                <option value="none">No physical hardware access</option>
                <option value="simulation">Simulation only</option>
                <option value="physical_hardware">Physical hardware access</option>
              </select>
              <small className={styles.helpText}>
                This helps us tailor content to your available resources
              </small>
            </div>

            <div className={styles.reviewSection}>
              <h4>Your Hardware Profile</h4>
              <div className={styles.reviewItem}>
                <strong>Workstation:</strong> {formData.workstation_gpu || 'Not specified'}
              </div>
              <div className={styles.reviewItem}>
                <strong>Edge Device:</strong> {formData.edge_kit_type || 'Not specified'}
              </div>
              <div className={styles.reviewItem}>
                <strong>Access Level:</strong> {formData.access_level}
              </div>
            </div>
          </div>
        )}

        <div className={styles.navigationButtons}>
          {step > 1 && (
            <button type="button" onClick={prevStep} className={styles.navButton}>
              Previous
            </button>
          )}

          {step < 3 ? (
            <button type="button" onClick={nextStep} className={styles.navButton}>
              Next
            </button>
          ) : (
            <button type="submit" disabled={loading} className={styles.submitButton}>
              {loading ? 'Saving...' : 'Save Hardware Profile'}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default HardwareQuestionnaire;