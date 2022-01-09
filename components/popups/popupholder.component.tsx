import React from 'react'
import InviteMemberPopup from './invite-member/invite-member.component'

interface Props {

}

const PopupHolder: React.FC<Props> = ({ }) => {
  return (
    <React.Fragment>
      <InviteMemberPopup />
    </React.Fragment>
  )
}

export default PopupHolder
