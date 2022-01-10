import React, { useMemo, useState } from 'react';
import styles from '../../styles/pages/signup.module.scss';
import Header from '../../components/shared/header/header.component';
import FormHolder, { FormField } from '../../components/signup/form-holder.component';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import { useCreateMemberAndAddToTeamMutation } from '../../apollo/generated/graphql';
import { decodeJwt } from '../../helpers/authentication.helper';
import cookie from 'react-cookies';

interface Props {

}

/**
 *
 *
 * @return {*} 
 */
const JoinTeamPage: React.FC<Props> = () => {
  const router = useRouter();

  const [registerMember] = useCreateMemberAndAddToTeamMutation();
  const [loading, setLoading] = useState(false);

  const fields = useMemo(() => {
    const allFormFields: FormField[] = [{
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
    if (router.query.teamId) {
      if (router.query.joinId) {
        return allFormFields.filter((field) => field.name !== 'email')
      }
    }
    return allFormFields
  }, [router])

  /**
   *
   *
   * @param {Record<string, string>} formData
   */
  const joinTeam = async (formData: Record<string, string>) => {
    setLoading(true);
    try {
      let email;
      if (router.query.joinId) {
        email = decodeJwt(router.query.joinId as string).emailId;
      } else {
        email = formData.email;
      }
      const registerMemberPromise = registerMember({
        variables: {
          email,
          password: formData.password,
          username: formData.username,
          teamId: decodeURI(router.query.teamId as string),
        }
      });
      toast.promise(registerMemberPromise, {
        loading: 'Registering User',
        success: 'Registeration Successfull',
        error: 'Something went wrong',
      }, {
        position: 'top-center'
      })
      const response = await registerMemberPromise;
      cookie.remove('userId');
      cookie.save('userId', response.data?.createUserAndAddToTeam.id!, {});
      const teamId = response.data?.createUserAndAddToTeam.teamId;
      const channelId = response.data?.createUserAndAddToTeam.channelId;
      router.push({
        pathname: '/app/client/[teamId]/channels/[channelId]',
        query: {
          teamId,
          channelId
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
      <FormHolder
        content={{
          title: 'Create an Account',
          subtitle: 'We suggest using the email address you use at work.'
        }}
        fields={fields}
        onSubmit={joinTeam}
        loading={loading}
      />
    </div>
  )
}

export default JoinTeamPage;