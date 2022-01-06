import React from 'react';
import { IconType } from 'react-icons';
import styles from './message-pane-jumbotron.module.scss';

interface Props {
  title: string | React.ReactNode,
  description: string | React.ReactNode,
  icon: React.ReactNode | IconType,
}

const MessagePaneJumbotron: React.FC<Props> = ({
  title,
  description,
  icon
}) => {
  return (
    <div className={styles.messagePaneJumbotron}>
      <div className={styles.iconPane}>
        {icon}
      </div>
      <div className={styles.contentPane}>
        <div className={styles.title}>{title}</div>
        <div className={styles.description}>{description}</div>
      </div>
    </div>
  )
}

export default MessagePaneJumbotron
