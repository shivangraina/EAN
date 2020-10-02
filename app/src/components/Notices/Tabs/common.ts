import { NoticeItemType } from '../../../redux/type';

export type ListItemProps = Partial<
  NoticeItemType & { index: number, touchable: boolean }
>;

export type FlatListItem = React.FC<ListItemProps>;

export type filter = 'batch' | 'division' | 'branch' | 'year' | 'general';
