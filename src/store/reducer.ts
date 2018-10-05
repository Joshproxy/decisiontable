import { Action, handleActions, ReducerMap } from 'redux-actions';

import { DecisionTableState } from '../models/DecisionTableState';
import { DecisionTableStateFunctions } from '../models/DecisionTableStateFunctions';
import { IDecisionVariable } from '../models/IDecisionVariable/DecisionVariable';
import { ADD_VARIABLE, CLEAR, EDIT_VARIABLE, REMOVE_VARIABLE, TOGGLE_COLUMN } from './actions';

const reducerMap = {
  [ADD_VARIABLE]: (state: DecisionTableState): DecisionTableState => {
    return DecisionTableStateFunctions.addVariable(state);
  },
  [CLEAR]: (state: DecisionTableState): DecisionTableState => {
    return DecisionTableStateFunctions.clear(state);
  },
  [EDIT_VARIABLE]: (
    state: DecisionTableState,
    action: Action<IDecisionVariable>
  ): DecisionTableState => {
    return DecisionTableStateFunctions.editVariable(state, action.payload!);
  },
  [REMOVE_VARIABLE]: (
    state: DecisionTableState,
    action: Action<number>
  ): DecisionTableState => {
    return DecisionTableStateFunctions.removeVariable(state, action.payload!);
  },
  [TOGGLE_COLUMN]: (
    state: DecisionTableState,
    action: Action<number>
  ): DecisionTableState => {
    return DecisionTableStateFunctions.toggleColumn(state, action.payload!);
  }
} as ReducerMap<DecisionTableState, IDecisionVariable>;

const reducer = handleActions<DecisionTableState, IDecisionVariable>(
  reducerMap,
  new DecisionTableState()
);

export default reducer;
