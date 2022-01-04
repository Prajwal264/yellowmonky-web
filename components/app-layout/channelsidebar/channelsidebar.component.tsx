import React, { useContext, useEffect, useMemo, useState } from 'react';
import ChannelSidebarItem from '../channelsidebaritem/channelsidebaritem.component';
import styles from './channelsidebar.module.scss';
import { GrChannel } from 'react-icons/gr'
import { RiContactsBookFill } from 'react-icons/ri'
import { BiHash } from 'react-icons/bi'
import { IoMdAddCircle } from 'react-icons/io'
import { Tree } from 'antd';
import { DataNode, EventDataNode } from 'antd/lib/tree';
import Avatar from 'react-avatar';
import { FetchAllChannelsQuery, FetchAllTeamMembersQuery, useFetchAllChannelsLazyQuery, useFetchAllTeamMembersLazyQuery } from '../../../apollo/generated/graphql';
import { AppContext } from '../../../context/AppContextProvider';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';

export enum NodeType {
  CHANNELS = 'channels',
  MEMBERS = 'members',
}

interface Props {

}
const contructTree = (config: {
  parentNode: DataNode,
  children: any, // TODO: fix type
  lastChild: DataNode,
}, treeType: NodeType) => {
  const { parentNode, children, lastChild } = config;
  const tree = [parentNode];
  let childNodes = [];
  if (treeType === NodeType.CHANNELS) {
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
  const [fetchAllChannels, { data: channelData }] = useFetchAllChannelsLazyQuery();
  const [fetchAllMembers, { data: memberData }] = useFetchAllTeamMembersLazyQuery();
  const router = useRouter();
  useEffect(() => {
    if (teamId) {
      loadDependencies();
    }
  }, [teamId]);

  const loadDependencies = async () => {
    const options = {
      variables: {
        teamId: teamId!
      }
    };
    const channelsPromise = fetchAllChannels(options);
    const membersPromise = fetchAllMembers(options)
    await Promise.all([channelsPromise, membersPromise]);
  }
  const channelTree: DataNode[] = useMemo(() => {
    const parentNode: DataNode = {
      title: 'Channels',
      key: NodeType.CHANNELS,
      children: [],
      selectable: false,
    };
    if (channelData?.allChannels.length) {
      const lastChild = {
        title: <ChannelSidebarItem icon={<IoMdAddCircle />} name='Add Channel' />,
        key: 'add-channels',
        children: [],
      }
      const tree = contructTree({
        parentNode,
        children: channelData?.allChannels,
        lastChild
      }, NodeType.CHANNELS);
      return tree;
    }
    return [parentNode];
  }, [channelData]);

  const memberTree: DataNode[] = useMemo(() => {
    const parentNode: DataNode = {
      title: 'Direct messages',
      key: NodeType.MEMBERS,
      children: [],
      selectable: false,
    };
    if (memberData?.allTeamMembers.length) {
      const lastChild = {
        title: <ChannelSidebarItem icon={<IoMdAddCircle />} name='Add Members' />,
        key: 'add-members',
        children: []
      }
      const tree = contructTree({
        parentNode,
        children: memberData?.allTeamMembers,
        lastChild
      }, NodeType.MEMBERS);
      return tree;
    }
    return [parentNode];
  }, [memberData]);

  const onSelectNode = (selectedNode: EventDataNode, type: NodeType) => {
    if (type === NodeType.CHANNELS) {
      router.push({
        pathname: '/app/client/[teamId]/channels/[channelId]',
        query: {
          teamId,
          channelId: selectedNode.key,
        }
      })
    }
  }

  return (
    <div className={styles.channelSidebar}>
      <div className={styles.channelSidebarList}>
        <ChannelSidebarItem icon={<GrChannel />} name='Channel Browser' />
        <ChannelSidebarItem icon={<RiContactsBookFill />} name='People & user groups' />
        <Tree
          defaultExpandedKeys={['channels']}
          className={styles.channelTree}
          treeData={channelTree}
          onSelect={(_, { node }) => onSelectNode(node, NodeType.CHANNELS)}
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

