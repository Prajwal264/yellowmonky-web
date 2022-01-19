import { atom } from 'recoil';
import { FetchAllDirectMessagesQuery } from '../../apollo/generated/graphql';
import { AtomTypes } from '../state-types/atom.types';

const directMessagesAtom = atom({
  key: AtomTypes.DIRECT_MESSAGES,
  default: [] as FetchAllDirectMessagesQuery['allDirectMessagesByRecipientId'],
});

export {directMessagesAtom}

