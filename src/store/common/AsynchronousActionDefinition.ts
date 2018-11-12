import { ReducerMap } from 'redux-actions';
import { createAsyncAction } from 'redux-promise-middleware-actions';
import { IAction } from 'redux-promise-middleware-actions/lib/actions';

import { IActionDefinition } from './IActionDefinition';
import { combineReducerMaps } from './reducer';
import { SynchronousActionDefinition } from './SynchronousActionDefinition';

export class AsynchronousActionDefinition<Payload, U extends any[]>
  implements IActionDefinition<Payload, U> {
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

  // tslint:disable-next-line:member-ordering
  public createReducerMap = <State>  (
    fulfilledReducer: ((draft: State, payload: Payload) => State),
    pendingReducer: ((draft: State, payload: Payload) => State),
    rejectedReducer: ((draft: State, payload: any) => State)
  ) : ReducerMap<State, Payload> => {
    
    return combineReducerMaps([
      SynchronousActionDefinition.mapToReducer(
        this.fulfilledType,
        SynchronousActionDefinition.uncurryToAction(fulfilledReducer)
      ),
      SynchronousActionDefinition.mapToReducer(
        this.pendingType,
        SynchronousActionDefinition.uncurryToAction(pendingReducer)
      ),
      SynchronousActionDefinition.mapToReducer(
        this.rejectedType,
        SynchronousActionDefinition.uncurryToAction(rejectedReducer)
      )
    ]);
  };

}
