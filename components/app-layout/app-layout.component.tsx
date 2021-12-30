import React from 'react';
import styles from "./app-layout.module.scss";
import Header from './header/header.component';
import Sidebar from './sidebar/sidebar.component';

interface Props {

}

const AppLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className={styles.appLayout}>
      <Header />
      <main>
        <Sidebar />
        <div className={styles.primaryView}>
          {children}
        </div>
      </main>
    </div>
  )
}

export default AppLayout
