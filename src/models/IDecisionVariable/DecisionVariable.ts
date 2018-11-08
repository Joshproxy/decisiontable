import { observable } from 'mobx';

import { IBoundary } from '../IBoundary';
import { VariableType } from '../VariableType';

export interface IDecisionVariable {
    name: string;
    type: VariableType;
    trueValue: any;    
    id: number;
    boundaries: IBoundary[];
}

export abstract class DecisionVariable<T> implements IDecisionVariable {  
    public id: number;     
    public type: VariableType;
    @observable public name: string;
    @observable public trueValue: any;         
    constructor(id: number, name: string, type: VariableType, trueValue: T, boundaries: IBoundary[]) {
        this.id = id;
        this.type = type;
        this.name = name;
        this.trueValue = trueValue;
    }

    abstract get boundaries(): IBoundary[];
}
