import React from 'react';
import BookmarkContainer from '../../../../components/client/bookmark-container/bookmark-container.component';
import PrimaryViewHeader from '../../../../components/client/primary-view-header/primary-view-header.component';
import PrimaryView from '../../../../components/client/primary-view/primary-view.component';

interface Props {

}

const ChannelIdPage: React.FC<Props> = ({

}) => {
  return (
    <React.Fragment>
      <PrimaryViewHeader />
      <BookmarkContainer />
      <PrimaryView />
    </React.Fragment>
  )
}

export default ChannelIdPage
