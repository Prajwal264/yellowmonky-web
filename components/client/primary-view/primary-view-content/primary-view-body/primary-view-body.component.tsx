import React from 'react';
import MessagePane from '../../../message-pane/message-pane.component';
import styles from './primary-view-body.module.scss';

interface Props {

}

const PrimaryViewBody: React.FC<Props> = ({

}) => {
  return (
    <div className={styles.primaryViewBody}>
      <div className={styles.virtualList} id="scrollableDiv">
        <MessagePane />
      </div>
    </div>
  )
}

export default PrimaryViewBody
