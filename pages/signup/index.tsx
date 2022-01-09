import React, { useState } from 'react';
import styles from '../../styles/pages/signup.module.scss';
import Header from '../../components/shared/header/header.component';
import SignupForm, { FormField } from '../../components/signup/signup-form.component';
import { useRouter } from 'next/router';
import { useRegisterAdminMutation } from '../../apollo/generated/graphql';
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
  const [registerAdmin] = useRegisterAdminMutation()
  const [loading, setLoading] = useState(false);

  /**
   *
   *
   * @param {Record<string, string>} formData
   */
  const signup = async (formData: Record<string, string>) => {
    setLoading(true);
    try {
      const registerPromise = registerAdmin({
        variables: {
          email: formData.email,
          password: formData.password,
          username: formData.username,
        }
      })
      toast.promise(registerPromise, {
        loading: 'Registering User',
        success: 'Registeration Successfull',
        error: 'Something went wrong',
      }, {
        position: 'top-center'
      })
      const response = await registerPromise;
      cookie.remove('userId');
      cookie.save('userId', response.data?.registerAdmin.id!, {});
      const teamId = response.data?.registerAdmin.teamId;
      router.push({
        pathname: '/create-team/[id]',
        query: {
          id: teamId,
        },
      });
    } catch (err: any) {
      setLoading(false);
      toast.error(err.message)
    }
  }

  return (
    <div className={styles.signupPage}>
      <Header />
      <SignupForm fields={fields} onSubmit={signup} loading={loading} />
    </div>
  )
}

export default SignupPage;