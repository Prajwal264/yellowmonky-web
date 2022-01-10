import React from 'react';
import styles from './sidebarheader.module.scss';
import { AiOutlineMessage } from 'react-icons/ai'
import { useRecoilValue } from 'recoil';
import { teamInfoAtom } from '../../state/atoms/team-info.atom';
interface Props {

}

const SidebarHeader: React.FC<Props> = ({

}) => {
  const teamInfo = useRecoilValue(teamInfoAtom);
  return (
    <div className={styles.sidebarHeader}>
      <div className={styles.sidebarHeaderButton}>
        <span>{teamInfo?.name}</span>
      </div>
      <button className={styles.composeButton}>
        <AiOutlineMessage />
      </button>
    </div>
  )
}

export default SidebarHeader
