import React from 'react';
import { useRecoilValue } from 'recoil';
import { teamInfoAtom } from '../../../state/atoms/team-info.atom';
import styles from './header.module.scss';

interface Props {

}

const Header: React.FC<Props> = () => {
  const teamInfo = useRecoilValue(teamInfoAtom);
  return (
    <div className={styles.header}>
      <div className={styles.sidebar}>
      </div>
      <div className={styles.searchContainer}>
        <button>
          <span>Search {teamInfo?.name}</span>
        </button>
      </div>
      <div className={styles.rightSection}>
      </div>
    </div>
  )
}

export default Header
