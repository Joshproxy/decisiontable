import { DecisionTableStateFunctions } from 'src/models/DecisionTableStateFunctions';

import { IDecisionVariable } from '../models/IDecisionVariable/DecisionVariable';
import { AsynchronousActionDefinition } from './common/AsynchronousActionDefinition';
import { SynchronousActionDefinition } from './common/SynchronousActionDefinition';

const INITIAL_LOAD = "INITIAL_LOAD";
const ADD_VARIABLE = "ADD_VARIABLE";
const CLEAR = "CLEAR";
const EDIT_VARIABLE = "EDIT_VARIABLE";
const REMOVE_VARIABLE = "REMOVE_VARIABLE";
const TOGGLE_COLUMN = "TOGGLE_COLUMN";
const UPDATE_TRUE_RESULT = "UPDATE_TRUE_RESULT";
const UPDATE_FALSE_RESULT = "UPDATE_FALSE_RESULT";

export const initialLoad = new AsynchronousActionDefinition(
  INITIAL_LOAD,
  () => DecisionTableStateFunctions.loadData()
);

// tslint:disable-next-line:no-empty
export const addVariable = new SynchronousActionDefinition(ADD_VARIABLE);

export const clear = new SynchronousActionDefinition(CLEAR);

export const editVariable = new SynchronousActionDefinition(
  EDIT_VARIABLE,
  (variable: IDecisionVariable) => variable
);

export const removeVariable = new SynchronousActionDefinition(
  REMOVE_VARIABLE,
  (variableId: number) => variableId
);

export const toggleColumn = new SynchronousActionDefinition(
  TOGGLE_COLUMN,
  (columnIndex: number) => columnIndex
);

export const updateTrueResult = new SynchronousActionDefinition(
  UPDATE_TRUE_RESULT,
  (updatedResult: string) => updatedResult
);

export const updateFalseResult = new SynchronousActionDefinition(
  UPDATE_FALSE_RESULT,
  (updatedResult: string) => updatedResult
);
