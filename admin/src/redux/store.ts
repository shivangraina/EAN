import {
  GET_TAGS,
  ReduxState,
  AppActionsType,
  SET_FACULTY,
  SET_TEACHER,
  RESET,
  SET_STUDENT_LIST,
} from './types';

const initialState: ReduxState = {
  tags: null,
  faculty: [],
  teacher: null,
  studentList: [],
};

export default (state = initialState, action: AppActionsType): ReduxState => {
  switch (action.type) {
    case GET_TAGS:
      return { ...state, tags: [...action.payload] };

    case SET_FACULTY:
      return { ...state, faculty: action.payload };

    case SET_TEACHER:
      return { ...state, teacher: action.payload };

    case SET_STUDENT_LIST:
      return { ...state, studentList: action.payload };

    case RESET:
      return { ...initialState, faculty: [] };

    default:
      return state;
  }
};
