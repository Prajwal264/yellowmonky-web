import React, { useMemo } from 'react';
import styles from '../../styles/pages/signup.module.scss';
import Header from '../../components/shared/header/header.component';
import SignupForm, { FormField } from '../../components/signup/signup-form.component';
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
    try {
      let email;
      if (router.query.joinId) {
        email = decodeJwt(router.query.joinId as string).emailId;
      } else {
        email = formData.email;
      }
      const response = await registerMember({
        variables: {
          email,
          password: formData.password,
          username: formData.username,
          teamId: decodeURI(router.query.teamId as string),
        }
      })
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
      toast.error(err.message)
    }
  }

  return (
    <div className={styles.signupPage}>
      <Header />
      <SignupForm fields={fields} onSubmit={joinTeam} />
    </div>
  )
}

export default JoinTeamPage;