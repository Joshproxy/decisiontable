import { computed } from 'mobx';

import { IBoundary } from '../IBoundary';
import { VariableType } from '../VariableType';
import { DecisionVariable } from './DecisionVariable';

export class DecisionVariableBoolean extends DecisionVariable<boolean> {
    public static getBoundaries = () => {
        const list: IBoundary[] = [];
        list.push(
            { value: "T", outcome: true },
            { value: "F", outcome: false }
        );
        return list;
    };    
    constructor(index: number, name: string) {
        super(index, name, VariableType.BOOLEAN, true, DecisionVariableBoolean.getBoundaries());
    }
    @computed get boundaries() {
        return DecisionVariableBoolean.getBoundaries();
    }
}