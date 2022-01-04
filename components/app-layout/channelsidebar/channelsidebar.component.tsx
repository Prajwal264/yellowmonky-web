import React, { Children, useContext, useEffect, useMemo, useState } from 'react';
import ChannelSidebarItem from '../channelsidebaritem/channelsidebaritem.component';
import styles from './channelsidebar.module.scss';
import { GrChannel } from 'react-icons/gr'
import { RiContactsBookFill } from 'react-icons/ri'
import { BiHash } from 'react-icons/bi'
import { IoMdAddCircle } from 'react-icons/io'
import { Tree } from 'antd';
import { DataNode } from 'antd/lib/tree';
import Avatar from 'react-avatar';
import { FetchAllChannelsQuery, useFetchAllChannelsLazyQuery } from '../../../apollo/generated/graphql';
import { AppContext } from '../../../context/AppContextProvider';
import toast from 'react-hot-toast';

interface Props {

}
const contructTree = (config: {
  parentNode: DataNode,
  children: FetchAllChannelsQuery['allChannels'],
  lastChild: DataNode,
}, treeType: 'channels' | 'members') => {
  const { parentNode, children, lastChild } = config;
  const tree = [parentNode];
  const childNodes = children.map((child) => ({
    title: <ChannelSidebarItem icon={<BiHash />} name={child?.name!} />,
    key: child?.id!,
  }))
  parentNode.children?.push(...childNodes);
  parentNode.children!.push(lastChild);
  return tree;
}

const ChannelSidebar: React.FC<Props> = ({
}) => {
  const { teamId } = useContext(AppContext);
  const [fetchAllChannels] = useFetchAllChannelsLazyQuery();
  const [channels, setChannels] = useState<FetchAllChannelsQuery['allChannels']>([]);
  useEffect(() => {
    if (teamId) {
      loadDependencies();
    }
  }, [teamId]);

  const loadDependencies = async () => {
    const response = await fetchAllChannels({
      variables: {
        teamId: teamId!
      }
    })
    if (response.error) {
      toast.error(response.error.message);
      return;
    }
    const allChannels = response.data?.allChannels;
    if (allChannels?.length) {
      setChannels(allChannels);
    }
  }
  const channelTree: DataNode[] = useMemo(() => {
    const parentNode: DataNode = {
      title: 'Channel',
      key: 'channel',
      children: [],
    };
    if (channels.length) {
      const lastChild = {
        title: <ChannelSidebarItem icon={<IoMdAddCircle />} name='Add Channel' />,
        key: 'add-channels',
        children: []
      }
      const tree = contructTree({
        parentNode,
        children: channels,
        lastChild
      }, 'channels');
      return tree;
    }
    return [parentNode];
  }, [channels])
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
export default ChannelSidebar;

