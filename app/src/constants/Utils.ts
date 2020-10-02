import { StudentType } from '../redux/type';

export const getTagName = (filter, tags) => {
  switch (filter) {
    case 'batch': {
      return tags.filter((item) => item.tagName.slice(-1) !== 'X')[0].tagName;
    }

    case 'division': {
      return tags.filter((item) => item.tagName.slice(-1) === 'X')[0].tagName;
    }

    case 'branch': {
      return tags.filter(
        (item) => item.tagName.split('_').slice(-2).join('') === 'XX'
      )[0].tagName;
    }

    case 'year': {
      return tags.filter((item) => item.tagName.match(/X/g)?.length === 3)[0]
        .tagName;
    }

    default:
      return null;
  }
};

export const getStudentYBDB = (student: StudentType) => ({
  batch: {
    value: student.batch,
    ...getTagName('batch', student.tags),
  },
  division: {
    value: student.division,
    ...getTagName('division', student.tags),
  },
  branch: {
    value: student.branch,
    ...getTagName('branch', student.tags),
  },
  year: {
    value: student.year,
    ...getTagName('year', student.tags),
  },
});
