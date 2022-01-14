import { Modal } from 'antd'
import React from 'react';
import { useRecoilState } from 'recoil';
import { PopupType, popupAtom } from '../../../state/atoms/popup.atom';

interface Props {
  title: string | React.ReactNode,
  popupType: PopupType
  disabled?: boolean,
  onOk: Function,
  onCancel: Function,
  showCtaSection?: boolean,
}


const ModalWrapper: React.FC<Props> = ({
  title,
  children,
  popupType,
  disabled = true,
  onOk,
  onCancel,
  showCtaSection = true
}) => {
  const [currentPopup, setCurrentPopup] = useRecoilState(popupAtom);

  /**
   *
   *
   */
  const closePopup = () => {
    setCurrentPopup(null)
    onCancel();
  }

  /**
   *
   *
   * @param {*} e
   */
  const onOkay: ((e: React.MouseEvent<HTMLElement, MouseEvent>) => void) = async () => {
    closePopup();
    await onOk()
  }


  return (
    <React.Fragment>
      {!!(currentPopup && (currentPopup.type === popupType)) && <Modal
        title={title}
        centered
        transitionName="none"
        maskTransitionName="none"
        visible={!!(currentPopup && (currentPopup.type === popupType))}
        className={'modal-wrapper'}
        okText="Send"
        cancelText=""
        okButtonProps={{
          disabled,
          style: {
            display: showCtaSection ? 'flex' : 'none'
          }
        }}
        cancelButtonProps={{
          style: {
            display: showCtaSection ? 'flex' : 'none'
          }
        }}
        onOk={onOkay}
        onCancel={closePopup}
      >
        {children}
      </Modal>}
    </React.Fragment>
  )
}

export default ModalWrapper
