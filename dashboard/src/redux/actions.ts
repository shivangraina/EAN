import { TeacherType, SetTeacherActionType, SET_TEACHER } from './types';

export const setTeacher = (payload: TeacherType): SetTeacherActionType => ({
  type: SET_TEACHER,
  payload,
});
