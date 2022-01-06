import React from 'react';
import MessageInputMain from './message-input-main/message-input-main.component';
import MessageInputTop from './message-input-top/message-input-top.component';
import styles from './message-input.module.scss';

interface Props {

}

const MessageInput: React.FC<Props> = ({ }) => {
  return (
    <div className={styles.messageInput}>
      <MessageInputTop />
      <MessageInputMain />
    </div>
  )
}

export default MessageInput
