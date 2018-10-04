import { createAction } from "redux-actions";
import { IDecisionVariable } from "../models/IDecisionVariable/DecisionVariable";
import { DecisionVariableBoolean } from "../models/IDecisionVariable/DecisionVariableBoolean";
import { DecisionVariableNumber } from "../models/IDecisionVariable/DecisionVariableNumber";
import { DecisionVariableNumberRange } from "../models/IDecisionVariable/DecisionVariableNumberRange";
import { DecisionVariableString } from "../models/IDecisionVariable/DecisionVariableString";
import { VariableType } from "../models/VariableType";

export const ADD_VARIABLE = "ADD_VARIABLE";
export const CLEAR = "CLEAR";
export const EDIT_VARIABLE = "EDIT_VARIABLE";
export const REMOVE_VARIABLE = "REMOVE_VARIABLE";
export const TOGGLE_COLUMN = "TOGGLE_COLUMN";
export const CHANGE_VARIABLE_TYPE = "CHANGE_VARIABLE_TYPE";

export type ADD_VARIABLE = typeof ADD_VARIABLE;
export type CLEAR = typeof CLEAR;
export type EDIT_VARIABLE = typeof EDIT_VARIABLE;
export type REMOVE_VARIABLE = typeof REMOVE_VARIABLE;
export type TOGGLE_COLUMN = typeof TOGGLE_COLUMN;
export type CHANGE_VARIABLE_TYPE = typeof CHANGE_VARIABLE_TYPE;

export const addVariable = createAction<void>(
    ADD_VARIABLE,
    // tslint:disable-next-line:no-empty
    () => { }
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

export const changeVariableType = createAction<IDecisionVariable, IDecisionVariable, VariableType>(
    CHANGE_VARIABLE_TYPE,
    (variable: IDecisionVariable, newType: VariableType) => {
        let newVariableType: IDecisionVariable;
      
      switch (newType) {
        case VariableType.BOOLEAN:
          newVariableType = new DecisionVariableBoolean(variable.id, variable.name);
          break;
        case VariableType.STRING:
          newVariableType = new DecisionVariableString(variable.id, variable.name, '');
          break;
        case VariableType.NUMBER:
          newVariableType = new DecisionVariableNumber(variable.id, variable.name, 1);
          break;
        case VariableType.NUMBER_RANGE:
          newVariableType = new DecisionVariableNumberRange(variable.id, variable.name);
          break;
        default:
          newVariableType = new DecisionVariableBoolean(variable.id, variable.name);
      }
      return newVariableType;
    }
)