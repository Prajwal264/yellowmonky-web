import React from 'react'
import Avatar from 'react-avatar';
import Header from '../../components/shared/header/header.component';
import styles from '../../styles/pages/team-list.module.scss';

interface Props {

}

const TeamsPage: React.FC<Props> = ({

}) => {
  return (
    <div className={styles.teamListPage}>
      <Header />
      <h4 className={styles.heading}>
        Teams you belong to.
      </h4>
      <div className={styles.cardList}>
        <div className={styles.card}>
          <Avatar name='team' />
          <div className={styles.content}>
            <p className={styles.name}>
              #&nbsp;team name
            </p>
            <div className={styles.details}>
              <span>
                2 members
              </span>
              &nbsp;&nbsp;·&nbsp;&nbsp;
              <span>
                This channel is for working on a project. Hold meetings, share docs, and make decisions together with your team.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TeamsPage
