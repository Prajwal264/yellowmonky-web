import React, { useCallback, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { handleEmailValidation } from '../../helpers/validation.helper';
import FormInput from '../shared/form-input/form-input.component';
import PrimaryButton from '../shared/primary-button/primary-button.component';
import styles from './signup-form.module.scss';

interface Props {

}
const defaultState = {
  email: ''
}

/**
 *
 *
 * @return {*} 
 */
const SignupForm: React.FC<Props> = () => {
  const [formData, setFormData] = useState(defaultState)

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
    return true;
  }

  /**
   *
   *
   * @param {*} e
   */
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    console.log(formData);
    if (validateFields()) {

    }
  }

  return (
    <div className={styles.signupForm}>
      <h4 className={styles.heading}>
        First, enter your email
      </h4>
      <h6 className={styles.subHeading}>
        We suggest using the email address you use at work.
      </h6>
      <form noValidate onSubmit={handleSubmit}>
        <FormInput
          name="email"
          type="email"
          onChange={handleChange}
          inputAttributes={{
            placeholder: "name@work-email.com"
          }}
        />
        <PrimaryButton content="continue" type='submit' />
      </form>
    </div>
  )
}

export default SignupForm
