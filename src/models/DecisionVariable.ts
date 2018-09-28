import { IBoundary } from './IBoundary';
import { VariableType } from "./VariableType";

export interface IDecisionVariable {
    name: string;
    type: VariableType;
    trueValue: any;
    boundaries: IBoundary[];
}

export abstract class DecisionVariable<T> implements IDecisionVariable {
    constructor(public name: string, public type: VariableType, public trueValue: T) { }
    public abstract get boundaries(): IBoundary[]
}
