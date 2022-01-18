import React, { useContext, useEffect } from 'react';
import ChannelSidebarItem from '../channelsidebaritem/channelsidebaritem.component';
import styles from './channelsidebar.module.scss';
import { GrChannel } from 'react-icons/gr'
import { RiContactsBookFill } from 'react-icons/ri'
import { Tree } from 'antd';
import { EventDataNode } from 'antd/lib/tree';
import { useFetchAllChannelsLazyQuery, useFetchAllTeamMembersLazyQuery } from '../../../apollo/generated/graphql';
import { AppContext } from '../../../context/AppContextProvider';
import { useRouter } from 'next/router';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { allChannelsAtom } from '../../../state/atoms/all-channels.atom';
import { channelTreeSelector } from '../../../state/selectors/channel-tree.selector';
import { allMembersAtom } from '../../../state/atoms/all-members.atom';
import { memberTreeSelector } from '../../../state/selectors/member-tree.selector';
import { popupAtom, PopupType } from '../../../state/atoms/popup.atom';
import cookie from 'react-cookies';

export enum NodeType {
  CHANNELS = 'channels',
  MEMBERS = 'members',
}

interface Props {
  show: boolean,
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>
}

const ChannelSidebar: React.FC<Props> = ({
  show = true,
  setShowMenu
}) => {
  const { teamId, recipientId } = useContext(AppContext);
  const [fetchAllChannels, { data: channelData }] = useFetchAllChannelsLazyQuery();
  const [fetchAllMembers, { data: memberData }] = useFetchAllTeamMembersLazyQuery();
  const setChannels = useSetRecoilState(allChannelsAtom);
  const setMembers = useSetRecoilState(allMembersAtom);
  const setCurrentPopup = useSetRecoilState(popupAtom)
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
      setMembers(memberData?.allTeamMembers);
      const userId = cookie.load('userId');
      const currentMember = memberData?.allTeamMembers.filter((member) => member.user.id === userId)?.[0];
      if (currentMember) {
        const tomorow = new Date();
        tomorow.setDate(new Date().getDate() + 1)
        cookie.save('memberId', currentMember.id, {
          expires: tomorow, // TODO: jwt
        });
      }
    }
  }, [memberData]);

  const onSelectNode = (selectedNode: EventDataNode, type: NodeType) => {
    setShowMenu(false);
    if (type === NodeType.CHANNELS) {
      if (selectedNode.key === 'add-channels') {
        setCurrentPopup({
          type: PopupType.CREATE_CHANNEL,
        });
        return;
      }
      router.push({
        pathname: '/app/client/[teamId]/channels/[channelId]',
        query: {
          teamId,
          channelId: selectedNode.key,
        }
      })
    } else {
      if (selectedNode.key === 'add-members') {
        setCurrentPopup({
          type: PopupType.ADD_MEMBER,
        });
        return;
      }
      router.push({
        pathname: '/app/client/[teamId]/member/[recipientId]',
        query: {
          teamId,
          recipientId: selectedNode.key,
        }
      })
    }
  }

  return (
    <div className={`${styles.channelSidebar} ${!show ? styles.hideOnMobile : ''}`}>
      <div className={styles.channelSidebarList}>
        <ChannelSidebarItem icon={<GrChannel />} name='Channel Browser' />
        <ChannelSidebarItem icon={<RiContactsBookFill />} name='People & user groups' />
        <Tree
          defaultExpandedKeys={[NodeType.CHANNELS]}
          className={styles.channelTree}
          treeData={channelTree}
          selectedKeys={[recipientId!]}
          onSelect={(_, { node }) => onSelectNode(node, NodeType.CHANNELS)}
        />
        <Tree
          className={styles.channelTree}
          treeData={memberTree}
          selectedKeys={[recipientId!]}
          onSelect={(_, { node }) => onSelectNode(node, NodeType.MEMBERS)}
        />
      </div>
    </div>
  )
}
export default ChannelSidebar;

