import dayjs from 'dayjs';
import React, { useMemo } from 'react';
import styles from './message-list-day-divider.module.scss';

interface Props {
  date: Date
}

const MessageListDayDivider: React.FC<Props> = ({
  date
}) => {
  const dateToShow: string = useMemo(() => {
    const isToday = dayjs(date).isSame(dayjs(), 'day');
    if (isToday) return 'Today';
    const isYesterday = dayjs(date).isSame(dayjs().subtract(1, 'day'), 'day')
    if (isYesterday) return 'Yesterday';
    return dayjs(date).format('MMMM D, YYYY');
  }, [date])
  return (
    <div className={styles.messageListDayDivider}>
      <div className={styles.line}></div>
      <div className={styles.day}>{dateToShow}</div>
    </div>
  )
}

export default MessageListDayDivider
