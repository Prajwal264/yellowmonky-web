import { atom } from 'recoil';
import { FetchAllChannelMessagesQuery } from '../../apollo/generated/graphql';
import { AtomTypes } from '../state-types/atom.types';

const channelMessagesAtom = atom({
  key: AtomTypes.CHANNEL_MESSAGES,
  default: [] as FetchAllChannelMessagesQuery['allChannelMessages'],
});

export {channelMessagesAtom}

