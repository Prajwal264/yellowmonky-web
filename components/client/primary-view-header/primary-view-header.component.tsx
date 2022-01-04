import React, { useContext, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useFetchChannelLazyQuery } from '../../../apollo/generated/graphql';
import { AppContext } from '../../../context/AppContextProvider';
import styles from './primary-view-header.module.scss';

interface Props {

}

const PrimaryViewHeader: React.FC<Props> = ({

}) => {
  const { channelId } = useContext(AppContext);
  const [fetchChannel, { data: channelInfo, error }] = useFetchChannelLazyQuery();
  useEffect(() => {
    if (channelId) {
      loadDependencies();
    }
  }, [channelId])

  const loadDependencies = async () => {
    fetchChannel({
      variables: {
        channelId: channelId!,
      }
    }).catch((err) => {
      console.log(err)
    })
  }

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error])

  return (
    <div className={styles.primaryViewHeader}>
      <div className={styles.text}>
        <div className={styles.coachmarkAnchor}>
          <button className={styles.channelButton}>
            <div className={styles.headerTitle}>
              <span>#&nbsp;</span>
              <span>{channelInfo?.channel?.name}</span>
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
