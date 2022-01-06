import React from 'react';
import PrimaryViewBody from './primary-view-body/primary-view-body.component';
import styles from './primary-view-content.module.scss';
import PrimaryViewFooter from './primary-view-footer/primary-view-footer.component';

interface Props {

}

const PrimaryViewContent: React.FC<Props> = ({

}) => {
  return (
    <div className={styles.primaryViewContent}>
      <PrimaryViewBody />
      <PrimaryViewFooter />
    </div>
  )
}

export default PrimaryViewContent
