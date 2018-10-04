import { IBoundary } from './IBoundary';
import { IDecisionVariable } from './IDecisionVariable/DecisionVariable';

export class DecisionTableState {
    public decisionVariables: IDecisionVariable[];
    public matrix: IBoundary[][];
    public columnsVisible: boolean[];
    constructor () { 
        this.decisionVariables = [];
        this.matrix = [];
        this.columnsVisible = [];
    }
}