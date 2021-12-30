import { useRouter } from 'next/router';
import React, { useCallback, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { handleEmailValidation } from '../../helpers/validation.helper';
import FormInput from '../shared/form-input/form-input.component';
import PrimaryButton from '../shared/primary-button/primary-button.component';
import styles from './signup-form.module.scss';

interface Props {

}
const defaultState = {
  email: '',
  password: '',
}

/**
 *
 *
 * @return {*} 
 */
const SignupForm: React.FC<Props> = () => {
  const [formData, setFormData] = useState(defaultState)
  const router = useRouter();

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      const { name, value } = e.target;
      setFormData((prevState) => ({
        ...prevState,
        [name]: value
      }))
    },
    [],
  )

  /**
   *
   *
   * @return {*} 
   */
  const validateFields = () => {
    if (!formData.email) {
      toast.error('Please enter email')
      return false;
    }
    if (!handleEmailValidation(formData.email)) {
      toast.error('Enter a valid email')
      return false;
    }
    if (!formData.password) {
      toast.error('Password cannot be empty')
      return false;
    }
    return true;
  }

  /**
   *
   *
   * @param {*} e
   */
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (validateFields()) {
      console.log(formData);

      // make api call to store the user credentials
      router.push('/create-team/id');
    }
  }

  return (
    <div className={styles.signupForm}>
      <h4 className={styles.heading}>
        Create an Account
      </h4>
      <h6 className={styles.subHeading}>
        We suggest using the email address you use at work.
      </h6>
      <form noValidate onSubmit={handleSubmit}>
        <label>Email</label>
        <FormInput
          name="email"
          type="email"
          onChange={handleChange}
          inputAttributes={{
            placeholder: "name@work-email.com"
          }}
        />
        <label>Password</label>
        <FormInput
          name="password"
          type="password"
          onChange={handleChange}
          inputAttributes={{
            placeholder: "********"
          }}
        />
        <PrimaryButton content="continue" type='submit' />
      </form>
    </div>
  )
}

export default SignupForm
