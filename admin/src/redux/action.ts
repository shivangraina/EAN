import {
  GET_TAGS,
  GetTagActionTypes,
  TagsType,
  SET_FACULTY,
  SetFacultyActionTypes,
  FacultyType,
  TeacherType,
  SetTeacherActionType,
  SET_TEACHER,
  StudentType,
  SetStudentListActionTypes,
  SET_STUDENT_LIST,
} from './types';

export const setAllTags = (payload: TagsType): GetTagActionTypes => ({
  type: GET_TAGS,
  payload,
});

export const setFaculty = (payload: FacultyType): SetFacultyActionTypes => ({
  type: SET_FACULTY,
  payload,
});

export const setStudent = (
  payload: StudentType[],
): SetStudentListActionTypes => ({
  type: SET_STUDENT_LIST,
  payload,
});

export const setTeacher = (payload: TeacherType): SetTeacherActionType => ({
  type: SET_TEACHER,
  payload,
});
