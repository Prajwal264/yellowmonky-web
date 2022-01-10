import { DataNode } from 'antd/lib/tree';
import { IoMdAddCircle } from 'react-icons/io';
import { selector } from 'recoil';
import { NodeType } from '../../components/app-layout/channelsidebar/channelsidebar.component';
import ChannelSidebarItem from '../../components/app-layout/channelsidebaritem/channelsidebaritem.component';
import { allChannelsAtom } from '../atoms/all-channels.atom';
import { constructTree } from '../helpers/construct-tree.helper';
import { SelectorTypes } from '../state-types/selector.types';

export const channelTreeSelector = selector({
  key: SelectorTypes.GENERATE_CHANNELTREE,
  get: ({ get }) => {
    const channels = get(allChannelsAtom)
    const parentNode: DataNode = {
      title: 'Channels',
      key: NodeType.CHANNELS,
      children: [],
      selectable: false,
    };
    if (channels?.length) {
      const lastChild = {
        title: <ChannelSidebarItem icon={<IoMdAddCircle />} name='Add Channel' />,
        key: 'add-channels',
        children: [],
      }
      const tree = constructTree({
        parentNode,
        children: channels,
        lastChild
      }, NodeType.CHANNELS);
      return tree;
    }
    return [parentNode];
  }
})