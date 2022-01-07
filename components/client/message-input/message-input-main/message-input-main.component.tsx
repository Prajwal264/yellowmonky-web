import React from 'react';
import { useRecoilValue } from 'recoil';
import { channelInfoAtom } from '../../../../state/atoms/channel-info.atom';
import styles from './message-input-main.module.scss';
import MessageSendButton from './message-send-button/message-send-button.component';

interface Props {

}

const MessageInputMain: React.FC<Props> = ({ }) => {
  const channelInfo = useRecoilValue(channelInfoAtom)
  return (
    <div className={styles.messageInputMain}>
      <div className={styles.inputContainer}>
        <div className={styles.basicContainer}>
          {/* <div className="toolbar"></div> TODO*/}
          <div className={styles.containerMultilineInput}>
            <div className={styles.messageInputMessagePane}>
              <input className={styles.editor} placeholder={`Send message to #${channelInfo?.name}`} />
              <MessageSendButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MessageInputMain
