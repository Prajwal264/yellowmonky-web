import { atom } from 'recoil';
import { FetchAllChannelsQuery } from '../../apollo/generated/graphql';
import { AtomTypes } from '../state-types/atom.types';

const channelsAtom = atom({
  key: AtomTypes.CHANNELS,
  default: [] as FetchAllChannelsQuery['allChannels'],
});

export {channelsAtom}

