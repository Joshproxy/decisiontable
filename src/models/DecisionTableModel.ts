import { computed, observable, toJS } from 'mobx';

import { IBoundary } from './IBoundary';
import { IDecisionVariable } from './IDecisionVariable/DecisionVariable';
import { DecisionVariableBoolean } from './IDecisionVariable/DecisionVariableBoolean';
import { DecisionVariableNumber } from './IDecisionVariable/DecisionVariableNumber';
import { DecisionVariableNumberRange } from './IDecisionVariable/DecisionVariableNumberRange';
import { DecisionVariableString } from './IDecisionVariable/DecisionVariableString';
import { VariableType } from './VariableType';

export class DecisionTableModel {
  public static loadData = (): Promise<DecisionTableModel> => {
    let state: DecisionTableModel | null = null;
    try {
      state = DecisionTableModel.fromUrlEncodedJson(
        window.location.hash.substr(1)
      );
    } catch (err) {
      // tslint:disable-next-line:no-console
      console.error(err);
      state = null;
    }

    if (state === null) {
      state = new DecisionTableModel();
    }
    return new Promise<DecisionTableModel>(resolve =>
      setTimeout(resolve, 200, state)
    );
  };

  public static fromJson = (jsonState: string): DecisionTableModel | null => {
    let state: DecisionTableModel | null = null; 
    try {
      state = JSON.parse(jsonState) as DecisionTableModel;    
      state.decisionVariables = state.decisionVariables.map(v => {
        const converted = DecisionTableModel.changeVariableType(v, v.type); 
        converted.trueValue = v.trueValue;
        return converted;
      });
    } catch {
      state = null;
     }
    return state;
  };

  public static fromUrlEncodedJson = (
    urlEncodedJsonState: string
  ): DecisionTableModel | null => {
    return DecisionTableModel.fromJson(decodeURI(urlEncodedJsonState));
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

  @observable public decisionVariables: IDecisionVariable[];  
  @observable public columnsVisible: boolean[];
  @observable public trueResult: string;
  @observable public falseResult: string;

  constructor() {
    this.decisionVariables = [];    
    this.columnsVisible = [];
    this.trueResult = "T";
    this.falseResult = "F";
  }

  @computed get columnCount(): number {
    let count = 1;
    this.decisionVariables.forEach(v => (count = v.boundaries.length * count));
    return count;
  }

  @computed get variableNames(): string[] {
    return this.decisionVariables.map(v => v.name);
  }

  @computed get matrix(): IBoundary[][] {
    const matrix: IBoundary[][] = [];
    let powFactor = 1;
    let count = 0;
    this.decisionVariables.forEach((v, ri) => {
      const row: IBoundary[] = [];
      for (let ci = 0; ci < this.columnCount; ci++) {
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

  public addVariable = (): DecisionTableModel => {
    const newId = this.getNextDecisionVariableId();
    const newVariable = new DecisionVariableBoolean(
      newId,
      String.fromCharCode("A".charCodeAt(0) + newId)
    );
    this.decisionVariables.push(newVariable);
    // set every column to true
    this.updateColumnsVisible();
    return this;
  };

  public removeVariable = (variableId: number) => {   
    const removeIndex = this.decisionVariables.findIndex(d => d.id === variableId);
    this.decisionVariables.splice(removeIndex, 1);
    this.updateColumnsVisible();
    return this;
  };

  public clear = () => {
    this.decisionVariables = [];
    this.trueResult = "T";
    this.falseResult = "F";
    this.updateColumnsVisible();
  };

  public toggleColumn = (columnIndex: number): DecisionTableModel => {
    this.columnsVisible[columnIndex] = !this.columnsVisible[columnIndex];
    return this;
  };

  public updateTrueResult = (updatedResult: string): DecisionTableModel => {
    this.trueResult = updatedResult;
    return this;
  };

  public updateFalseResult = (updatedResult: string): DecisionTableModel => {
    this.falseResult = updatedResult;
    return this;
  };

  public toJson = (): string => {
    const target = { ...(toJS(this) as object), matrix: [] };
    return JSON.stringify(target);
  };

  public toUrlEncodedJson = (): string => {
    return encodeURI(this.toJson());
  };
  
  private getNextDecisionVariableId(): number {
    return (this.decisionVariables.length > 0)
      ? this.decisionVariables[this.decisionVariables.length - 1].id + 1
      : 0;
  }
  
  private updateColumnsVisible = () => {
    this.columnsVisible = this.matrix.length > 0 ? this.matrix[0].map(() => true) : [];
  }

}
