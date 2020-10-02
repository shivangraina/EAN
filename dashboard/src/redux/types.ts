import { AppState } from '.';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';

export const SET_TEACHER = 'SET_TEACHER';
export const RESET = 'RESET';

export interface PermTagType {
  tagName: string;
  verboseName: string;
}

export interface TeacherType {
  exp: number;
  iat: number;
  tags: TagsType;
  branch: string;
  email: string;
  fName: string;
  joinYear: string | number;
  lName: string;
  regId: string;
  role: 'teacher' | 'admin';
  teacherId: string;
}

export type TagsType = PermTagType[] | null;

export interface ReduxState {
  teacher: TeacherType | null;
}

export interface SetTeacherActionType {
  type: typeof SET_TEACHER;
  payload: TeacherType;
}

export interface ResetActionType {
  type: typeof RESET;
}

export type AppActionsType = SetTeacherActionType | ResetActionType;

export type MyThunkAction<R, T = any> = ThunkAction<
  R,
  AppState,
  T,
  AppActionsType
>;
export type MyThunkDispatch<T = any> = ThunkDispatch<
  AppState,
  T,
  AppActionsType
>;
