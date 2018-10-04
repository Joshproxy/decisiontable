import { IBoundary } from '../IBoundary';
import { VariableType } from "../VariableType";

export interface IDecisionVariable {
    name: string;
    type: VariableType;
    trueValue: any;
    boundaries: IBoundary[];
    id: number;
}

export abstract class DecisionVariable<T> implements IDecisionVariable {    
    constructor(public id: number, public name: string, public type: VariableType, public trueValue: T, public boundaries: IBoundary[]) {}
}
