import React from 'react';
import styles from './message-pane.module.scss';
import MessageList from './messge-list/message-list.component';

interface Props {

}

const MessagePane: React.FC<Props> = ({ }) => {
  return (
    <div className={styles.messagePane}>
      <MessageList />
    </div>
  )
}

export default MessagePane
