import { Reducer, ReducerMap } from 'redux-actions';
import { createAction } from 'redux-promise-middleware-actions';
import { IAction } from 'redux-promise-middleware-actions/lib/actions';

import { IActionDefinition } from './IActionDefinition';

export class SynchronousActionDefinition<Payload, U extends any[]> implements IActionDefinition<Payload, U> {
  // tslint:disable-next-line:variable-name
  private _action: (...args: U) => IAction<Payload>;
  constructor(
    public type: string,
    payloadCreator: (...args: U) => Payload = () => ({} as Payload)
  ) {
    this._action = createAction(this.type, payloadCreator);
  }

  get action() {
    return this._action;
  }

  public createReducerMap<State>(reducer: Reducer<State, Payload>): ReducerMap<State, Payload> {
    return {[this.type]: reducer};
  }
}
