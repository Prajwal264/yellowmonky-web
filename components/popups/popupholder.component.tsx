import React from 'react'
import CreateChannelPopup from './create-channel/create-channel.component'
import EditChannelPopup from './edit-channel/edit-channel.component'
import InviteMemberPopup from './invite-member/invite-member.component'

interface Props {

}

const PopupHolder: React.FC<Props> = ({ }) => {
  return (
    <React.Fragment>
      <InviteMemberPopup />
      <CreateChannelPopup />
      <EditChannelPopup />
    </React.Fragment>
  )
}

export default PopupHolder
