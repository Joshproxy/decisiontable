import { IAction } from 'redux-promise-middleware-actions/lib/actions';

export interface IActionDefinition<Payload, U extends any[]> {
  action:
    | ((...args: U) => IAction<Payload>)
    | (((...args: U) => IAction<Promise<Payload>, any>) & {
        toString: () => never;
      } & {
        pending: () => IAction<undefined, undefined>;
        fulfilled: (payload: Payload) => IAction<Payload, undefined>;
        rejected: (payload: any) => IAction<any, undefined>;
      });  
}
