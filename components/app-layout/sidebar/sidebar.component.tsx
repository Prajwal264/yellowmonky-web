import React, { useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import SidebarHeader from '../../sidebarheader/sidebarheader.component';
import ChannelSidebar from '../channelsidebar/channelsidebar.component';
import styles from './sidebar.module.scss';

interface Props {

}

const Sidebar: React.FC<Props> = ({

}) => {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <div className={styles.sidebar}>
      <div className={styles.dropdownIcon} onClick={() => setShowMenu(!showMenu)}>
        <GiHamburgerMenu color='#fff' />
      </div>
      <div className={styles.channelSidebar}>
        <SidebarHeader />
        <ChannelSidebar show={showMenu} setShowMenu={setShowMenu} />
      </div>
    </div>
  )
}

export default Sidebar
