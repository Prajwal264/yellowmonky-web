import dayjs from 'dayjs';
import React from 'react'
import styles from './message.module.scss';
interface Props {
  data: {
    id: string,
    content: string,
    image: string,
    createdAt: Date,
    ownerName: string,
  }
  showOwner: boolean,
}

const Message: React.FC<Props> = ({
  data,
  showOwner = true,
}) => {
  return (
    <div className={styles.message}>
      <div className={styles.gutter}>
        <div className={styles.profileImage}>
          {showOwner ? <button>
            <img src={data.image} alt={data.ownerName} />
          </button> : <p className={styles.dateHover}>{dayjs(data.createdAt).format('h:mm a')}</p>}
        </div>
        <div className={styles.messageContentPane}>
          {showOwner && <div className={styles.messageOwner}>
            <span>{data.ownerName}</span>
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
