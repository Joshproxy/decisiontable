import { IDecisionVariable } from "./DecisionVariable";
import { IBoundary } from "./IBoundary";

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