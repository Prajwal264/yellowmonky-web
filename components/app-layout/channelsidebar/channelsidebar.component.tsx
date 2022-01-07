import React, { useContext, useEffect } from 'react';
import ChannelSidebarItem from '../channelsidebaritem/channelsidebaritem.component';
import styles from './channelsidebar.module.scss';
import { GrChannel } from 'react-icons/gr'
import { RiContactsBookFill } from 'react-icons/ri'
import { BiHash } from 'react-icons/bi'
import { Tree } from 'antd';
import { DataNode, EventDataNode } from 'antd/lib/tree';
import Avatar from 'react-avatar';
import { useFetchAllChannelsLazyQuery, useFetchAllTeamMembersLazyQuery } from '../../../apollo/generated/graphql';
import { AppContext } from '../../../context/AppContextProvider';
import { useRouter } from 'next/router';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { channelsAtom } from '../../../state/atoms/channel.atom';
import { channelTreeSelector } from '../../../state/selectors/channel-tree.selector';
import { membersAtom } from '../../../state/atoms/member.atom';
import { memberTreeSelector } from '../../../state/selectors/member-tree.selector';

export enum NodeType {
  CHANNELS = 'channels',
  MEMBERS = 'members',
}

interface Props {

}

const ChannelSidebar: React.FC<Props> = ({
}) => {
  const { teamId } = useContext(AppContext);
  const [fetchAllChannels, { data: channelData }] = useFetchAllChannelsLazyQuery();
  const [fetchAllMembers, { data: memberData }] = useFetchAllTeamMembersLazyQuery();
  const setChannels = useSetRecoilState(channelsAtom);
  const setMembers = useSetRecoilState(membersAtom);
  const channelTree = useRecoilValue(channelTreeSelector)
  const memberTree = useRecoilValue(memberTreeSelector)
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

  useEffect(() => {
    if (channelData?.allChannels.length) {
      setChannels(channelData?.allChannels)
    }
  }, [channelData]);

  useEffect(() => {
    if (memberData?.allTeamMembers.length) {
      setMembers(memberData?.allTeamMembers)
    }
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

