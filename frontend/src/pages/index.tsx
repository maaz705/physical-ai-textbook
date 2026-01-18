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
        <div className="row">
          <div className="col col--6 col--offset-3">
            <div className="text--center padding-horiz--md">
              <Heading as="h1" className="hero__title" style={{color: '#ffffff', fontSize: '3rem', fontWeight: 'bold'}}>
                Physical AI & Humanoid Robotics
              </Heading>
              <p className="hero__subtitle" style={{color: '#b0b0b0', fontSize: '1.5rem', marginTop: '1rem'}}>
                Master Next-Generation Robotics with AI-Powered Assistance
              </p>
              <div className={styles.buttons} style={{marginTop: '2rem', display: 'flex', justifyContent: 'center', gap: '1rem'}}>
                <Link
                  className="button button--primary button--lg"
                  to="/docs/curriculum">
                  Start Learning - 13 Weeks 🚀
                </Link>
                <Link
                  className="button button--secondary button--lg"
                  to="/modules">
                  Explore Modules
                </Link>
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
