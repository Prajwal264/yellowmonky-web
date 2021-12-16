import React from 'react';
import styles from '../../styles/pages/signup.module.scss';
import Header from '../../components/shared/header/header.component';
import SignupForm from '../../components/signup/signup-form.component';

interface Props {

}

const SignupPage: React.FC<Props> = () => {
  return (
    <div className={styles.signupPage}>
      <Header />
      <SignupForm />
    </div>
  )
}

export default SignupPage;