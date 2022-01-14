import React from 'react'
import ModalWrapper from '../modal-wrapper/modal-wrapper.component';
import { popupAtom, PopupType } from '../../../state/atoms/popup.atom'
import { Tabs } from 'antd';
import styles from './edit-channel.module.scss';
import FormInput from '../../shared/form-input/form-input.component';
import Avatar from 'react-avatar';
import { useSetRecoilState } from 'recoil';

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
  const setCurrentPopup = useSetRecoilState(popupAtom);
  return (
    <ModalWrapper
      popupType={PopupType.EDIT_CHANNEL}
      title={'# Random'}
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
                content={"#random"}
                ctaText='Edit'
              />
            </div>
            <div className={styles.fieldGroup}>
              <FieldCard
                lable='Topic'
                content={"Add a topic"}
                ctaText='Edit'
              />
              <FieldCard
                lable='Description'
                content={"#This channel is for... well, everything else. It’s a place for team jokes, spur-of-the-moment ideas, and funny GIFs. Go wild!"}
                ctaText='Edit'
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
                onChange={() => { }}
                value=''
                inputAttributes={{
                  placeholder: "Find Members"
                }}
              />
            </div>
            <div className={styles.memberCard}>
              <div className={styles.item}>
                <Avatar name='prajwal' className={styles.avatar} />
                <strong>Prajwal</strong>
              </div>
            </div>
            <div className={styles.memberCard}>
              <div className={styles.item}>
                <Avatar name='prajwal' className={styles.avatar} />
                <strong>Prajwal</strong>
              </div>
            </div>
          </TabPane>
          <TabPane tab="Settings" key="3">
            <div className={styles.fieldGroup}>
              <FieldCard
                lable='Channel name'
                content={"#random"}
                ctaText='Edit'
              />
            </div>
          </TabPane>
        </Tabs>
      </div>
    </ModalWrapper>
  )
}

export default EditChannelPopup
