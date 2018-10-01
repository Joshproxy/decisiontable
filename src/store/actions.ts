import { createAction } from "redux-actions";
import { IDecisionVariable } from "../models/DecisionVariable";
import { DecisionVariableBoolean } from "../models/DecisionVariableBoolean";

export const ADD_VARIABLE = "ADD_VARIABLE";
export const CLEAR = "CLEAR";
export const EDIT_VARIABLE = "EDIT_VARIABLE";
export const REMOVE_VARIABLE = "REMOVE_VARIABLE";
export const TOGGLE_COLUMN = "TOGGLE_COLUMN";

export type ADD_VARIABLE = typeof ADD_VARIABLE;
export type CLEAR = typeof CLEAR;
export type EDIT_VARIABLE = typeof EDIT_VARIABLE;
export type REMOVE_VARIABLE = typeof REMOVE_VARIABLE;
export type TOGGLE_COLUMN = typeof TOGGLE_COLUMN;

export const addVariable = createAction<IDecisionVariable, number>(
    ADD_VARIABLE,
    (index: number) =>  new DecisionVariableBoolean(index, String.fromCharCode('A'.charCodeAt(0) + index))
)

export const clear = createAction<void>(
    CLEAR,
    // tslint:disable-next-line:no-empty
    () => { }
)

export const editVariable = createAction<IDecisionVariable, IDecisionVariable>(
    EDIT_VARIABLE,
    (variable: IDecisionVariable) =>  ({ ...variable })
)

export const removeVariable = createAction<IDecisionVariable, IDecisionVariable>(
    REMOVE_VARIABLE,
    (variable: IDecisionVariable) =>  ({ ...variable })
)

export const toggleColumn = createAction<number, number>(
    TOGGLE_COLUMN,
    (columnIndex: number) => columnIndex
)