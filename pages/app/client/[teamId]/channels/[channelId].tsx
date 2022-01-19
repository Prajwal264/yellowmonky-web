import { GetServerSidePropsContext, PreviewData } from 'next';
import { NextParsedUrlQuery } from 'next/dist/server/request-meta';
import React, { useContext, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useSetRecoilState } from 'recoil';
import { useFetchTeamInfoLazyQuery } from '../../../../../apollo/generated/graphql';
import BookmarkContainer from '../../../../../components/client/bookmark-container/bookmark-container.component';
import PrimaryViewHeader from '../../../../../components/client/primary-view-header/primary-view-header.component';
import PrimaryView from '../../../../../components/client/primary-view/primary-view.component';
import { AppContext, RecipientType } from '../../../../../context/AppContextProvider';
import { teamInfoAtom } from '../../../../../state/atoms/team-info.atom';

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
  const { setTeamId, setRecipientId, setRecipientType } = useContext(AppContext);
  const [fetchTeamInfo] = useFetchTeamInfoLazyQuery();
  const setTeamInfo = useSetRecoilState(teamInfoAtom)
  useEffect(() => {
    setRecipientType(RecipientType.CHANNEL)
    if (teamId && channelId) {
      setTeamId(teamId);
      setRecipientId(channelId);
      loadTeamInfo(teamId);
    }
  }, [channelId])

  const loadTeamInfo = async (teamId: string) => {
    try {
      const { data: teamInfo } = await fetchTeamInfo({
        variables: {
          teamId,
        }
      });
      if (teamInfo?.team) {
        setTeamInfo(teamInfo.team);
      }
    } catch (e) {
      toast.error('Error Fetching Team, Info')
    }
  }
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
