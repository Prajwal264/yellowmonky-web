import dayjs from 'dayjs';
import { selector } from 'recoil';
import { FetchAllChannelMessagesQuery, FetchAllTeamMembersQuery, User } from '../../apollo/generated/graphql';
import { allMembersAtom } from '../atoms/all-members.atom';
import { channelMessagesAtom } from '../atoms/channel-messages.atom';
import { SelectorTypes } from '../state-types/selector.types';

type TeamMember = FetchAllTeamMembersQuery['allTeamMembers'][0];
export type ChannelMessageWithCreator = FetchAllChannelMessagesQuery['allChannelMessages'][0] & {
  creator: User,
  showOwner: boolean,
  showDivider: boolean,
}

export const channelMessageTreeSelector = selector({
  key: SelectorTypes.GENERATE_CHANNEL_MESSAGETREE,
  get: ({ get }) => {
    const allChannelMessages = get(channelMessagesAtom);
    const allMembers = get(allMembersAtom); // TODO: this should be channel members not team members
    const allMembersMap: Map<string, TeamMember> = allMembers.reduce((acc, cur) => {
      acc.set(cur.id, cur.user);
      return acc;
    }, new Map());

    const allChannelMessageMap:  Array<ChannelMessageWithCreator> = allChannelMessages.reduce((acc, cur, index) => {
      const extendedValue: any = {...cur}
      extendedValue.showOwner = true;
      extendedValue.showDivider = false;
      const prevMessage =allChannelMessages[index-1];
      if(!index) {
        extendedValue.showDivider = true;
      } else {
        if(cur.creatorId === prevMessage.creatorId) {
          extendedValue.showOwner = false;
        }
        if(dayjs(cur.createdAt).isSame(dayjs(prevMessage.createdAt), 'day')) {
        } else {
          extendedValue.showDivider = true;
          extendedValue.showOwner = true;
        }
      } 
      extendedValue.creatorId = cur.creatorId;
      extendedValue.creator = allMembersMap.get(cur.creatorId);
      acc.push(extendedValue);
      return acc;
    }, [] as Array<ChannelMessageWithCreator>)

    return allChannelMessageMap;
  }
})