import { ReducerMap } from 'redux-actions';

export function combineReducerMaps<State, Payload>(
  reducerMaps: Array<ReducerMap<State, Payload>>
): ReducerMap<State, Payload> {
  return reducerMaps.reduce((previous, current) => ({ ...previous, ...current }));
}
