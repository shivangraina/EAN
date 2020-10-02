import { CommonCompStyles } from '../../../types/common_types';
import { TouchableOpacityOnPress } from '../../../types/common_types';

export interface CommonButtonProps extends CommonCompStyles {
  handlePress?: TouchableOpacityOnPress;
  long?: boolean;
  title: string;
}
