import { IBoundary } from './IBoundary';
import { VariableType } from "./VariableType";

export interface IDecisionVariable {
    name: string;
    type: VariableType;
    trueValue: any;
    boundaries: IBoundary[];
    index: number;
}

export abstract class DecisionVariable<T> implements IDecisionVariable {
    public boundaries: IBoundary[] = [];
    constructor(public index: number, public name: string, public type: VariableType, public trueValue: T) {}
}
