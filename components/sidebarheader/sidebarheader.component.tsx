import React from 'react';
import styles from './sidebarheader.module.scss';

interface Props {

}

const SidebarHeader: React.FC<Props> = ({

}) => {
  return (
    <div className={styles.sidebarHeader}>
      <div className={styles.sidebarHeaderButton}>
        <span>ExcitedChips</span>
      </div>
      <button className={styles.composeButton}>

      </button>
    </div>
  )
}

export default SidebarHeader
