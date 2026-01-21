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
    title: 'Actuator Control',
    Svg: require('@site/static/img/robot-actuator-icon.svg').default,
    description: (
      <>
        Master precision control systems and actuator mechanisms for humanoid robotics
        with distributed computing, hardware abstraction, and real-time feedback.
      </>
    ),
  },
  {
    title: 'AI Brain Integration',
    Svg: require('@site/static/img/robot-ai-icon.svg').default,
    description: (
      <>
        Develop intelligent decision-making systems with neural networks and cognitive
        architectures for autonomous robot behavior and adaptive learning.
      </>
    ),
  },
  {
    title: 'Manipulation & Control',
    Svg: require('@site/static/img/robot-arm-icon.svg').default,
    description: (
      <>
        Implement advanced manipulation algorithms and control systems for precise
        physical interaction with complex real-world environments and objects.
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
