import { FontAwesome } from '@expo/vector-icons';
import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Button from '../../../reusables/components/Buttons/Button';
import RowContainer from '../../../reusables/components/Containers/RowContainer';
import Avatar from '../../../reusables/components/General/Avatar';
import SelectHightlight from '../../../reusables/components/HOCs/SelectHighlight';
import { BLUE_BUTTON, BORDER, WHITE } from '../../../reusables/styles/colors';
import { marginStyles } from '../../../reusables/styles/style';
import { getWidth } from '../../../reusables/Utils/DeviceInfo';
import { filter } from './common';

interface Props {
  renderComponents: (Comp: any) => JSX.Element;
  selected: number;
  index: number;
  setFilter: React.Dispatch<React.SetStateAction<filter>>;
}

interface FilterProps {
  title: string;
  selected: number;
  handlePress: (index: number) => void;
  index: number;
}

const filterMap: filter[] = ['general', 'division', 'batch', 'branch', 'year'];

const FilterComp: React.FC<FilterProps> = ({
  title,
  selected,
  handlePress,
  index,
}) => {
  return (
    <Button
      handlePress={() => handlePress(index)}
      title={title}
      contStyle={[styles.button, selected ? styles.selectedButton : null]}
      textStyle={!selected ? { color: BLUE_BUTTON } : null}
    />
  );
};

const FilterTags: React.FC<Props> = ({
  renderComponents,
  selected,
  setFilter,
}) => {
  useEffect(() => {
    setFilter(filterMap[selected]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  return (
    <RowContainer contStyle={styles.rowCont}>
      <ScrollView
        alwaysBounceHorizontal
        showsHorizontalScrollIndicator={false}
        horizontal
        contentContainerStyle={styles.container}
      >
        <Avatar
          renderIcon={() => {
            return <FontAwesome name="filter" size={20} color={BLUE_BUTTON} />;
          }}
          contStyle={marginStyles.mr_8}
          iconContStyle={{ borderColor: BLUE_BUTTON }}
          size={32}
        />
        {renderComponents(FilterComp)}
      </ScrollView>
    </RowContainer>
  );
};

const styles = StyleSheet.create({
  rowCont: {
    borderBottomWidth: 1,
    marginTop: 13.3,
    width: getWidth(),
    paddingLeft: 12,
    borderColor: BORDER,
    paddingBottom: 13.3,
  },

  container: {
    alignItems: 'center',
    // borderWidth: 1,
  },
  button: {
    backgroundColor: WHITE,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: BLUE_BUTTON,
    paddingLeft: 6,
    paddingRight: 6,
    marginRight: 8,
    marginLeft: 8,
    paddingTop: 3,
    paddingBottom: 3,
    height: 25,
  },
  selectedButton: {
    backgroundColor: BLUE_BUTTON,
  },
});

export default SelectHightlight(FilterTags);
