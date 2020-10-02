import { applyMiddleware, createStore, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import rootStore from './store';

const rootReducer = combineReducers({
  rootStore,
});

export type AppState = ReturnType<typeof rootReducer>;

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
