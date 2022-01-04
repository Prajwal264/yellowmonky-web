import { GetServerSidePropsContext, PreviewData } from 'next';
import { NextParsedUrlQuery } from 'next/dist/server/request-meta';
import React, { useContext, useEffect } from 'react';
import BookmarkContainer from '../../../../../components/client/bookmark-container/bookmark-container.component';
import PrimaryViewHeader from '../../../../../components/client/primary-view-header/primary-view-header.component';
import PrimaryView from '../../../../../components/client/primary-view/primary-view.component';
import { AppContext } from '../../../../../context/AppContextProvider';

interface Props {
  data: {
    teamId: string;
    channelId: string;
  }
}

const ChannelIdPage: React.FC<Props> = ({
  data: {
    teamId,
    channelId,
  }
}) => {
  const { setTeamId, setChannelId } = useContext(AppContext)
  useEffect(() => {
    setTeamId(teamId);
    setChannelId(channelId);
  }, [channelId])
  return (
    <React.Fragment>
      <PrimaryViewHeader />
      <BookmarkContainer />
      <PrimaryView />
    </React.Fragment>
  )
}

export const getServerSideProps = (context: GetServerSidePropsContext<NextParsedUrlQuery, PreviewData>) => {
  return {
    props: {
      data: {
        teamId: context.query.teamId,
        channelId: context.query.channelId,
      }
    }
  }
}
export default ChannelIdPage
