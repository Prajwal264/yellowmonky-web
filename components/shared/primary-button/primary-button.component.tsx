import React, { ReactNode } from 'react';
import styles from './primary-button.module.scss';

interface Props {
  content: string | ReactNode,
  onClick?: React.MouseEventHandler<HTMLButtonElement>,
  type?: 'button' | 'submit' | 'reset',
  disabled?: boolean,
  loading?: boolean,
}

const PrimaryButton: React.FC<Props> = ({
  content,
  onClick,
  type = 'button',
  disabled = false,
  loading = false,
}) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled || loading}
    className={styles.primaryButton}
  >
    {content}
    {loading && (
      <div className={styles.spinner}>
        <div />
        <div />
        <div />
        <div />
      </div>
    )}
  </button>
);

PrimaryButton.defaultProps = {
  disabled: false,
  type: 'button',
  onClick: undefined,
  loading: false,
};

export default PrimaryButton;
