import { atom } from 'recoil';
import { FetchAllTeamMembersQuery } from '../../apollo/generated/graphql';
import { AtomTypes } from '../state-types/atom.types';

const allMembersAtom = atom({
  key: AtomTypes.ALL_MEMBERS,
  default: [] as FetchAllTeamMembersQuery['allTeamMembers'],
});

export {allMembersAtom}

