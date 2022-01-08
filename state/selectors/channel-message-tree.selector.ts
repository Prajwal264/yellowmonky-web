import { selector } from 'recoil';
import { FetchAllChannelMessagesQuery, FetchAllTeamMembersQuery, User } from '../../apollo/generated/graphql';
import { allMembersAtom } from '../atoms/all-members.atom';
import { channelMessagesAtom } from '../atoms/channel-messages.atom';
import { SelectorTypes } from '../state-types/selector.types';

type TeamMember = FetchAllTeamMembersQuery['allTeamMembers'][0];
export type MessageWithCreator = FetchAllChannelMessagesQuery['allChannelMessages'][0] & {
  creator: User,
  showOwner: boolean,
}

export const channelMessageTreeSelector = selector({
  key: SelectorTypes.GENERATE_MESSAGETREE,
  get: ({ get }) => {
    const allChannelMessages = get(channelMessagesAtom);
    const allMembers = get(allMembersAtom); // TODO: this should be channel members not team members
    const allMembersMap: Map<string, TeamMember> = allMembers.reduce((acc, cur) => {
      acc.set(cur.user.id, cur.user);
      return acc;
    }, new Map());

    const allChannelMessageMap:  Map<string, MessageWithCreator> = allChannelMessages.reduce((acc, cur, index) => {
      const extendedValue: any = {...cur}
      extendedValue.showOwner = true
      if(!index) {
      } else if(cur.creatorId === allChannelMessages[index-1].creatorId) {
        extendedValue.showOwner = false;
      }
      extendedValue.creator = allMembersMap.get(cur.creatorId);
      acc.set(cur.id, extendedValue);
      return acc;
    }, new Map())

    return allChannelMessageMap;
  }
})