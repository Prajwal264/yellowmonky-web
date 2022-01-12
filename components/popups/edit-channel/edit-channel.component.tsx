import React from 'react'
import ModalWrapper from '../modal-wrapper/modal-wrapper.component';
import { PopupType } from '../../../state/atoms/popup.atom'
import { Tabs } from 'antd';
import styles from './edit-channel.module.scss';

const { TabPane } = Tabs;

interface Props {

}

const EditChannelPopup: React.FC<Props> = ({

}) => {
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
            Content of Tab Pane 1
          </TabPane>
          <TabPane tab="Members (2)" key="members">
            Content of Tab Pane 2
          </TabPane>
          <TabPane tab="Settings" key="3">
            Content of Tab Pane 3
          </TabPane>
        </Tabs>
      </div>
    </ModalWrapper>
  )
}

export default EditChannelPopup
