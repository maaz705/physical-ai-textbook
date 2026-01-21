import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className="container">
        <div className={clsx('row', styles.splitScreen)}>
          {/* Left side - Text content */}
          <div className="col col--6" style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: '500px'}}>
            <div className={styles.textContent}>
              <Heading as="h1" className={clsx('hero__title', styles.mainTitle)}>
                PHYSICAL AI & HUMANOID ROBOTICS
              </Heading>
              <p className={clsx('hero__subtitle', styles.subtitle)}>
                The 13-Week Blueprint
              </p>

              {/* Contextual icons */}
              <div className={styles.contextualIcons}>
                <span className={styles.monoLabel}>// Open Source</span>
                <span className={styles.monoLabel}>// Academic Standard</span>
              </div>

              <div className={styles.buttonGroup}>
                <Link
                  className={clsx('button', styles.primaryButton)}
                  to="/docs/curriculum">
                  START LEARNING →
                </Link>
                <Link
                  className={clsx('button', styles.ghostButton)}
                  to="/docs/curriculum">
                  View Curriculum
                </Link>
              </div>
            </div>
          </div>

          {/* Right side - 3D book cover */}
          <div className="col col--6" style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <div className={styles.bookCoverContainer}>
              <div className={styles.bookCover}>
                <div className={styles.bookSpine}></div>
                <div className={styles.bookFace}>
                  <div className={styles.robotSchematic}>
                    <img
                      src="/img/robot-hero-schematic.svg"
                      alt="Humanoid Robot Schematic"
                      className={styles.robotImage}
                    />
                  </div>
                  <div className={styles.bookTitle}>
                    <h3>PHYSICAL AI & HUMANOID ROBOTICS</h3>
                    <p>13-Week Blueprint</p>
                  </div>
                </div>
                <div className={styles.bookEdge}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
