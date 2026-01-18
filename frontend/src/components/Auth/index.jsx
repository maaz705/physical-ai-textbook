import React, { useState, useContext } from 'react';
import styles from './Auth.module.css';
import { AuthContext } from '../../contexts/AuthContext';

const AuthComponent = ({ mode = 'login' }) => {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    password: '',
    confirmPassword: '',
    hardwareBackground: '',
    softwareBackground: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login, register } = useContext(AuthContext);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (mode === 'register') {
        if (formData.password !== formData.confirmPassword) {
          setError('Passwords do not match');
          setLoading(false);
          return;
        }

        await register({
          email: formData.email,
          name: formData.name,
          password: formData.password,
          hardware_background: formData.hardwareBackground,
          software_background: formData.softwareBackground
        });
      } else {
        await login(formData.email, formData.password);
      }
    } catch (err) {
      setError(err.message || 'An error occurred during authentication');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authForm}>
        <h2>{mode === 'login' ? 'Login' : 'Register'}</h2>

        {error && <div className={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit}>
          {mode === 'register' && (
            <div className={styles.formGroup}>
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
          )}

          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {mode === 'register' && (
            <>
              <div className={styles.formGroup}>
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="hardwareBackground">Hardware Background</label>
                <select
                  id="hardwareBackground"
                  name="hardwareBackground"
                  value={formData.hardwareBackground}
                  onChange={handleChange}
                >
                  <option value="">Select your hardware background</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="softwareBackground">Software Background</label>
                <select
                  id="softwareBackground"
                  name="softwareBackground"
                  value={formData.softwareBackground}
                  onChange={handleChange}
                >
                  <option value="">Select your software background</option>
                  <option value="none">No Experience</option>
                  <option value="basic">Basic</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
            </>
          )}

          <button
            type="submit"
            disabled={loading}
            className={styles.submitButton}
          >
            {loading ? 'Processing...' : (mode === 'login' ? 'Login' : 'Register')}
          </button>
        </form>

        <div className={styles.switchMode}>
          {mode === 'login' ? (
            <p>
              Don't have an account?{' '}
              <a href="#" onClick={(e) => e.preventDefault()}>Register here</a>
            </p>
          ) : (
            <p>
              Already have an account?{' '}
              <a href="#" onClick={(e) => e.preventDefault()}>Login here</a>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthComponent;