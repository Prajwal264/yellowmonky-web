import React, { useContext, useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useFetchAllChannelMessagesLazyQuery, useNewChannelMessageSubscription } from '../../../../apollo/generated/graphql';
import { AppContext } from '../../../../context/AppContextProvider';
import { channelMessagesAtom } from '../../../../state/atoms/channel-messages.atom';
import { channelMessageTreeSelector } from '../../../../state/selectors/channel-message-tree.selector';
import MessageListDayDivider from './message-list-day-divider/message-list-day-divider.component';
import styles from './message-list.module.scss';
import cookie from 'react-cookies';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Skeleton } from 'antd';
import { channelInfoAtom } from '../../../../state/atoms/channel-info.atom';
import MessagePaneJumbotron from '../message-pane-jumbotron/message-pane-jumbotron.component';
import { BsLightbulb } from 'react-icons/bs';
import Message from './message/message.component';
import messageNotification from '../../../../assets/audio/message-notification.mp3';
import { useSound } from 'use-sound';

interface Props {

}

const MessageList: React.FC<Props> = ({ }) => {
  const { channelId } = useContext(AppContext);
  const setChannelMesssages = useSetRecoilState(channelMessagesAtom);
  const allChannelMessages = useRecoilValue(channelMessageTreeSelector);
  const channelInfo = useRecoilValue(channelInfoAtom);
  const [fetchChannelMessages, { data: messages }] = useFetchAllChannelMessagesLazyQuery();
  const [notificationSound] = useSound(messageNotification);
  const { data: newChannelMessageData } = useNewChannelMessageSubscription({
    variables: {
      channelId: channelId!
    }
  })
  useEffect(() => {
    if (channelId) {
      setChannelMesssages([]);
      fetchChannelMessages({
        variables: {
          channelId,
          limit: 25,
        }
      })
    }
  }, [channelId])

  useEffect(() => {
    if (newChannelMessageData?.newChannelMessage) {
      if (newChannelMessageData.newChannelMessage.creatorId !== cookie.load('memberId')) {
        setChannelMesssages((prevState) => ([...prevState, newChannelMessageData.newChannelMessage as any]))
        const scrollableBodyRef = document.querySelector('.message:first-of-type');
        notificationSound();
        if (scrollableBodyRef) {
          scrollableBodyRef.scrollIntoView();
        }
      }
    }
  }, [newChannelMessageData])


  useEffect(() => {
    if (messages) {
      const oldMessages = [...messages.allChannelMessages];
      oldMessages.reverse();
      setChannelMesssages((prevState) => ([...oldMessages, ...prevState]));
      const scrollableBodyRef = document.getElementById('#scrollableDiv');
      if (scrollableBodyRef) {
        const ele = scrollableBodyRef;
        ele.scrollTop = 370; // TODO:  this needs to be a dynamic value
      }
    }
  }, [messages]);

  const loadMessages = () => {
    if (channelId) {
      const cursor = allChannelMessages[allChannelMessages.length - 1].id;
      fetchChannelMessages({
        variables: {
          channelId,
          limit: 10,
          cursor,
        }
      })
    }
  }
  return (

    <div className={styles.messageList}>
      <InfiniteScroll
        dataLength={allChannelMessages.length}
        next={loadMessages}
        hasMore={!!messages?.allChannelMessages?.length!}
        loader={<Skeleton
          avatar={{
            shape: 'square'
          }}
          paragraph={{ rows: 1 }}
          active
        />}
        scrollableTarget="scrollableDiv"
        inverse={true}
        endMessage={<MessagePaneJumbotron
          title={<div>This is the very beginning of the <span>#{channelInfo?.name}</span> channel</div>}
          description={<div>{channelInfo?.description || 'This channel is for working on a project. Hold meetings, share docs, and make decisions together with your team.'} <span>Edit description</span></div>}
          icon={<BsLightbulb />}
        />}
      >
        {[...allChannelMessages].reverse().map((message) => (
          <React.Fragment key={message.id}>
            <Message data={message} />
            {message.showDivider && <MessageListDayDivider date={message.createdAt} />}
          </React.Fragment>
        ))}
      </InfiniteScroll>
    </div>
  )
}

export default MessageList
