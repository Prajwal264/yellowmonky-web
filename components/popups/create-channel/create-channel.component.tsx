import React, { useContext, useEffect, useState } from 'react'
import { PopupType } from '../../../state/atoms/popup.atom'
import ModalWrapper from '../modal-wrapper/modal-wrapper.component'
import { AppContext } from '../../../context/AppContextProvider';
import styles from './create-channel.module.scss';
import cookie from 'react-cookies';
import toast from 'react-hot-toast'
import FormInput from '../../shared/form-input/form-input.component';
import { useCreateChannelMutation } from '../../../apollo/generated/graphql';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { allChannelsAtom } from '../../../state/atoms/all-channels.atom';

interface Props {

}

const defaultFormData = {
  name: '',
  description: '',
}

const CreateChannelPopup: React.FC<Props> = ({ }) => {
  const [formData, setFormData] = useState(defaultFormData);
  const { teamId } = useContext(AppContext);
  const [createChannel] = useCreateChannelMutation();
  const setChannels = useSetRecoilState(allChannelsAtom);

  useEffect(() => {
    return () => {
      onClose()
    }
  }, [])

  const onClose = () => {
    setFormData(defaultFormData);
  }

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const createNewChannel = async () => {
    if (formData.name) {
      try {
        const createChannelPromise = createChannel({
          variables: {
            name: formData.name,
            description: formData.description,
            adminId: cookie.load('userId'),
            teamId: teamId!,
          }
        });
        toast.promise(createChannelPromise, {
          loading: 'Creating channel',
          error: "Something went wrong",
          success: 'Channel Created'
        })
        const { data: response } = await createChannelPromise;
        if (response?.createChannel) {
          setChannels((prevState) => [...prevState, response.createChannel])
        }
      } catch (e: any) {
        toast.error(e.message);
      }
    }
  };

  return (
    <ModalWrapper
      popupType={PopupType.CREATE_CHANNEL}
      title={"Create a channel"}
      disabled={!!(!formData.name)}
      onOk={createNewChannel}
      onCancel={onClose}
    >
      <div className={styles.createChannelPopup}>
        <div className={styles.formGroup}>
          <p className={styles.popupInfo}>
            Channels are where your team communicates. They’re best when organized around a topic — #marketing, for example.
          </p>
          <label><strong>Name</strong></label>
          <FormInput
            name='name'
            value={formData.name}
            inputAttributes={{
              placeholder: 'e.g.: communication'
            }}
            onChange={handleChange}
          />
          <label><strong>Description</strong> (optional)</label>
          <FormInput
            name='description'
            value={formData.description}
            onChange={handleChange}
          />
        </div>
      </div>
    </ModalWrapper>
  )
}

export default CreateChannelPopup
