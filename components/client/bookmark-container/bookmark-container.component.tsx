import React from 'react';
import styles from './bookmark-container.module.scss';

interface Props {

}

const BookmarkContainer: React.FC<Props> = ({

}) => {
  return (
    <div className={styles.bookmarkComponent}>
      <div className={styles.bookmarkBar}>
        <div className={styles.contents}>
          <div className={styles.flexWrapper}>
            <button className={styles.addNew}>
              + Add a bookmark
            </button>
            <div className={styles.contextMenuContainer}>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookmarkContainer
