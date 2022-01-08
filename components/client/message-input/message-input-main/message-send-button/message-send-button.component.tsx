import React from 'react';
import styles from './message-send-button.module.scss';
import { HiPaperAirplane } from 'react-icons/hi'

interface Props {
  onClick: React.MouseEventHandler<HTMLButtonElement> | (() => Promise<void>)
}

const MessageSendButton: React.FC<Props> = ({ onClick }) => {
  return (
    <div className={styles.messageSendButton}>
      <span>
        <button onClick={onClick}>
          <HiPaperAirplane />
        </button>
      </span>
    </div>
  )
}

export default MessageSendButton
