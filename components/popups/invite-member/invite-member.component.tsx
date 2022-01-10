import React, { useContext, useEffect, useState } from 'react'
import { ReactMultiEmail } from 'react-multi-email'
import isValidEmail from '../../../services/auth.service'
import { PopupType } from '../../../state/atoms/popup.atom'
import ModalWrapper from '../modal-wrapper/modal-wrapper.component'
import 'react-multi-email/style.css';
import styles from './invite-member.module.scss';
import { useInviteMembersMutation } from '../../../apollo/generated/graphql'
import { AppContext } from '../../../context/AppContextProvider'
import cookie from 'react-cookies';
import toast from 'react-hot-toast'

interface Props {

}

const InviteMemberPopup: React.FC<Props> = ({ }) => {
  const [emails, setEmails] = useState<string[]>([]);
  const { teamId } = useContext(AppContext);
  const [inviteMembers] = useInviteMembersMutation();

  useEffect(() => {
    return () => {
      onClose()
    }
  }, [])

  const onClose = () => {
    setEmails([]);
  }

  const sendInvites = async () => {
    if (emails.length) {
      try {
        const inviteMembersPromise = inviteMembers({
          variables: {
            teamId: teamId!,
            inviteeEmails: emails,
            inviterId: cookie.load('userId')
          }
        });
        toast.promise(inviteMembersPromise, {
          loading: "Inviting members",
          success: "Invites sent",
          error: "Something went wrong"
        })
        await inviteMembersPromise;
        onClose();
      } catch (e: any) {
        toast.error(e.message)
      }
    }
  }

  return (
    <ModalWrapper
      popupType={PopupType.ADD_MEMBER}
      title={"Invite people to ExcitedChips"}
      disabled={!!(!emails.length)}
      onOk={sendInvites}
      onCancel={onClose}
    >
      <label>To:</label>
      <ReactMultiEmail
        placeholder="placeholder"
        emails={emails}
        className={styles.reactEmailMultiSelect}
        onChange={(_emails: string[]) => {
          setEmails(_emails);
        }}
        validateEmail={(email: string) => {
          return isValidEmail(email); // return boolean
        }}
        getLabel={(
          email: string,
          index: number,
          removeEmail: (index: number) => void,
        ) => {
          return (
            <div data-tag key={index}>
              {email}
              <span data-tag-handle onClick={() => removeEmail(index)}>
                ×
              </span>
            </div>
          );
        }}
      />
    </ModalWrapper>
  )
}

export default InviteMemberPopup
