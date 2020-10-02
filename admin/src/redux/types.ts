import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AppState } from '.';

export const GET_TAGS = 'GET_TAGS';
export const SET_FACULTY = 'SET_FACULTY';
export const SET_TEACHER = 'SET_TEACHER';
export const SET_STUDENT_LIST = 'SET_STUDENT_LIST';
export const RESET = 'RESET';

export interface PermTagType {
  tagName: string;
  verboseName: string;
}

export interface StudentType {
  fName: string;
  lName: string;
  regId: string;
  email: string;
  branch: 'C' | 'I' | 'E';
  year: string;
  division: string;
  batch: string;
}

export interface CollegeFacultyType {
  fName: string;
  lName: string;
  regId: string;
  email: string;
  branch: string;
  joinYear: string;
  tags: string[];
}

export interface TeacherType {
  Id: string;
  exp: number;
  iat: number;
  tags: TagsType[];
}

export type TagsType = PermTagType[] | null;
export type FacultyType = CollegeFacultyType[];

export interface ReduxState {
  tags: TagsType;
  faculty: FacultyType;
  teacher: TeacherType | null;
  studentList: StudentType[];
}

export interface GetTagActionTypes {
  type: typeof GET_TAGS;
  payload: TagsType;
}

export interface SetFacultyActionTypes {
  type: typeof SET_FACULTY;
  payload: FacultyType;
}

export interface SetStudentListActionTypes {
  type: typeof SET_STUDENT_LIST;
  payload: StudentType[];
}

export interface SetTeacherActionType {
  type: typeof SET_TEACHER;
  payload: TeacherType;
}

export interface ResetActionType {
  type: typeof RESET;
}

export type AppActionsType =
  | GetTagActionTypes
  | SetFacultyActionTypes
  | SetTeacherActionType
  | ResetActionType
  | SetStudentListActionTypes;

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
