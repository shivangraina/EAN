import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AppState } from './index';

export const SET_STUDENT = 'SET_STUDENT';
export const SET_NOTICE = 'SET_NOTICE';
export const RESET = 'RESET';

export interface PermTagType {
  tagName: string;
  verboseName: string;
}

export interface YBDBtype<T = number | string> extends PermTagType {
  value: T;
}

export type TagsType = PermTagType[] | null;

export interface NoticeItemType {
  _id: string;
  type: 'notice' | 'exam' | 'assignment';
  tags: TagsType;
  title: string;
  body: string;
  date: string;
  fileLink: string;
  teacherId: string;
  validDate: string;
  bookmarked: boolean; // From frontend
}

export interface NoticesStateType {
  notice: NoticeItemType[] | null;
  exam: NoticeItemType[] | null;
  assignment: NoticeItemType[] | null;
}

export interface StudentType {
  tags: TagsType;
  fName: string;
  lName: string;
  branch: YBDBtype<'I' | 'C' | 'E'>;
  year: YBDBtype;
  division: YBDBtype;
  batch: YBDBtype<string>;
  email: string;
  regId: string;
  birthDate: string;
}

export interface ReduxState {
  student: StudentType | null;
  notices: NoticesStateType;
}

export interface SetStudentActionType {
  type: typeof SET_STUDENT;
  payload: StudentType;
}

export interface SetNoticesActionType {
  type: typeof SET_NOTICE;
  payload: Partial<NoticesStateType>;
}

export interface ResetActionType {
  type: typeof RESET;
}

export type AppActionsType =
  | SetStudentActionType
  | SetNoticesActionType
  | ResetActionType;

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
