import { atom } from 'recoil';
import { FetchTeamInfoQuery } from '../../apollo/generated/graphql';
import { AtomTypes } from '../state-types/atom.types';

const teamInfoAtom = atom({
  key: AtomTypes.TEAM_INFO,
  default: null as FetchTeamInfoQuery['team'] | null,
});

export {teamInfoAtom}

