import React from 'react';
import MessageInput from '../../../message-input/message-input.component';
import styles from './primary-view-footer.module.scss';
interface Props {

}

const PrimaryViewFooter: React.FC<Props> = ({ }) => {
  return (
    <div className={styles.primaryViewFooter}>
      <MessageInput />
    </div>
  )
}

export default PrimaryViewFooter
