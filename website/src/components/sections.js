import React from 'react';
import clsx from 'clsx';
import styles from './sections.module.css';
import { featureList, conceptsList } from "./fixtures";

function Feature({Svg, title, description, size}) {
  return (
    <div className={clsx('col', `col--${size}`)}>
      <div className="text--center">
        <Svg className={styles.featureSvg} alt={title} />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export const Features = () => {
  return (
    <section className={styles.features}>
      <div className="container">
        <h2 className="text--center">Features</h2>
        <div className="row">
          {featureList.map((props, idx) => (
            <Feature key={idx} {...props} size={3} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function Concepts() {
  return (
    <section className={styles.features}>
      <div className="container">
        <h2 className="text--center">Concepts</h2>
        <div className="row">
          {conceptsList.map((props, idx) => (
            <Feature key={idx} {...props} size={4} />
          ))}
        </div>
      </div>
    </section>
  );
}

