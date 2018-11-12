import { handleActions } from 'redux-actions';

import { DecisionTableState } from '../models/DecisionTableState';
import { DecisionTableStateFunctions } from '../models/DecisionTableStateFunctions';
import * as Actions from './actions';
import { ActionReducer } from './common/reducer';

const dtf = DecisionTableStateFunctions;

const reducerMap = new ActionReducer<DecisionTableState>()
  .add(Actions.initialLoad, dtf.merge, dtf.loading, dtf.error)
  .add(Actions.addVariable, dtf.addVariable)
  .add(Actions.clear, dtf.clear)
  .add(Actions.editVariable, dtf.removeVariable)
  .add(Actions.toggleColumn, dtf.toggleColumn)
  .add(Actions.updateTrueResult, dtf.updateTrueResult)
  .add(Actions.updateFalseResult, dtf.updateFalseResult).reducerMap;

const reducer = handleActions<DecisionTableState, DecisionTableState>(
  reducerMap,
  new DecisionTableState()
);

export default reducer;
