import React, { useCallback, useMemo, useState } from 'react';
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
   * @param {*} e
   */
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    console.log(formData);
  }

  return (
    <div className={styles.signupForm}>
      <h4 className={styles.heading}>
        First, enter your email
      </h4>
      <h6 className={styles.subHeading}>
        We suggest using the email address you use at work.
      </h6>
      <form onSubmit={handleSubmit}>
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
