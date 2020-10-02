import {
  NoticesStateType,
  SetNoticesActionType,
  SetStudentActionType,
  SET_NOTICE,
  SET_STUDENT,
  StudentType,
} from './type';

export const setStudent = (payload: StudentType): SetStudentActionType => ({
  type: SET_STUDENT,
  payload,
});

export const setNotices = (
  payload: Partial<NoticesStateType>
): SetNoticesActionType => ({
  type: SET_NOTICE,
  payload,
});
