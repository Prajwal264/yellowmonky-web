import React from 'react';
import PrimaryViewBody from './primary-view-body/primary-view-body.component';
import styles from './primary-view-content.module.scss';

interface Props {

}

const PrimaryViewContent: React.FC<Props> = ({

}) => {
  return (
    <div className={styles.primaryViewContent}>
      <PrimaryViewBody />
    </div>
  )
}

export default PrimaryViewContent
