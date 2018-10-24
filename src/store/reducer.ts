import { Action, handleActions } from 'redux-actions';

import { DecisionTableState } from '../models/DecisionTableState';
import { DecisionTableStateFunctions } from '../models/DecisionTableStateFunctions';
import { IDecisionVariable } from '../models/IDecisionVariable/DecisionVariable';
import * as Actions from './actions';
import { combineReducerMaps } from './common/reducer';

const reducerMap = combineReducerMaps([
  Actions.initialLoad.createReducerMap(
    (
      state: DecisionTableState,
      action: Action<DecisionTableState>
    ): DecisionTableState => ({ ...action.payload! })
  ),
  Actions.addVariable.createReducerMap(
    (state: DecisionTableState): DecisionTableState => {
      return DecisionTableStateFunctions.addVariable(state);
    }
  ),
  Actions.clear.createReducerMap(
    (state: DecisionTableState): DecisionTableState => {
      return DecisionTableStateFunctions.clear(state);
    }
  ),
  Actions.editVariable.createReducerMap(
    (
      state: DecisionTableState,
      action: Action<IDecisionVariable>
    ): DecisionTableState => {
      return DecisionTableStateFunctions.editVariable(state, action.payload!);
    }
  ),
  Actions.removeVariable.createReducerMap(
    (state: DecisionTableState, action: Action<number>): DecisionTableState => {
      return DecisionTableStateFunctions.removeVariable(state, action.payload!);
    }
  ),
  Actions.toggleColumn.createReducerMap(
    (state: DecisionTableState, action: Action<number>): DecisionTableState => {
      return DecisionTableStateFunctions.toggleColumn(state, action.payload!);
    }
  ),
  Actions.updateTrueResult.createReducerMap(
    (state: DecisionTableState, action: Action<string>): DecisionTableState => {
      return DecisionTableStateFunctions.updateTrueResult(
        state,
        action.payload!
      );
    }
  ),
  Actions.updateFalseResult.createReducerMap(
    (state: DecisionTableState, action: Action<string>): DecisionTableState => {
      return DecisionTableStateFunctions.updateFalseResult(
        state,
        action.payload!
      );
    }
  )
]);

const reducer = handleActions<DecisionTableState, DecisionTableState>(
  reducerMap,
  new DecisionTableState()
);

export default reducer;
