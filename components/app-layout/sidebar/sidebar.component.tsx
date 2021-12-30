import React from 'react';
import SidebarHeader from '../../sidebarheader/sidebarheader.component';
import ChannelSidebar from '../channelsidebar/channelsidebar.component';
import styles from './sidebar.module.scss';

interface Props {

}

const Sidebar: React.FC<Props> = ({

}) => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.channelSidebar}>
        <SidebarHeader />
        <ChannelSidebar />
      </div>
    </div>
  )
}

export default Sidebar
