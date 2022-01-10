import { DataNode } from 'antd/lib/tree';
import { IoMdAddCircle } from 'react-icons/io';
import { selector } from 'recoil';
import { NodeType } from '../../components/app-layout/channelsidebar/channelsidebar.component';
import ChannelSidebarItem from '../../components/app-layout/channelsidebaritem/channelsidebaritem.component';
import { allMembersAtom } from '../atoms/all-members.atom';
import { constructTree } from '../helpers/construct-tree.helper';
import { SelectorTypes } from '../state-types/selector.types';

export const memberTreeSelector = selector({
  key: SelectorTypes.GENERATE_MEMBERTREE,
  get: ({ get }) => {
    const members = get(allMembersAtom);
    const parentNode: DataNode = {
      title: 'Direct messages',
      key: NodeType.MEMBERS,
      children: [],
      selectable: false,
    };
    if (members?.length) {
      const lastChild = {
        title: <ChannelSidebarItem icon={<IoMdAddCircle />} name='Add Members' />,
        key: 'add-members',
        children: []
      }
      const tree = constructTree({
        parentNode,
        children: members,
        lastChild
      }, NodeType.MEMBERS);
      return tree;
    }
    return [parentNode];
  }
})