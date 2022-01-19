import React, { useContext, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useFetchChannelLazyQuery, useFetchTeamMemberLazyQuery } from '../../../apollo/generated/graphql';
import { AppContext, RecipientType } from '../../../context/AppContextProvider';
import { allMembersAtom } from '../../../state/atoms/all-members.atom';
import { channelInfoAtom } from '../../../state/atoms/channel-info.atom';
import { memberInfoAtom } from '../../../state/atoms/member-info';
import { popupAtom, PopupType } from '../../../state/atoms/popup.atom';
import styles from './primary-view-header.module.scss';

interface Props {

}

const PrimaryViewHeader: React.FC<Props> = ({

}) => {
  const { recipientId, recipientType } = useContext(AppContext);
  const [fetchChannel, { data: channelInfo, error: channelInfoError }] = useFetchChannelLazyQuery();
  const [fetchTeamMember, { data: memberInfo, error: memberInfoError }] = useFetchTeamMemberLazyQuery();
  const setChannelInfo = useSetRecoilState(channelInfoAtom)
  const setMemberInfo = useSetRecoilState(memberInfoAtom)
  const setCurrentPopup = useSetRecoilState(popupAtom)
  useEffect(() => {
    if (recipientId) {
      loadDependencies();
    }
  }, [recipientId])

  const loadDependencies = async () => {
    if (recipientId) {
      if (recipientType === RecipientType.CHANNEL) {
        fetchChannel({
          variables: {
            channelId: recipientId,
          }
        }).catch((err) => {
          console.log(err)
        })
      } else {
        fetchTeamMember({
          variables: {
            memberId: recipientId,
          }
        })
      }
    }
  }

  useEffect(() => {
    if (channelInfo) {
      setChannelInfo(channelInfo.channel)
    }
  }, [channelInfo])

  useEffect(() => {
    if (memberInfo) {
      setMemberInfo(memberInfo.teamMember)
    }
  }, [memberInfo])


  useEffect(() => {
    if (channelInfoError) {
      toast.error(channelInfoError.message);
    }
  }, [channelInfoError])

  useEffect(() => {
    if (memberInfoError) {
      toast.error(memberInfoError.message);
    }
  }, [memberInfoError])

  const editChannelPopupTrigger = () => {
    setCurrentPopup({
      type: PopupType.EDIT_CHANNEL,
    });
  }

  return (
    <div className={styles.primaryViewHeader}>
      <div className={styles.text}>
        <div className={styles.coachmarkAnchor}>
          <button className={styles.channelButton} onClick={editChannelPopupTrigger}>
            {recipientType === RecipientType.CHANNEL ? <div className={styles.headerTitle}>
              <span>#&nbsp;</span>
              <span>{channelInfo?.channel?.name}</span>
            </div> : <div className={styles.headerTitle}>
              <span>{memberInfo?.teamMember?.user.username}</span>
            </div>}
          </button>
        </div>
      </div>
      <div className={styles.actions}>
        <div className={styles.channelUserDetails}>
          <div className={styles.slackAvatars}>
            <div className={styles.avatar}>
              {/* <img src="" alt="" /> */}
            </div>
            <div className={styles.avatar}>
              {/* <img src="" alt="" /> */}
            </div>
            <span className={styles.count}>2</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PrimaryViewHeader
