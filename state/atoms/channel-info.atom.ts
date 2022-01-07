import { atom } from 'recoil';
import { FetchChannelQuery } from '../../apollo/generated/graphql';
import { AtomTypes } from '../state-types/atom.types';

const channelInfoAtom = atom({
  key: AtomTypes.CHANNEL_INFO,
  default: null as FetchChannelQuery['channel'] | null,
});

export {channelInfoAtom}

