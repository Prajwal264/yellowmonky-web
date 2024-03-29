import { atom } from 'recoil';
import { AtomTypes } from '../state-types/atom.types';

export enum PopupType {
  ADD_MEMBER = 'ADD_MEMBER',
  CREATE_CHANNEL = 'CREATE_CHANNEL',
  EDIT_CHANNEL = 'EDIT_CHANNEL',
  EDIT_FIELD = 'EDIT_FIELD',
}

export interface IPopupAtom {
  type: PopupType,
  metadata?: {
    [key: string]: any,
  }
};

const popupAtom = atom({
  key: AtomTypes.CURRENT_POPUP,
  default: null as IPopupAtom | null,
});

export {popupAtom}

