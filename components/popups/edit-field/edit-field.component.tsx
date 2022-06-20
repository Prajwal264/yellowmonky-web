import { Modal } from 'antd';
import React, { useEffect, useState } from 'react'
import FormInput from '../../shared/form-input/form-input.component';
import styles from './edit-field.module.scss';

interface Props {
  popupData: {
    title: string,
    label: string,
    field: string,
    defaultValue?: string,
    placeholder: string,
  },
  onOk: Function,
  closePopup: ((e?: React.MouseEvent<HTMLElement, MouseEvent>) => void),
}

const EditFieldPopup: React.FC<Props> = ({
  popupData,
  onOk,
  closePopup,
}) => {

  const [formData, setFormData] = useState<{
    [key: string]: any
  } | null>(null);

  const onOkay = async () => {
    if (formData?.[popupData.field]) {
      await onOk(formData);
      closePopup();
    }
  }

  useEffect(() => {
    if (popupData) {
      setFormData({
        [popupData.field]: popupData.defaultValue || '',
      })
    }
  }, [popupData])

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;

    setFormData({
      [name]: value
    })
  }

  return (
    <Modal
      title={popupData.title}
      centered
      transitionName="none"
      maskTransitionName="none"
      visible={!!popupData}
      className={'modal-wrapper'}
      okText="Send"
      okButtonProps={{
        disabled: !formData?.[popupData.field],
      }}
      onOk={onOkay}
      onCancel={closePopup}
    >
      <div className={styles.formGroup}>
        <label>
          <strong>{popupData.label}</strong>
        </label>
        <FormInput
          name={popupData.field}
          value={formData?.[popupData.field]}
          onChange={handleChange}
          inputAttributes={{
            placeholder: popupData.placeholder,
          }}
        />
      </div>
    </Modal>
  )
}

export default EditFieldPopup
