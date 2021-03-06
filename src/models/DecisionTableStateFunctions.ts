import { DecisionTableState } from './DecisionTableState';
import { IBoundary } from './IBoundary';
import { IDecisionVariable } from './IDecisionVariable/DecisionVariable';
import { DecisionVariableBoolean } from './IDecisionVariable/DecisionVariableBoolean';
import { DecisionVariableNumber } from './IDecisionVariable/DecisionVariableNumber';
import { DecisionVariableNumberRange } from './IDecisionVariable/DecisionVariableNumberRange';
import { DecisionVariableString } from './IDecisionVariable/DecisionVariableString';
import { NumberRange } from './NumberRange';
import { VariableType } from './VariableType';

export class DecisionTableStateFunctions {

  public static variableNames(vars: IDecisionVariable[]): string[] {
    return vars.map(v => v.name);
}

public static columnCount(vars: IDecisionVariable[]): number {
    let count = 1;
    vars.forEach(v => count = v.boundaries.length * count);
    return count;
}

public static createMatrix(vars: IDecisionVariable[]): IBoundary[][] {
    const matrix: IBoundary[][] = [];
    const columnCount = DecisionTableStateFunctions.columnCount(vars);
    let powFactor = 1;
    let count = 0;
    vars.forEach((v, ri) => {
        const row: IBoundary[] = [];            
        for (let ci = 0; ci < columnCount; ci++) {                
            const boundaryIndex = (ri === 0) ?
                ci % v.boundaries.length :
                Math.floor(count / powFactor) % v.boundaries.length;
            row.push(v.boundaries[boundaryIndex]);
            
            count++;
        }            
        matrix.push(row);
        powFactor = powFactor * v.boundaries.length;
    });
    return matrix;
}

  public static loadData = (): Promise<DecisionTableState> => {
    let state: DecisionTableState | null = null;
    try {
      state = DecisionTableStateFunctions.fromUrlEncodedJson(
        window.location.hash.substr(1)
      );
    } catch (err) {
      // tslint:disable-next-line:no-console
      console.error(err);
      state = null;
    }

    if (state === null) {
      state = DecisionTableStateFunctions.addVariable(
        DecisionTableStateFunctions.addVariable({
          ...new DecisionTableState(),
          falseResult: "Rejected",
          trueResult: "Passed"
        })
      );
    }
    return new Promise<DecisionTableState>(resolve =>
      setTimeout(resolve, 200, state)
    );
  };

  public static editVariable = (
    state: DecisionTableState,
    editedVariable: IDecisionVariable
  ): DecisionTableState => {
    const decisionVariables = state.decisionVariables.map(v => {
      if (v.id === editedVariable.id) {
        editedVariable =
          v.type === editedVariable.type
            ? editedVariable
            : DecisionTableStateFunctions.changeVariableType(
                editedVariable,
                editedVariable.type
              );
        editedVariable.boundaries = DecisionTableStateFunctions.getBoundaryCreator(
          editedVariable.type
        )(editedVariable.trueValue);
        return editedVariable;
      } else {
        return v;
      }
    });
    const matrix = DecisionTableStateFunctions.createMatrix(decisionVariables);
    const columnsVisible = matrix[0].map(() => true);
    return { ...state, decisionVariables, matrix, columnsVisible };
  };

  public static changeVariableType = (
    variable: IDecisionVariable,
    newType: VariableType
  ) => {
    let newVariableType: IDecisionVariable;

    switch (newType) {
      case VariableType.BOOLEAN:
        newVariableType = new DecisionVariableBoolean(
          variable.id,
          variable.name
        );
        break;
      case VariableType.STRING:
        newVariableType = new DecisionVariableString(
          variable.id,
          variable.name,
          ""
        );
        break;
      case VariableType.NUMBER:
        newVariableType = new DecisionVariableNumber(
          variable.id,
          variable.name,
          1
        );
        break;
      case VariableType.NUMBER_RANGE:
        newVariableType = new DecisionVariableNumberRange(
          variable.id,
          variable.name
        );
        break;
      default:
        newVariableType = new DecisionVariableBoolean(
          variable.id,
          variable.name
        );
    }
    return newVariableType;
  };

  public static addVariable = (
    state: DecisionTableState
  ): DecisionTableState => {
    const newId = DecisionTableStateFunctions.nextId(state.decisionVariables);
    const newVariable = new DecisionVariableBoolean(
      newId,
      String.fromCharCode("A".charCodeAt(0) + newId)
    );
    const decisionVariables = [...state.decisionVariables, newVariable];
    const matrix = DecisionTableStateFunctions.createMatrix(decisionVariables);
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
    const matrix = DecisionTableStateFunctions.createMatrix(decisionVariables);
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

  public static runIfVariable = (
    state: DecisionTableState,
    variableId: number,
    toRun: (variable: IDecisionVariable) => void
  ) => {
    const variable = DecisionTableStateFunctions.getVariable(state, variableId);
    if (variable) {
      toRun(variable);
    }
  };

  public static updateTrueResult = (
    state: DecisionTableState,
    updatedResult: string
  ): DecisionTableState => {
    return { ...state, trueResult: updatedResult };
  };

  public static updateFalseResult = (
    state: DecisionTableState,
    updatedResult: string
  ): DecisionTableState => {
    return { ...state, falseResult: updatedResult };
  };

  public static toJson = (state: DecisionTableState): string => {
    const target = { ...state, matrix: [] };
    return JSON.stringify(target);
  };

  public static fromJson = (jsonState: string): DecisionTableState | null => {
    const state = JSON.parse(jsonState) as DecisionTableState;
    state.matrix = DecisionTableStateFunctions.createMatrix(state.decisionVariables);
    return state.decisionVariables ? state : null;
  };

  public static toUrlEncodedJson = (state: DecisionTableState): string => {
    return encodeURI(DecisionTableStateFunctions.toJson(state));
  };

  public static fromUrlEncodedJson = (
    urlEncodedJsonState: string
  ): DecisionTableState | null => {
    return DecisionTableStateFunctions.fromJson(decodeURI(urlEncodedJsonState));
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

  private static getVariable = (
    state: DecisionTableState,
    variableId: number
  ): IDecisionVariable | undefined => {
    return state.decisionVariables.find(v => v.id === variableId);
  };
}
