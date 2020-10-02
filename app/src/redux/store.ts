import {
  ReduxState,
  AppActionsType,
  SET_STUDENT,
  SET_NOTICE,
  RESET,
} from './type';

const initialState: ReduxState = {
  student: null,
  notices: {
    notice: null,
    exam: null,
    assignment: null,
  },
};

export default (state = initialState, action: AppActionsType): ReduxState => {
  switch (action.type) {
    case SET_STUDENT:
      return { ...state, student: action.payload };

    case SET_NOTICE:
      return {
        ...state,
        notices: {
          ...state.notices,
          ...action.payload,
        },
      };

    case RESET: {
      return {
        ...initialState,
        notices: {
          ...initialState.notices,
        },
      };
    }
    default:
      return state;
  }
};
