import { applyMiddleware, combineReducers, createStore, Reducer } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { createLogger } from 'redux-logger';
import { DecisionTableState } from '../models/DecisionTableState';
import reducer from './reducer';

// Build the middleware for intercepting and dispatching navigation actions
// const myRouterMiddleware = routerMiddleware(history);

const getMiddleware = () => {
  if (process.env.NODE_ENV === 'production') {
    return applyMiddleware();
  } else {
    // Enable additional logging in non-production environments.
    return applyMiddleware(createLogger())
  }
};

export interface IAppStore extends Reducer<DecisionTableState> {
  reducer: Reducer<DecisionTableState>
}

export const mainReducer = combineReducers<IAppStore>({
  reducer
});

export const store = createStore(
  mainReducer, composeWithDevTools(getMiddleware()));

  