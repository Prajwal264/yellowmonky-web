import { DataNode } from 'antd/lib/tree';
import Avatar from 'react-avatar';
import { BiHash } from 'react-icons/bi';
import { NodeType } from '../../components/app-layout/channelsidebar/channelsidebar.component';
import ChannelSidebarItem from '../../components/app-layout/channelsidebaritem/channelsidebaritem.component';

export const constructTree = (config: {
  parentNode: DataNode,
  children: any, // TODO: fix type
  lastChild: DataNode,
}, treeType: NodeType) => {
  const { parentNode, children, lastChild } = config;
  const tree = [parentNode];
  let childNodes = [];
  if (treeType === NodeType.CHANNELS) {
    childNodes = children.map((child: any) => ({
      title: <ChannelSidebarItem icon={<BiHash />} name={child?.name!} />,
      key: child?.id!,
    }))
  } else {
    childNodes = children.map((child: any) => ({
      title: <ChannelSidebarItem icon={<Avatar name={child.user.username} />} name={child.user.username} />,
      key: child.id,
    }))
  }
  parentNode.children?.push(...childNodes);
  parentNode.children!.push(lastChild);
  return tree;
}