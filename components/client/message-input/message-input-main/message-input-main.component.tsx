import React from 'react';
import styles from './message-input-main.module.scss';
import MessageSendButton from './message-send-button/message-send-button.component';

interface Props {

}

const MessageInputMain: React.FC<Props> = ({ }) => {
  return (
    <div className={styles.messageInputMain}>
      <div className={styles.inputContainer}>
        <div className={styles.basicContainer}>
          {/* <div className="toolbar"></div> TODO*/}
          <div className={styles.containerMultilineInput}>
            <div className={styles.messageInputMessagePane}>
              <input className={styles.editor} placeholder='Send message to #communication' />
              <MessageSendButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MessageInputMain
