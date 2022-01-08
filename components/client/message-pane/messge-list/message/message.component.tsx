import dayjs from 'dayjs';
import React from 'react'
import { MessageWithCreator } from '../../../../../state/selectors/channel-message-tree.selector';
import styles from './message.module.scss';
interface Props {
  data: MessageWithCreator
}

const Message: React.FC<Props> = ({
  data,
}) => {
  debugger;
  return (
    <div className={styles.message}>
      <div className={styles.gutter}>
        <div className={styles.profileImage}>
          {data.showOwner ? <button>
            <img src={"https://pigeonweek.com/wp-content/uploads/2021/12/Luffy-dde7e488.jpg"} alt={data.creator?.username} />
          </button> : <p className={styles.dateHover}>{dayjs(data.createdAt).format('h:mm a')}</p>}
        </div>
        <div className={styles.messageContentPane}>
          {data.showOwner && <div className={styles.messageOwner}>
            <span>{data.creator?.username}</span>
            <span>{dayjs(data.createdAt).format('h:mm a')}</span>
          </div>}
          <div className={styles.richTextMessageBlocks}>
            <div className={styles.block}>
              <div className={styles.content}>
                {data.content}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Message
