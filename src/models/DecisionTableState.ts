import { IBoundary } from './IBoundary';
import { IDecisionVariable } from './IDecisionVariable/DecisionVariable';

export class DecisionTableState { 
  public decisionVariables: IDecisionVariable[];
  public matrix: IBoundary[][];
  public columnsVisible: boolean[];
  public trueResult: string;
  public falseResult: string;
  constructor() {
    this.decisionVariables = [];
    this.matrix = [];
    this.columnsVisible = [];
    this.trueResult = "T";
    this.falseResult = "F";
  }
}
