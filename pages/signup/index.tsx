import React from 'react';
import styles from '../../styles/pages/signup.module.scss';
import Header from '../../components/shared/header/header.component';
import SignupForm, { FormField } from '../../components/signup/signup-form.component';

interface Props {

}

const fields: FormField[] = [{
  name: 'email',
  label: "Email",
  type: "email",
  inputAttributes: {
    placeholder: "name@work-email.com"
  }
}, {
  name: 'username',
  label: "Username",
  type: "text",
  inputAttributes: {
    placeholder: "John Smith"
  }
}, {
  name: 'password',
  label: "Password",
  type: "password",
  inputAttributes: {
    placeholder: "********"
  }
}, {
  name: "confirmPassword",
  label: "Confirm Password",
  type: "password",
  inputAttributes: {
    placeholder: "********"
  },
  customValidation: {
    errorMessage: 'Passwords dont match',
    validationFn: (data) => {
      return data.confirmPassword === data.password;
    },
  }
}]

/**
 *
 *
 * @return {*} 
 */
const SignupPage: React.FC<Props> = () => {
  return (
    <div className={styles.signupPage}>
      <Header />
      <SignupForm fields={fields} />
    </div>
  )
}

export default SignupPage;