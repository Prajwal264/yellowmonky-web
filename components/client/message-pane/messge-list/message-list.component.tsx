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
        image: "https://lh3.googleusercontent.com/ogw/ADea4I4b968A2QfpQgm3yeG5rsF0uPbC9EDbBJrVj-62kw=s64-c-mo",
        createdAt: new Date()
      }}
        showOwner={true}
      />
      <Message data={{
        ownerName: 'ExcitedHomoChips',
        id: '',
        content: 'Hi!',
        image: "https://lh3.googleusercontent.com/ogw/ADea4I4b968A2QfpQgm3yeG5rsF0uPbC9EDbBJrVj-62kw=s64-c-mo",
        createdAt: new Date()
      }}
        showOwner={false}
      />
    </div>
  )
}

export default MessageList
