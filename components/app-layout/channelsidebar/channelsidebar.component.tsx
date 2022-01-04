import React, { useContext, useEffect, useMemo, useState } from 'react';
import ChannelSidebarItem from '../channelsidebaritem/channelsidebaritem.component';
import styles from './channelsidebar.module.scss';
import { GrChannel } from 'react-icons/gr'
import { RiContactsBookFill } from 'react-icons/ri'
import { BiHash } from 'react-icons/bi'
import { IoMdAddCircle } from 'react-icons/io'
import { Tree } from 'antd';
import { DataNode } from 'antd/lib/tree';
import Avatar from 'react-avatar';
import { FetchAllChannelsQuery, FetchAllTeamMembersQuery, useFetchAllChannelsLazyQuery, useFetchAllTeamMembersLazyQuery } from '../../../apollo/generated/graphql';
import { AppContext } from '../../../context/AppContextProvider';
import toast from 'react-hot-toast';

interface Props {

}
const contructTree = (config: {
  parentNode: DataNode,
  children: any, // TODO: fix type
  lastChild: DataNode,
}, treeType: 'channels' | 'members') => {
  const { parentNode, children, lastChild } = config;
  const tree = [parentNode];
  let childNodes = [];
  if (treeType === 'channels') {
    childNodes = children.map((child: any) => ({
      title: <ChannelSidebarItem icon={<BiHash />} name={child?.name!} />,
      key: child?.id!,
    }))
  } else {
    childNodes = children.map((child: any) => ({
      title: <ChannelSidebarItem icon={<Avatar name={child.user.username} />} name={child.user.username} />,
      key: child.id,
    }))
  }
  parentNode.children?.push(...childNodes);
  parentNode.children!.push(lastChild);
  return tree;
}

const ChannelSidebar: React.FC<Props> = ({
}) => {
  const { teamId } = useContext(AppContext);
  const [fetchAllChannels] = useFetchAllChannelsLazyQuery();
  const [fetchAllMembers] = useFetchAllTeamMembersLazyQuery();
  const [channels, setChannels] = useState<FetchAllChannelsQuery['allChannels']>([]);
  const [members, setMembers] = useState<FetchAllTeamMembersQuery['allTeamMembers']>([]);
  useEffect(() => {
    if (teamId) {
      loadDependencies();
    }
  }, [teamId]);

  const loadDependencies = async () => {
    const channelsPromise = fetchAllChannels({
      variables: {
        teamId: teamId!
      }
    });
    const membersPromise = fetchAllMembers({
      variables: {
        teamId: teamId!
      }
    })
    const [channelsResponse, membersResponse] = await Promise.all([channelsPromise, membersPromise]);
    if (channelsResponse.error) {
      toast.error(channelsResponse.error.message);
      return;
    }
    if (membersResponse.error) {
      toast.error(membersResponse.error.message);
      return;
    }
    const allChannels = channelsResponse.data?.allChannels;
    if (allChannels?.length) {
      setChannels(allChannels);
    }
    const allTeamMembers = membersResponse.data?.allTeamMembers;
    if (allTeamMembers?.length) {
      setMembers(allTeamMembers);
    }
  }
  const channelTree: DataNode[] = useMemo(() => {
    const parentNode: DataNode = {
      title: 'Channels',
      key: 'channels',
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
  }, [channels]);

  const memberTree: DataNode[] = useMemo(() => {
    const parentNode: DataNode = {
      title: 'Direct messages',
      key: 'direct-messages',
      children: [],
    };
    if (members.length) {
      const lastChild = {
        title: <ChannelSidebarItem icon={<IoMdAddCircle />} name='Add Members' />,
        key: 'add-members',
        children: []
      }
      const tree = contructTree({
        parentNode,
        children: members,
        lastChild
      }, 'members');
      return tree;
    }
    return [parentNode];
  }, [members]);

  return (
    <div className={styles.channelSidebar}>
      <div className={styles.channelSidebarList}>
        <ChannelSidebarItem icon={<GrChannel />} name='Channel Browser' />
        <ChannelSidebarItem icon={<RiContactsBookFill />} name='People & user groups' />
        <Tree
          defaultExpandedKeys={['channels']}
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

