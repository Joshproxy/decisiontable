import produce from 'immer';

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
  public static merge = produce<DecisionTableState, DecisionTableState>(
    (draft: DecisionTableState, toMerge: DecisionTableState) => {
      draft.decisionVariables = toMerge.decisionVariables;
      draft.columnsVisible = toMerge.columnsVisible;
      draft.trueResult = toMerge.trueResult;
      draft.falseResult = toMerge.falseResult;
    }
  );

  public static loading = produce<DecisionTableState, DecisionTableState>(
    (draft: DecisionTableState) => {
      draft.decisionVariables = [];
      draft.columnsVisible = [];
      draft.trueResult = 'Loading';
      draft.falseResult = 'Loading';
    }
  );

  public static error = produce<DecisionTableState, any>(
    (draft: DecisionTableState, error: any) => {
      // tslint:disable-next-line:no-console
      console.error(error);
    }
  );

  // tslint:disable-next-line:member-ordering
  public static editVariable = produce<DecisionTableState, IDecisionVariable>(
    (draft: DecisionTableState, editedVariable: IDecisionVariable) => {
      draft.decisionVariables = draft.decisionVariables.map(v => {
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

      draft.matrix = DecisionTableStateFunctions.createMatrix(
        draft.decisionVariables
      );
      draft.columnsVisible = draft.matrix[0].map(() => true);
    }
  );

  // tslint:disable-next-line:member-ordering
  public static addVariable = produce<DecisionTableState>(
    (draft: DecisionTableState) => {
      const newId = DecisionTableStateFunctions.nextId(draft.decisionVariables);
      draft.decisionVariables.push(
        new DecisionVariableBoolean(
          newId,
          String.fromCharCode("A".charCodeAt(0) + newId)
        )
      );
      draft.matrix = DecisionTableStateFunctions.createMatrix(
        draft.decisionVariables
      );
      draft.columnsVisible = draft.matrix[0].map(() => true);
    }
  );

  // tslint:disable-next-line:member-ordering
  public static removeVariable = produce<DecisionTableState>(
    (draft: DecisionTableState, variableId: number) => {
      const removeIndex = draft.decisionVariables.findIndex(
        d => d.id === variableId
      );
      draft.decisionVariables.splice(removeIndex, 1);
      draft.matrix = DecisionTableStateFunctions.createMatrix(
        draft.decisionVariables
      );
      draft.columnsVisible =
        draft.matrix.length > 0 ? draft.matrix[0].map(() => true) : [];
    }
  );

  // tslint:disable-next-line:member-ordering
  public static clear = produce<DecisionTableState>(
    (draft: DecisionTableState) => {
      draft.columnsVisible = [];
      draft.decisionVariables = [];
      draft.matrix = [];
    }
  );

  // tslint:disable-next-line:member-ordering
  public static toggleColumn = produce<DecisionTableState>(
    (draft: DecisionTableState, columnIndex: number) => {
      draft.columnsVisible[columnIndex] = !draft.columnsVisible[columnIndex];
    }
  );

  // tslint:disable-next-line:member-ordering
  public static updateTrueResult = produce<DecisionTableState>(
    (draft: DecisionTableState, updatedResult: string) => {
      draft.trueResult = updatedResult;
    }
  );

  // tslint:disable-next-line:member-ordering
  public static updateFalseResult = produce<DecisionTableState>(
    (draft: DecisionTableState, updatedResult: string) => {
      draft.falseResult = updatedResult;
    }
  );

  public static variableNames(vars: IDecisionVariable[]): string[] {
    return vars.map(v => v.name);
  }

  public static columnCount(vars: IDecisionVariable[]): number {
    let count = 1;
    vars.forEach(v => (count = v.boundaries.length * count));
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
        const boundaryIndex =
          ri === 0
            ? ci % v.boundaries.length
            : Math.floor(count / powFactor) % v.boundaries.length;
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
          decisionVariables: [],
          falseResult: "Rejected",
          trueResult: "Passed"
        } as DecisionTableState)
      );
    }
    return new Promise<DecisionTableState>(resolve =>
      setTimeout(resolve, 200, state)
    );
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

  public static toJson = (state: DecisionTableState): string => {
    const target = { ...state, matrix: [] };
    return JSON.stringify(target);
  };

  public static fromJson = (jsonState: string): DecisionTableState | null => {
    const state = JSON.parse(jsonState) as DecisionTableState;
    state.matrix = DecisionTableStateFunctions.createMatrix(
      state.decisionVariables
    );
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
