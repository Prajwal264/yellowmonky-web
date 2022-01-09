import React from 'react'
import { PopupType } from '../../../state/atoms/popup.atom'
import ModalWrapper from '../modal-wrapper/modal-wrapper.component'

interface Props {

}

const InviteMemberPopup: React.FC<Props> = ({ }) => {
  return (
    <ModalWrapper popupType={PopupType.ADD_MEMBER} title={"Invite people to ExcitedChips"}>
      blah
    </ModalWrapper>
  )
}

export default InviteMemberPopup
