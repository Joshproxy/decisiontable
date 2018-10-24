import { Reducer, ReducerMap } from 'redux-actions';
import { createAsyncAction } from 'redux-promise-middleware-actions';
import { IAction } from 'redux-promise-middleware-actions/lib/actions';

import { IActionDefinition } from './IActionDefinition';

export class AsynchronousActionDefinition<Payload, U extends any[]> implements IActionDefinition<Payload, U> {
  // tslint:disable-next-line:variable-name
  private _action: ((...args: U) => IAction<Promise<Payload>, any>) & {
    toString: () => never;
  } & {
    pending: () => IAction<undefined, undefined>;
    fulfilled: (payload: Payload) => IAction<Payload, undefined>;
    rejected: (payload: any) => IAction<any, undefined>;
  };
  constructor(type: string, payloadCreator: (...args: U) => Promise<Payload>) {
    this._action = createAsyncAction(type, payloadCreator);
  }

  get action() {
    return this._action;
  }

  get pendingType(): string {
    return String(this.action.pending);
  }

  get fulfilledType(): string {
    return String(this.action.fulfilled);
  }

  get rejectedType(): string {
    return String(this.action.rejected);
  }

  public createReducerMap<State>(
    fulfilledReducer: Reducer<State, Payload>,
    pendingReducer: Reducer<State, Payload> = () => ({} as State),    
    rejectedReducer: Reducer<State, Payload> = () => ({} as State)
  ): ReducerMap<State, Payload> {
    return {
      [this.pendingType]: pendingReducer,
      [this.fulfilledType]: fulfilledReducer,
      [this.rejectedType]: rejectedReducer
    };
  }
}
