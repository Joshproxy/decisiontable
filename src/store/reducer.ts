import { Action, handleActions, ReducerMap } from 'redux-actions';

import { DecisionTableData } from '../models/DecisionTableData';
import { DecisionTableState } from '../models/DecisionTableState';
import { IBoundary } from '../models/IBoundary';
import { IDecisionVariable } from '../models/IDecisionVariable/DecisionVariable';
import { DecisionVariableBoolean } from '../models/IDecisionVariable/DecisionVariableBoolean';
import { DecisionVariableNumber } from '../models/IDecisionVariable/DecisionVariableNumber';
import {
    DecisionVariableNumberRange
} from '../models/IDecisionVariable/DecisionVariableNumberRange';
import { DecisionVariableString } from '../models/IDecisionVariable/DecisionVariableString';
import { NumberRange } from '../models/NumberRange';
import { VariableType } from '../models/VariableType';
import {
    ADD_VARIABLE, CHANGE_VARIABLE_TYPE, CLEAR, EDIT_VARIABLE, REMOVE_VARIABLE, TOGGLE_COLUMN
} from './actions';

export class StateFunctions {
  public static editVariable = (
    state: DecisionTableState,
    editedVariable: IDecisionVariable
  ): DecisionTableState => {
    editedVariable.boundaries = StateFunctions.getBoundaryCreator(
      editedVariable.type
    )(editedVariable.trueValue);
    const decisionVariables = state.decisionVariables.map(v => {
      if (v.id === editedVariable.id) {
        return editedVariable;
      } else {
        return v;
      }
    });
    const matrix = DecisionTableData.createMatrix(decisionVariables);
    const columnsVisible = matrix[0].map(() => true);
    return { ...state, decisionVariables, matrix, columnsVisible };
  };

  public static addVariable = (
    state: DecisionTableState
  ): DecisionTableState => {
    const newId = StateFunctions.nextId(state.decisionVariables);
    const newVariable = new DecisionVariableBoolean(
      newId,
      String.fromCharCode("A".charCodeAt(0) + newId)
    );
    const decisionVariables = [...state.decisionVariables, newVariable];
    const matrix = DecisionTableData.createMatrix(decisionVariables);
    const columnsVisible = matrix[0].map(() => true);
    return { ...state, decisionVariables, matrix, columnsVisible };
  };

  public static removeVariable = (
    state: DecisionTableState,
    variableId: number
  ) => {
    const decisionVariables = [...state.decisionVariables];
    const removeIndex = decisionVariables.findIndex(d => d.id === variableId);
    decisionVariables.splice(removeIndex, 1);
    const matrix = DecisionTableData.createMatrix(decisionVariables);
    const columnsVisible = matrix.length > 0 ? matrix[0].map(() => true) : [];
    return { ...state, decisionVariables, matrix, columnsVisible };
  };

  public static clear = (state: DecisionTableState): DecisionTableState => ({
    ...state,
    columnsVisible: [],
    decisionVariables: [],
    matrix: []
  });

  public static toggleColumn = (
    state: DecisionTableState,
    columnIndex: number
  ): DecisionTableState => {
    const columnsVisible = state.columnsVisible;
    columnsVisible[columnIndex] = !columnsVisible[columnIndex];
    return { ...state, columnsVisible };
  };

  private static nextId = (vars: IDecisionVariable[]) => {
    return vars.length > 0 ? vars[vars.length - 1].id + 1 : 0;
  };

  private static getBoundaryCreator = (
    type: VariableType
  ): ((trueValue: string | number | NumberRange) => IBoundary[]) => {
    switch (type) {
      case VariableType.STRING:
        return DecisionVariableString.getBoundaries;
      case VariableType.NUMBER:
        return DecisionVariableNumber.getBoundaries;
      case VariableType.NUMBER_RANGE:
        return DecisionVariableNumberRange.getBoundaries;
      default:
        return DecisionVariableBoolean.getBoundaries;
    }
  };
}
const reducerMap = {
  [ADD_VARIABLE]: (state: DecisionTableState): DecisionTableState => {
    return StateFunctions.addVariable(state);
  },
  [CLEAR]: (state: DecisionTableState): DecisionTableState => {
    return StateFunctions.clear(state);
  },
  [EDIT_VARIABLE]: (
    state: DecisionTableState,
    action: Action<IDecisionVariable>
  ): DecisionTableState => {
    return StateFunctions.editVariable(state, action.payload!);
  },
  [CHANGE_VARIABLE_TYPE]: (
    state: DecisionTableState,
    action: Action<IDecisionVariable>
  ): DecisionTableState => {
    return StateFunctions.editVariable(state, action.payload!);
  },
  [REMOVE_VARIABLE]: (
    state: DecisionTableState,
    action: Action<number>
  ): DecisionTableState => {
    return StateFunctions.removeVariable(state, action.payload!);
  },
  [TOGGLE_COLUMN]: (
    state: DecisionTableState,
    action: Action<number>
  ): DecisionTableState => {
    return StateFunctions.toggleColumn(state, action.payload!);
  }
} as ReducerMap<DecisionTableState, IDecisionVariable>;

const reducer = handleActions<DecisionTableState, IDecisionVariable>(
  reducerMap,
  new DecisionTableState()
);

export default reducer;
