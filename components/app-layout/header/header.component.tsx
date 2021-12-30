import React from 'react';
import styles from './header.module.scss';

interface Props {

}

const Header: React.FC<Props> = () => {
  return (
    <div className={styles.header}>
      <div className={styles.sidebar}>
      </div>
      <div className={styles.searchContainer}>
        <button>
          <span>Search ExcitedChips</span>
        </button>
      </div>
      <div className={styles.rightSection}>
      </div>
    </div>
  )
}

export default Header
