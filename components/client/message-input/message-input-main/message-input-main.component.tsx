import React from 'react';
import styles from './message-input-main.module.scss';

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
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MessageInputMain
