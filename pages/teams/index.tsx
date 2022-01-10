import Link from 'next/link';
import React, { useEffect } from 'react'
import Avatar from 'react-avatar';
import cookie from 'react-cookies';
import toast from 'react-hot-toast';
import { useFetchAllTeamsForUserLazyQuery } from '../../apollo/generated/graphql';
import Header from '../../components/shared/header/header.component';
import styles from '../../styles/pages/team-list.module.scss';

interface Props {

}

const TeamsPage: React.FC<Props> = ({

}) => {
  const [allTeamForUser, { data, error }] = useFetchAllTeamsForUserLazyQuery();
  useEffect(() => {
    loadDependencies();
  }, [])

  const loadDependencies = () => {
    const userId = cookie.load('userId');
    allTeamForUser({
      variables: {
        userId,
      }
    })
  }

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error])
  return (
    <div className={styles.teamListPage}>
      <Header />
      <h4 className={styles.heading}>
        Teams you belong to.
      </h4>
      <div className={styles.cardList}>
        {data?.allTeams?.length && data?.allTeams.map((team) => (
          <Link href={{
            pathname: '/app/client/[teamId]/',
            query: {
              teamId: team.id,
            }
          }}>
            <div className={styles.card}>
              <Avatar name={team.name!} />
              <div className={styles.content}>
                <p className={styles.name}>
                  #&nbsp;{team.name}
                </p>
                <div className={styles.details}>
                  <span>
                    {team.memberCount} members
                  </span>
                  &nbsp;&nbsp;·&nbsp;&nbsp;
                  <span>
                    {team.description}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default TeamsPage
