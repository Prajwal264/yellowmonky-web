import { Modal } from 'antd'
import React from 'react';
import { useRecoilState } from 'recoil';
import { PopupType, popupAtom } from '../../../state/atoms/popup.atom';

interface Props {
  title: string | React.ReactNode,
  popupType: PopupType
}


const ModalWrapper: React.FC<Props> = ({
  title,
  children,
  popupType,
}) => {
  const [currentPopup, setCurrentPopup] = useRecoilState(popupAtom)
  const closePopup = () => {
    console.log('triggered');
    setCurrentPopup(null)
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
        onOk={closePopup}
        onCancel={closePopup}
      >
        {children}
      </Modal>}
    </React.Fragment>
  )
}

export default ModalWrapper
