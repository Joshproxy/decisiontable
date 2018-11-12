import { Reducer, ReducerMap } from 'redux-actions';
import { createAction } from 'redux-promise-middleware-actions';
import { IAction } from 'redux-promise-middleware-actions/lib/actions';

import { IActionDefinition } from './IActionDefinition';

export class SynchronousActionDefinition<Payload, U extends any[]>
  implements IActionDefinition<Payload, U> {
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

  public createReducerMap = <State>(
    fn: (draft: State, payload: Payload) => State
  ): ReducerMap<State, any> =>
    SynchronousActionDefinition.mapToReducer(
      this.type,
      SynchronousActionDefinition.uncurryToAction(fn)
    );

  // tslint:disable-next-line:member-ordering
  public static unwrapPayload = <State, Payload>(
    state: State,
    action: IAction<Payload>
  ) => (fn: (draft: State, value: Payload) => State) =>
    fn(state, action.payload!);

  // tslint:disable-next-line:member-ordering
  public static uncurryToAction = <State, Payload>(
    fn: (draft: State, payload: Payload) => State
  ) => (state: State, action: IAction<Payload>) =>
    SynchronousActionDefinition.unwrapPayload(state, action)(fn);

  // tslint:disable-next-line:member-ordering
  public static mapToReducer<State, Payload>(
    type: string,
    reducer: Reducer<State, Payload>
  ): ReducerMap<State, Payload> {
    return { [type]: reducer };
  }
}
