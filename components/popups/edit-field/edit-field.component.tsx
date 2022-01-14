import React, { useCallback, useMemo } from 'react'
import { useRecoilValue } from 'recoil';
import { IPopupAtom, popupAtom, PopupType } from '../../../state/atoms/popup.atom'
import FormInput from '../../shared/form-input/form-input.component';
import ModalWrapper from '../modal-wrapper/modal-wrapper.component'
import styles from './edit-field.module.scss';

interface Props {

}

const EditFieldPopup: React.FC<Props> = ({

}) => {

  const currentPopup = useRecoilValue(popupAtom);

  return (
    <ModalWrapper
      popupType={PopupType.EDIT_FIELD}
      title={"Edit"}
      disabled={false}
      onOk={() => { }}
      onCancel={() => { }}
    >
      <div className={styles.formGroup}>
        <label>
          <strong>{"Channel Name"}</strong>
        </label>
        <FormInput
          name=''
          value=''
          onChange={() => { }}
        />
      </div>
    </ModalWrapper>
  )
}

export default EditFieldPopup
