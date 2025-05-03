'use client'

import styles from './page.module.scss';
import clsx from 'clsx';
import TechStackList from './TechStackList';

export default function Page() {
  return (
    <div className={clsx(styles['main-container'])}>
      <TechStackList />
    </div>
  );
}
