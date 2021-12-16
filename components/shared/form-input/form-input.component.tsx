import React, {
  HTMLInputTypeAttribute,
} from 'react';
import styles from './form-input.module.scss';

interface Props {
  type?: HTMLInputTypeAttribute,
  name: string,
  onChange: React.ChangeEventHandler<HTMLInputElement>,
  inputAttributes?: React.InputHTMLAttributes<HTMLInputElement>,
}

/**
 *
 *
 * @param {Props} props
 * @return {*}
 */
const FormInput: React.FC<Props> = ({
  type = 'text',
  name,
  onChange,
  inputAttributes = {},
}) => {
  // const [showPassword, setShowPassword] = useState(false);

  /**
   *
   *
   * @param {*} e
   */
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    onChange(e);
  };

  // const inputType = useMemo(() => {
  //   if (type === 'password') {
  //     if (showPassword) {
  //       return 'text';
  //     }
  //     return 'password';
  //   }
  //   return type;
  // }, [showPassword, type]);

  return (
    <input
      className={styles.formInput}
      spellCheck="false"
      autoComplete="off"
      name={name}
      {...inputAttributes}
      type={type}
      onChange={handleChange}
    />
  );
};

FormInput.defaultProps = {
  type: 'text',
  inputAttributes: {},
};

export default FormInput;
