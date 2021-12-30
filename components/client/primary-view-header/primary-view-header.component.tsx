import React from 'react';
import styles from './primary-view-header.module.scss';

interface Props {

}

const PrimaryViewHeader: React.FC<Props> = ({

}) => {
  return (
    <div className={styles.primaryViewHeader}>
      <div className={styles.text}>
        <div className={styles.coachmarkAnchor}>
          <button className={styles.channelButton}>
            <div className={styles.headerTitle}>
              <span>#&nbsp;</span>
              <span>general</span>
            </div>
          </button>
        </div>
      </div>
      <div className={styles.actions}>
        <div className={styles.channelUserDetails}>
          <div className={styles.slackAvatars}>
            <div className={styles.avatar}>
              {/* <img src="" alt="" /> */}
            </div>
            <div className={styles.avatar}>
              {/* <img src="" alt="" /> */}
            </div>
            <span className={styles.count}>2</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PrimaryViewHeader
