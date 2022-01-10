import React, { useState } from 'react';
import styles from '../../styles/pages/signup.module.scss';
import Header from '../../components/shared/header/header.component';
import FormHolder, { FormField } from '../../components/signup/form-holder.component';
import { useRouter } from 'next/router';
import { useLoginMutation } from '../../apollo/generated/graphql';
import toast from 'react-hot-toast';
import cookie from 'react-cookies';

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
  name: 'password',
  label: "Password",
  type: "password",
  inputAttributes: {
    placeholder: "********"
  }
}]

/**
 *
 *
 * @return {*} 
 */
const SigninPage: React.FC<Props> = () => {
  const router = useRouter();
  const [login] = useLoginMutation()
  const [loading, setLoading] = useState(false);

  /**
   *
   *
   * @param {Record<string, string>} formData
   */
  const signin = async (formData: Record<string, string>) => {
    setLoading(true);
    try {
      const loginPromise = login({
        variables: {
          email: formData.email,
          password: formData.password,
        }
      })
      toast.promise(loginPromise, {
        loading: 'Logging In',
        success: 'Login Successfull',
        error: 'Something went wrong',
      }, {
        position: 'top-center'
      })
      const response = await loginPromise;
      cookie.remove('userId');
      cookie.save('userId', response.data?.login.id!, {});
      router.push({
        pathname: '/teams/',
      })
    } catch (err: any) {
      setLoading(false);
      toast.error(err.message)
    }
  }

  return (
    <div className={styles.signupPage}>
      <Header />
      <FormHolder
        content={{
          title: 'Sign in to YellowMonky',
          subtitle: 'We suggest using the email address you use at work.',
        }}
        fields={fields}
        onSubmit={signin}
        loading={loading}
      />
    </div>
  )
}

export default SigninPage;