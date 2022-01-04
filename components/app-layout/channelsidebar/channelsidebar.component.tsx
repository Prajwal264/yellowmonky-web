import React from 'react';
import ChannelSidebarItem from '../channelsidebaritem/channelsidebaritem.component';
import styles from './channelsidebar.module.scss';
import { GrChannel } from 'react-icons/gr'
import { RiContactsBookFill } from 'react-icons/ri'
import { BiHash } from 'react-icons/bi'
import { IoMdAddCircle } from 'react-icons/io'
import { Tree } from 'antd';
import { DataNode } from 'antd/lib/tree';
import Avatar from 'react-avatar';

interface Props {

}

const ChannelSidebar: React.FC<Props> = ({

}) => {
  const channelTree: DataNode[] = [{
    title: 'Channel',
    key: 'channel',
    children: [{
      title: <ChannelSidebarItem icon={<BiHash />} name='general' />,
      key: 'general',
    }, {
      title: <ChannelSidebarItem icon={<BiHash />} name='communication' />,
      key: 'communication',
    }, {
      title: <ChannelSidebarItem icon={<IoMdAddCircle />} name='Add Channel' />,
      key: 'add-channels',
    }]
  }]
  const memberTree: DataNode[] = [{
    title: 'Direct messages',
    key: 'direct-messages',
    children: [{
      title: <ChannelSidebarItem icon={<Avatar name='excitedchips' />} name='excitedchips' />,
      key: 'general',
    }, {
      title: <ChannelSidebarItem icon={<Avatar name='prajwal' />} name='prajwal' />,
      key: 'communication',
    }, {
      title: <ChannelSidebarItem icon={<IoMdAddCircle />} name='Add Channel' />,
      key: 'add-channels',
    }]
  }]
  return (
    <div className={styles.channelSidebar}>
      <div className={styles.channelSidebarList}>
        <ChannelSidebarItem icon={<GrChannel />} name='Channel Browser' />
        <ChannelSidebarItem icon={<RiContactsBookFill />} name='People & user groups' />
        <Tree
          className={styles.channelTree}
          treeData={channelTree}
        />
        <Tree
          className={styles.channelTree}
          treeData={memberTree}
        />
      </div>
    </div>
  )
}

export default ChannelSidebar
