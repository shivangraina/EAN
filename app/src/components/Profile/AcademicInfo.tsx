import React from 'react';
import { StyleSheet } from 'react-native';
import { StudentType } from '../../redux/type';
import Container from '../../reusables/components/Containers/Container';
import RowContainer from '../../reusables/components/Containers/RowContainer';
import MyText from '../../reusables/components/Texts/MyText';

const Item = ({ heading, value }) => {
  return (
    <RowContainer contStyle={{ padding: 12, paddingLeft: 4 }}>
      <MyText style={{ fontSize: 18 }}>{heading}</MyText>
      <MyText style={{ fontSize: 14 }}>{value}</MyText>
    </RowContainer>
  );
};

const AcademicInfo = ({ student }: { student: StudentType }) => {
  return (
    <Container contStyle={{ marginTop: 12 }} w100>
      <Item heading="Year" value={student.year.value} />
      <Item heading="Branch" value={student.branch.value} />
      <Item heading="Division" value={student.division.value} />
      <Item heading="Batch" value={student.batch.value} />
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default AcademicInfo;
