import React from 'react';
import styles from '../../styles/pages/signup.module.scss';
import Header from '../../components/shared/header/header.component';
import SignupForm, { FormField } from '../../components/signup/signup-form.component';
import { useRouter } from 'next/router';

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
  const router = useRouter();

  /**
   *
   *
   * @param {Record<string, string>} formData
   */
  const signup = (formData: Record<string, string>) => {
    router.push({
      pathname: '/create-team/[id]',
      query: {
        id: 1
      }, // TODO: don't hardcode id
    });
  }

  return (
    <div className={styles.signupPage}>
      <Header />
      <SignupForm fields={fields} onSubmit={signup} />
    </div>
  )
}

export default SignupPage;