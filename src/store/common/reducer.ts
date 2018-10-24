import { ReducerMap } from 'redux-actions';

// export interface ReducerMap<State, Payload> {
//     [actionType: string]: ReducerMapValue<State, Payload>;
// }

export function combineReducerMaps<State, Payload>(
  reducerMaps: Array<ReducerMap<State, Payload>>
): ReducerMap<State, Payload> {
  return reducerMaps.reduce((previous, current) => ({ ...previous, ...current }));
}
