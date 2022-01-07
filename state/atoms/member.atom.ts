import { atom } from 'recoil';
import { FetchAllTeamMembersQuery } from '../../apollo/generated/graphql';
import { AtomTypes } from '../state-types/atom.types';

const membersAtom = atom({
  key: AtomTypes.MEMBERS,
  default: [] as FetchAllTeamMembersQuery['allTeamMembers'],
});

export {membersAtom}

