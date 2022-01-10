import { GetServerSidePropsContext, PreviewData } from 'next'
import { NextParsedUrlQuery } from 'next/dist/server/request-meta';
import { useRouter } from 'next/router';

import React, { useEffect } from 'react'
import toast from 'react-hot-toast';
import { useFetchAllChannelsLazyQuery } from '../../../../apollo/generated/graphql';
interface Props {
  data: {
    teamId: string,
  }
}

const TeamIdPage: React.FC<Props> = ({
  data: {
    teamId
  }
}) => {
  const [fetchAllChannels] = useFetchAllChannelsLazyQuery();
  const router = useRouter();

  useEffect(() => {
    loadDependencies();
  }, [])

  const loadDependencies = async () => {
    try {
      const fetchAllChannelsPromise = fetchAllChannels({
        variables: {
          teamId,
        }
      });
      toast.promise(fetchAllChannelsPromise, {
        loading: "Fetching all channels",
        error: "Something went wrong",
        success: "Redirecting..."
      });
      const { data: response } = await fetchAllChannelsPromise;
      if (response?.allChannels.length) {
        const channelId = response?.allChannels[0]?.id;
        router.push({
          pathname: "/app/client/[teamId]/channels/[channelId]",
          query: {
            teamId,
            channelId,
          }
        })
      }
    } catch (e: any) {
      toast.error(e.message)
    }
  }
  return (
    <div>
    </div>
  )
}

export default TeamIdPage


export const getServerSideProps = async (context: GetServerSidePropsContext<NextParsedUrlQuery, PreviewData>) => {
  return {
    props: {
      data: {
        teamId: context.query.teamId,
      }
    }
  }
}