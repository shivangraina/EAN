import { AppActionsType, ReduxState, SET_TEACHER, RESET } from './types';

const initialState: ReduxState = {
  teacher: null,
};

export default (state = initialState, action: AppActionsType): ReduxState => {
  switch (action.type) {
    case SET_TEACHER:
      return { ...state, teacher: action.payload };

    case RESET:
      return { ...initialState, teacher: initialState.teacher };

    default:
      return state;
  }
};
