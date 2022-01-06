import React from 'react';
import styles from './message-list-day-divider.module.scss';

interface Props {
  date: Date
}

const MessageListDayDivider: React.FC<Props> = ({
  date
}) => {
  return (
    <div className={styles.messageListDayDivider}>
      <div className={styles.line}></div>
      <div className={styles.day}>{date.toLocaleDateString()}</div>
    </div>
  )
}

export default MessageListDayDivider
