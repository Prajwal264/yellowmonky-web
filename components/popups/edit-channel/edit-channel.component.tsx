import React, { useContext, useState } from 'react'
import ModalWrapper from '../modal-wrapper/modal-wrapper.component';
import { PopupType } from '../../../state/atoms/popup.atom'
import { Tabs } from 'antd';
import styles from './edit-channel.module.scss';
import FormInput from '../../shared/form-input/form-input.component';
import Avatar from 'react-avatar';
import EditFieldPopup from '../edit-field/edit-field.component';
import { useEditChannelMutation } from '../../../apollo/generated/graphql';
import { AppContext } from '../../../context/AppContextProvider';
import toast from 'react-hot-toast';
import { useRecoilState, useRecoilValue } from 'recoil';
import { channelInfoAtom } from '../../../state/atoms/channel-info.atom';
import { allMembersAtom } from '../../../state/atoms/all-members.atom';

const { TabPane } = Tabs;

interface Props {

}

export const FieldCard: React.FC<{
  lable: string,
  content: string,
  ctaText?: string,
  onClick?: React.MouseEventHandler<HTMLDivElement>,
}> = ({
  lable,
  content,
  ctaText,
  onClick
}) => {
    return (
      <div onClick={onClick} className={styles.fieldCard}>
        <div className={styles.flexSpaceBw}>
          <h3>{lable}</h3>
          {ctaText && <button>{ctaText}</button>}
        </div>
        <p>{content}</p>
      </div>
    );
  }

const EditChannelPopup: React.FC<Props> = ({

}) => {
  const { recipientId } = useContext(AppContext);
  const [overlayPopup, setOverlayPopup] = useState<{
    title: string,
    label: string,
    placeholder: string,
    defaultValue?: string,
    field: string,
  } | null>(null);
  const [editChannel] = useEditChannelMutation();
  const [searchTerm, setSearchTerm] = useState('');
  const [channelInfo, setChannelInfo] = useRecoilState(channelInfoAtom);
  const allMembers = useRecoilValue(allMembersAtom); // TODO: this has to be replaced with all members in a channel
  const closeOverlayPopup = () => {
    setOverlayPopup(null);
  }

  const editField = async (formData: { [key: string]: any }) => {
    try {
      const editChannelPromise = editChannel({
        variables: {
          ...formData,
          channelId: recipientId!,
        }
      })
      toast.promise(editChannelPromise, {
        loading: "editing channel",
        success: "Channel successfully edited",
        error: "Something went wrong"
      });
      const { data: editChannelResponse } = await editChannelPromise;
      if (editChannelResponse?.editChannel) {
        setChannelInfo(editChannelResponse?.editChannel)
      }
    } catch (e: any) {
      toast.error(e.message);
    }
  }
  return (
    <ModalWrapper
      popupType={PopupType.EDIT_CHANNEL}
      title={`# ${channelInfo?.name || ''}`}
      onOk={() => { }}
      disabled={false}
      onCancel={() => { }}
      showCtaSection={false}
    >
      <div className={styles.editChannelPopup}>
        <Tabs defaultActiveKey="about">
          <TabPane tab="About" key="about">
            <div className={styles.fieldGroup}>
              <FieldCard
                lable='Channel name'
                content={`# ${channelInfo?.name || ''}`}
                ctaText='Edit'
                onClick={() => {
                  setOverlayPopup({
                    title: "Rename this channel",
                    label: "Channel Name",
                    defaultValue: channelInfo?.name || '',
                    field: 'name',
                    placeholder: `# ${channelInfo?.name || ''}`
                  })
                }}
              />
            </div>
            <div className={styles.fieldGroup}>
              <FieldCard
                lable='Topic'
                content={"Add a topic"}
                ctaText='Edit'
                onClick={() => {
                  setOverlayPopup({
                    title: "Edit topic",
                    label: "",
                    defaultValue: channelInfo?.topics || '',
                    field: 'topics',
                    placeholder: "Add a topic"
                  })
                }}
              />
              <FieldCard
                lable='Description'
                content={"#This channel is for... well, everything else. It’s a place for team jokes, spur-of-the-moment ideas, and funny GIFs. Go wild!"}
                ctaText='Edit'
                onClick={() => {
                  setOverlayPopup({
                    title: "Edit description",
                    label: "",
                    defaultValue: channelInfo?.description || '',
                    field: 'description',
                    placeholder: "Add a description"
                  })
                }}
              />
              <FieldCard
                lable='Created by'
                content={"excitedchips on December 16, 2021"}
              />
            </div>
          </TabPane>
          <TabPane tab="Members (2)" key="members" className='bg-white'>
            <div className={styles.fieldGroup}>
              <FormInput
                name='memberSearchTerm'
                onChange={(e) => { setSearchTerm(e.target.value) }}
                value={searchTerm}
                inputAttributes={{
                  placeholder: "Find Members"
                }}
              />
            </div>
            {allMembers.filter((member) => member.user.username.includes(searchTerm)).map((member) => (
              <div className={styles.memberCard} key={member.id} >
                <div className={styles.item}>
                  <Avatar name={member.user?.username} className={styles.avatar} />
                  <strong>{member.user?.username} </strong>
                </div>
              </div>
            ))}
          </TabPane>
          <TabPane tab="Settings" key="3">
            <div className={styles.fieldGroup}>
              <FieldCard
                lable='Channel name'
                content={"#random"}
                ctaText='Edit'
                onClick={() => {
                  setOverlayPopup({
                    title: "Rename this channel",
                    label: "Channel Name",
                    defaultValue: channelInfo?.name,
                    field: 'name',
                    placeholder: `# ${channelInfo?.name}`
                  })
                }}
              />
            </div>
          </TabPane>
        </Tabs>
      </div>
      {overlayPopup && <EditFieldPopup
        popupData={overlayPopup}
        onOk={editField}
        closePopup={closeOverlayPopup}
      />}
    </ModalWrapper>
  )
}

export default EditChannelPopup
