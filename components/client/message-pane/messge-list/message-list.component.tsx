import dayjs from 'dayjs';
import React, { useContext, useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useFetchAllChannelMessagesLazyQuery } from '../../../../apollo/generated/graphql';
import { AppContext } from '../../../../context/AppContextProvider';
import { channelMessagesAtom } from '../../../../state/atoms/channel-messages.atom';
import { channelMessageTreeSelector } from '../../../../state/selectors/channel-message-tree.selector';
import MessageListDayDivider from './message-list-day-divider/message-list-day-divider.component';
import styles from './message-list.module.scss';
import Message from './message/message.component';

interface Props {

}

const MessageList: React.FC<Props> = ({ }) => {
  const { channelId } = useContext(AppContext);
  const setChannelMesssages = useSetRecoilState(channelMessagesAtom);
  const allChannelMessages = useRecoilValue(channelMessageTreeSelector);
  const [fetchChannelMessages, { data: messsages }] = useFetchAllChannelMessagesLazyQuery();
  useEffect(() => {
    if (channelId) {
      fetchChannelMessages({
        variables: {
          channelId
        }
      })
    }
  }, [channelId])

  useEffect(() => {
    if (messsages) {
      console.log(messsages.allChannelMessages);
      setChannelMesssages(messsages.allChannelMessages)
    }
  }, [messsages])
  return (
    <div className={styles.messageList}>
      {[...allChannelMessages.values()].map((message) => (
        <React.Fragment>
          {message.showDivider && <MessageListDayDivider date={message.createdAt} />}
          <Message key={message.id} data={message} />
        </React.Fragment>
      ))}
    </div>
  )
}

export default MessageList
