import React from 'react';
import styles from './channelsidebaritem.module.scss';

interface Props {
  icon?: React.ReactElement<any, any>,
  name: string,
}

const ChannelSidebarItem: React.FC<Props> = ({
  icon = <></>,
  name,
}) => {
  return (
    <div className={styles.channelSidebarItem}>
      {icon}
      <span className={styles.channelSidebarItemName}>{name}</span>
    </div>
  )
}

export default ChannelSidebarItem
