import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import styles from './header.module.scss';
import logo from '../../../assets/images/logo.png';

interface Props {

}

const Header: React.FC<Props> = () => {
  return (
    <header className={styles.header}>
      <div className={styles.leftCol}></div>
      <div className={styles.centerCol}>
        <Link href="/">
          <Image src={logo} title="Yellow Monky" />
        </Link>
      </div>
      <div className={styles.rightCol}></div>
    </header>
  )
}

export default Header
