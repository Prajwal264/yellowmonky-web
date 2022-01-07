import { atom } from 'recoil';
import { FetchAllChannelsQuery } from '../../apollo/generated/graphql';
import { AtomTypes } from '../state-types/atom.types';

const allChannelsAtom = atom({
  key: AtomTypes.ALL_CHANNELS,
  default: [] as FetchAllChannelsQuery['allChannels'],
});

export {allChannelsAtom}

