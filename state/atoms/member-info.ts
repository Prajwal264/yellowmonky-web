import { atom } from 'recoil';
import { FetchTeamMemberQuery } from '../../apollo/generated/graphql';
import { AtomTypes } from '../state-types/atom.types';

const memberInfoAtom = atom({
  key: AtomTypes.MEMBER_INFO,
  default: null as FetchTeamMemberQuery['teamMember'] | null,
});

export {memberInfoAtom}

