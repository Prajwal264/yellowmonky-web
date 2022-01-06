import React from 'react';
import MessageListDayDivider from './message-list-day-divider/message-list-day-divider.component';
import styles from './message-list.module.scss';

interface Props {

}

const MessageList: React.FC<Props> = ({ }) => {
  return (
    <div className={styles.messageList}>
      <MessageListDayDivider date={new Date()} />
    </div>
  )
}

export default MessageList
