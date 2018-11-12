import { ReducerMap } from 'redux-actions';

import { AsynchronousActionDefinition } from './AsynchronousActionDefinition';
import { IActionDefinition } from './IActionDefinition';
import { SynchronousActionDefinition } from './SynchronousActionDefinition';

export class ActionReducer<State> {
  public reducerMap: ReducerMap<State, any>;
  constructor() {
    this.reducerMap = {};
  }

  public add = (
    action: IActionDefinition<any, any>,
    fulfilled: ((draft: State, payload: any) => State),
    pending?: ((draft: State, payload: any) => State),
    rejected?: ((draft: State, payload: any) => State)
  ) => {
    let newMap: ReducerMap<State, any>;
    if (action instanceof AsynchronousActionDefinition) {
      newMap = (action as AsynchronousActionDefinition<
        any,
        any
      >).createReducerMap(fulfilled, pending!, rejected!);
    } else {
      newMap = (action as SynchronousActionDefinition<
        any,
        any
      >).createReducerMap(fulfilled);
    }
    this.reducerMap = combineReducerMaps([this.reducerMap, newMap]);
    return this;
  };

}

export function combineReducerMaps<State>(
  reducerMaps: Array<ReducerMap<State, any>>
): ReducerMap<State, any> {
  return reducerMaps.reduce((previous, current) => ({
    ...previous,
    ...current
  }));
}
