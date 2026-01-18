import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'ROS 2 Framework',
    Svg: require('@site/static/img/ros2-icon.svg').default,
    description: (
      <>
        Master Robot Operating System 2 - the standard framework for robotics development
        with distributed computing, hardware abstraction, and device drivers.
      </>
    ),
  },
  {
    title: 'Digital Twins',
    Svg: require('@site/static/img/digital-twin-icon.svg').default,
    description: (
      <>
        Create realistic simulations with NVIDIA Isaac Sim and Gazebo for testing
        robot behaviors in virtual environments before deploying to physical hardware.
      </>
    ),
  },
  {
    title: 'Isaac Lab & VLA Models',
    Svg: require('@site/static/img/isaac-vla-icon.svg').default,
    description: (
      <>
        Leverage advanced AI models for vision-language-action integration,
        enabling robots to perceive, reason, and act in complex real-world scenarios.
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={clsx(styles.features, 'glass-card')} style={{padding: '3rem 0', margin: '2rem 0'}}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
