import React, { useContext, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { MessageSourceType, useCreateMessageMutation } from '../../../../apollo/generated/graphql';
import { channelInfoAtom } from '../../../../state/atoms/channel-info.atom';
import styles from './message-input-main.module.scss';
import cookie from 'react-cookies';
import MessageSendButton from './message-send-button/message-send-button.component';
import { AppContext } from '../../../../context/AppContextProvider';
import toast from 'react-hot-toast';

interface Props {

}

const MessageInputMain: React.FC<Props> = ({ }) => {
  const channelInfo = useRecoilValue(channelInfoAtom);
  const { channelId } = useContext(AppContext);
  const [message, setMessage] = useState('');
  const [createMessage] = useCreateMessageMutation();

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
    if (message) {
      try {
        await createMessage({
          variables: {
            content: message,
            creatorId: cookie.load('userId'), // TODO: this should be passed from jwt
            sourceChannelId: channelId!,
            sourceType: MessageSourceType.Channel
          }
        })
        setMessage('');
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
                placeholder={`Send message to #${channelInfo?.name}`}
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
