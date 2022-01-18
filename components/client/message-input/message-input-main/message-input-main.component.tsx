import React, { useContext, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { MessageSourceType, useCreateChannelMessageMutation } from '../../../../apollo/generated/graphql';
import { channelInfoAtom } from '../../../../state/atoms/channel-info.atom';
import styles from './message-input-main.module.scss';
import cookie from 'react-cookies';
import MessageSendButton from './message-send-button/message-send-button.component';
import { AppContext, RecipientType } from '../../../../context/AppContextProvider';
import toast from 'react-hot-toast';
import { channelMessagesAtom } from '../../../../state/atoms/channel-messages.atom';
import { memberInfoAtom } from '../../../../state/atoms/member-info';

interface Props {

}

const MessageInputMain: React.FC<Props> = ({ }) => {
  const channelInfo = useRecoilValue(channelInfoAtom);
  const memberInfo = useRecoilValue(memberInfoAtom);
  const { recipientId, recipientType } = useContext(AppContext);
  const [message, setMessage] = useState('');
  const [createChannelMessage] = useCreateChannelMessageMutation();
  const setChannelMesssages = useSetRecoilState(channelMessagesAtom);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const content = e.target.value;
    setMessage(content)
  }

  const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.keyCode === 13) {
      sendMessage()
    }
  }

  const sendMessage = async () => {
    const content = message;
    if (message) {
      try {
        setMessage('');
        const creatorId = cookie.load('memberId');
        const { data } = await createChannelMessage({
          variables: {
            content: message,
            creatorId,
            sourceChannelId: recipientId!,
            sourceType: MessageSourceType.Channel
          }
        });
        setChannelMesssages((prevState) => ([...prevState, {
          id: data?.createChannelMessage,
          content,
          createdAt: new Date(),
          creatorId: creatorId,
        } as any]))
        const scrollableBodyRef = document.querySelector('.message:first-of-type');
        if (scrollableBodyRef) {
          scrollableBodyRef.scrollIntoView();
        }
      } catch (e) {
        toast.error('Failed to send message.')
      }
    }
  }

  return (
    <div className={styles.messageInputMain}>
      <div className={styles.inputContainer}>
        <div className={styles.basicContainer}>
          {/* <div className="toolbar"></div> TODO*/}
          <div className={styles.containerMultilineInput}>
            <div className={styles.messageInputMessagePane}>
              <input
                value={message}
                className={styles.editor}
                placeholder={`Send message to ${recipientType === RecipientType.CHANNEL ? ('#' + channelInfo?.name) : memberInfo?.user?.username}`}
                onChange={handleChange}
                onKeyDown={onKeyDown} />
              <MessageSendButton onClick={sendMessage} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MessageInputMain
