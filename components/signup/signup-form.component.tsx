import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { handleEmailValidation } from '../../helpers/validation.helper';
import FormInput from '../shared/form-input/form-input.component';
import PrimaryButton from '../shared/primary-button/primary-button.component';
import styles from './signup-form.module.scss';
import { v4 as uuidV4 } from 'uuid'

export interface FormField {
  name: string,
  label: string,
  type: React.HTMLInputTypeAttribute,
  inputAttributes?: React.InputHTMLAttributes<HTMLInputElement>,
  customValidation?: {
    errorMessage: string,
    validationFn: (data: Record<string, string>) => boolean,
  }
}

interface Props {
  fields?: FormField[]
}
/**
 *
 *
 * @return {*} 
 */
const SignupForm: React.FC<Props> = ({
  fields = [],
}) => {

  const defaultValues = useMemo(() => fields.reduce((acc: Record<string, string>, cur) => {
    acc[cur.name] = '';
    return acc;
  }, {}), [fields])

  const [formData, setFormData] = useState(defaultValues)
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
    const isValid = fields.every((field) => {
      const fieldName = field.name;
      const fieldType = field.type;
      const fieldLabel = field.label;
      if (!formData[fieldName]) {
        toast.error(`${fieldLabel} cannot be empty`)
        return false;
      }
      if (fieldType === 'email') {
        if (!handleEmailValidation(formData[fieldName])) {
          toast.error('Enter a valid email')
          return false;
        }
      }
      if ('customValidation' in field) {
        const customValidationFnResponse = field.customValidation?.validationFn(formData);
        if (!customValidationFnResponse) {
          const errorMessage = field.customValidation?.errorMessage;
          if (errorMessage) {
            toast.error(errorMessage)
          }
          return false;
        }
      }
      return true;
    })
    return isValid;
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
        {fields.map((field, i) => (
          <React.Fragment key={[field, i].join('_')}>
            <label>{field.label}</label>
            <FormInput
              name={field.name}
              type={field.type}
              value={formData[field.name]}
              onChange={handleChange}
              inputAttributes={field.inputAttributes}
            />
          </React.Fragment>
        ))}
        <PrimaryButton content="continue" type='submit' />
      </form>
    </div>
  )
}

export default SignupForm
