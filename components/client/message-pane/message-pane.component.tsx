import React from 'react';
import MessagePaneJumbotron from './message-pane-jumbotron/message-pane-jumbotron.component';
import styles from './message-pane.module.scss';
import { BsLightbulb } from 'react-icons/bs';
import MessageList from './messge-list/message-list.component';
import { channelInfoAtom } from '../../../state/atoms/channel-info.atom';
import { useRecoilValue } from 'recoil';

interface Props {

}

const MessagePane: React.FC<Props> = ({ }) => {
  const channelInfo = useRecoilValue(channelInfoAtom);
  return (
    <div className={styles.messagePane}>
      <MessagePaneJumbotron
        title={<div>This is the very beginning of the <span>#{channelInfo?.name}</span> channel</div>}
        description={<div>{channelInfo?.description || 'This channel is for working on a project. Hold meetings, share docs, and make decisions together with your team.'} <span>Edit description</span></div>}
        icon={<BsLightbulb />}
      />
      <MessageList />
    </div>
  )
}

export default MessagePane
