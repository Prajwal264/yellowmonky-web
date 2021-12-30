import React from 'react';
import styles from "./app-layout.module.scss";
import Header from './header/header.component';

interface Props {

}

const AppLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className={styles.appLayout}>
      {/* header */}
      <Header />
      <main>
        {/* sidebar */}
        {children}
      </main>
    </div>
  )
}

export default AppLayout
