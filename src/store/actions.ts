import { createAction } from 'redux-actions';

import { IDecisionVariable } from '../models/IDecisionVariable/DecisionVariable';

export const ADD_VARIABLE = "ADD_VARIABLE";
export const CLEAR = "CLEAR";
export const EDIT_VARIABLE = "EDIT_VARIABLE";
export const REMOVE_VARIABLE = "REMOVE_VARIABLE";
export const TOGGLE_COLUMN = "TOGGLE_COLUMN";
export const UPDATE_TRUE_RESULT = "UPDATE_TRUE_RESULT";
export const UPDATE_FALSE_RESULT = "UPDATE_FALSE_RESULT";

export type ADD_VARIABLE = typeof ADD_VARIABLE;
export type CLEAR = typeof CLEAR;
export type EDIT_VARIABLE = typeof EDIT_VARIABLE;
export type REMOVE_VARIABLE = typeof REMOVE_VARIABLE;
export type TOGGLE_COLUMN = typeof TOGGLE_COLUMN;
export type UPDATE_TRUE_RESULT = typeof UPDATE_TRUE_RESULT;
export type UPDATE_FALSE_RESULT = typeof UPDATE_FALSE_RESULT;

export const addVariable = createAction<void>(
  ADD_VARIABLE,
  // tslint:disable-next-line:no-empty
  () => {}
);

export const clear = createAction<void>(
  CLEAR,
  // tslint:disable-next-line:no-empty
  () => {}
);

export const editVariable = createAction<IDecisionVariable, IDecisionVariable>(
  EDIT_VARIABLE,
  (variable: IDecisionVariable) => ({ ...variable })
);

export const removeVariable = createAction<number, number>(
  REMOVE_VARIABLE,
  (variableId: number) => variableId
);

export const toggleColumn = createAction<number, number>(
  TOGGLE_COLUMN,
  (columnIndex: number) => columnIndex
);

export const updateTrueResult = createAction<string, string>(
  UPDATE_TRUE_RESULT,
  (updatedResult: string) => updatedResult
);

export const updateFalseResult = createAction<string, string>(
  UPDATE_FALSE_RESULT,
  (updatedResult: string) => updatedResult
);
