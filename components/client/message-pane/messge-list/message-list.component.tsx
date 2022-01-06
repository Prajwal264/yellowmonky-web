import React from 'react';
import MessageListDayDivider from './message-list-day-divider/message-list-day-divider.component';
import styles from './message-list.module.scss';
import Message from './message/message.component';

interface Props {

}

const MessageList: React.FC<Props> = ({ }) => {
  return (
    <div className={styles.messageList}>
      <MessageListDayDivider date={new Date()} />
      <Message data={{
        ownerName: 'ExcitedHomoChips',
        id: '',
        content: 'Hi!',
        image: "https://pigeonweek.com/wp-content/uploads/2021/12/Luffy-dde7e488.jpg",
        createdAt: new Date()
      }}
        showOwner={true}
      />
      <Message data={{
        ownerName: 'ExcitedHomoChips',
        id: '',
        content: 'Hi!',
        image: "https://pigeonweek.com/wp-content/uploads/2021/12/Luffy-dde7e488.jpg",
        createdAt: new Date()
      }}
        showOwner={false}
      />
      <Message data={{
        ownerName: 'ExcitedHomoChips',
        id: '',
        content: 'Hi!',
        image: "https://pigeonweek.com/wp-content/uploads/2021/12/Luffy-dde7e488.jpg",
        createdAt: new Date()
      }}
        showOwner={true}
      />
    </div>
  )
}

export default MessageList
