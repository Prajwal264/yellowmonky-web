import React, { useEffect, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import { channelMessagesAtom } from '../../../../../state/atoms/channel-messages.atom';
import MessagePane from '../../../message-pane/message-pane.component';
import styles from './primary-view-body.module.scss';

interface Props {

}

const PrimaryViewBody: React.FC<Props> = ({

}) => {
  const scrollableBodyRef = useRef(null);
  const messages = useRecoilValue(channelMessagesAtom);
  useEffect(() => {
    if (scrollableBodyRef.current) {
      const ele = scrollableBodyRef.current as any;
      ele.scrollTop = ele.scrollHeight;
    }
  }, [messages])
  return (
    <div className={styles.primaryViewBody}>
      <div className={styles.virtualList} ref={scrollableBodyRef}>
        <MessagePane />
      </div>
    </div>
  )
}

export default PrimaryViewBody
