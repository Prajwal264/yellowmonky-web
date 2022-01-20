import React, { useContext, useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useFetchAllChannelMessagesLazyQuery, useFetchAllDirectMessagesLazyQuery, useNewChannelMessageSubscription, useNewDirectMessageSubscription } from '../../../../apollo/generated/graphql';
import { AppContext, RecipientType } from '../../../../context/AppContextProvider';
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
import { directMessagesAtom } from '../../../../state/atoms/direct-messages.atom';
import { directMessageTreeSelector } from '../../../../state/selectors/direct-message-tree.selector';
import { memberInfoAtom } from '../../../../state/atoms/member-info';

interface Props {

}

const MessageList: React.FC<Props> = ({ }) => {
  const { recipientId, recipientType } = useContext(AppContext);
  const setChannelMesssages = useSetRecoilState(channelMessagesAtom);
  const setDirectMessages = useSetRecoilState(directMessagesAtom);
  const allChannelMessages = useRecoilValue(channelMessageTreeSelector);
  const allDirectMessages = useRecoilValue(directMessageTreeSelector);
  const channelInfo = useRecoilValue(channelInfoAtom);
  const memberInfo = useRecoilValue(memberInfoAtom);
  const [fetchChannelMessages, { data: channelMessages }] = useFetchAllChannelMessagesLazyQuery();
  const [fetchDirectMessages, { data: directMessages }] = useFetchAllDirectMessagesLazyQuery();
  const [notificationSound] = useSound(messageNotification);
  const { data: newChannelMessageData } = useNewChannelMessageSubscription({
    skip: recipientType !== RecipientType.CHANNEL,
    variables: {
      channelId: recipientId!
    }
  })
  const { data: newDirectMessageData } = useNewDirectMessageSubscription({
    skip: recipientType !== RecipientType.DIRECT_MESSAGE,
    variables: {
      recipientId: cookie.load('memberId'),
      creatorId: recipientId!,
    }
  })
  useEffect(() => {
    if (recipientId) {
      if (recipientType === RecipientType.CHANNEL) {
        fetchChannelMessages({
          variables: {
            channelId: recipientId,
            limit: 25,
          }
        })
      } else {
        fetchDirectMessages({
          variables: {
            creatorId: cookie.load('memberId'),
            recipientId,
            limit: 25,
          }
        })
      }
    }
  }, [recipientId, recipientType])

  useEffect(() => {
    if (recipientType === RecipientType.CHANNEL) {
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
    }
  }, [newChannelMessageData, recipientType]);

  useEffect(() => {
    if (recipientType === RecipientType.DIRECT_MESSAGE) {
      if (newDirectMessageData?.newDirectMessage) {
        if (newDirectMessageData.newDirectMessage.creatorId !== cookie.load('memberId')) {
          setDirectMessages((prevState) => ([...prevState, newDirectMessageData.newDirectMessage as any]))
          const scrollableBodyRef = document.querySelector('.message:first-of-type');
          notificationSound();
          if (scrollableBodyRef) {
            scrollableBodyRef.scrollIntoView();
          }
        }
      }
    }
  }, [newDirectMessageData, recipientType]);



  useEffect(() => {
    if (recipientType === RecipientType.CHANNEL) {
      setChannelMesssages([]);
      if (channelMessages) {
        const oldMessages = [...channelMessages.allChannelMessages];
        oldMessages.reverse();
        setChannelMesssages((prevState) => ([...oldMessages, ...prevState]));
        const scrollableBodyRef = document.getElementById('#scrollableDiv');
        if (scrollableBodyRef) {
          const ele = scrollableBodyRef;
          ele.scrollTop = 370; // TODO:  this needs to be a dynamic value
        }
      }
    }
  }, [channelMessages, recipientType]);

  useEffect(() => {
    if (recipientType === RecipientType.DIRECT_MESSAGE) {
      setDirectMessages([])
      if (directMessages) {
        const oldMessages = [...directMessages.allDirectMessagesByRecipientId];
        oldMessages.reverse();
        setDirectMessages((prevState) => ([...oldMessages, ...prevState]));
        const scrollableBodyRef = document.getElementById('#scrollableDiv');
        if (scrollableBodyRef) {
          const ele = scrollableBodyRef;
          ele.scrollTop = 370; // TODO:  this needs to be a dynamic value
        }
      }
    }
  }, [directMessages, recipientType]);

  const loadMessages = () => {
    if (recipientId) {
      if (recipientType === RecipientType.CHANNEL) {
        const cursor = allChannelMessages[allChannelMessages.length - 1].id;
        fetchChannelMessages({
          variables: {
            channelId: recipientId,
            limit: 10,
            cursor,
          }
        })
      } else {
        const cursor = allDirectMessages[allDirectMessages.length - 1].id;
        fetchDirectMessages({
          variables: {
            creatorId: cookie.load('memberId'),
            recipientId,
            limit: 10,
            cursor,
          }
        })
      }
    }
  }
  return (

    <div className={styles.messageList}>
      <InfiniteScroll
        dataLength={recipientType === RecipientType.CHANNEL ? allChannelMessages.length : allDirectMessages.length}
        next={loadMessages}
        hasMore={recipientType === RecipientType.CHANNEL ? !!channelMessages?.allChannelMessages?.length! : !!directMessages?.allDirectMessagesByRecipientId?.length!}
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
          title={
            recipientType === RecipientType.CHANNEL ?
              <div>This is the very beginning of the <span>#{channelInfo?.name}</span> channel</div> :
              <div>This conversation is just between the two of you</div>
          }
          description={
            recipientType === RecipientType.CHANNEL ?
              <div>{channelInfo?.description || 'This channel is for working on a project. Hold meetings, share docs, and make decisions together with your team.'} <span>Edit description</span></div> :
              <div>Here you can send messages and share files with <span>{memberInfo?.user.username}</span></div>
          }
          icon={<BsLightbulb />}
        />}
      >
        {recipientType === RecipientType.CHANNEL ?
          [...allChannelMessages].reverse().map((message) => (
            <React.Fragment key={message.id}>
              <Message data={message} />
              {message.showDivider && <MessageListDayDivider date={message.createdAt} />}
            </React.Fragment>
          )) :
          [...allDirectMessages].reverse().map((message) => (
            <React.Fragment key={message.id}>
              <Message data={message} />
              {message.showDivider && <MessageListDayDivider date={message.createdAt} />}
            </React.Fragment>
          ))
        }
      </InfiniteScroll>
    </div>
  )
}

export default MessageList
