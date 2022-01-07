import React from 'react';
import styles from './message-send-button.module.scss';
import { HiPaperAirplane } from 'react-icons/hi'

interface Props {
}

const MessageSendButton: React.FC<Props> = ({ }) => {
  return (
    <div className={styles.messageSendButton}>
      <span>
        <button>
          <HiPaperAirplane />
        </button>
      </span>
    </div>
  )
}

export default MessageSendButton
