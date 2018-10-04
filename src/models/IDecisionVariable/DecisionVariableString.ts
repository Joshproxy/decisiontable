import { IBoundary } from '../IBoundary';
import { VariableType } from '../VariableType';
import { DecisionVariable } from './DecisionVariable';

export class DecisionVariableString extends DecisionVariable<string> {
    public static getBoundaries = (trueValue: string) => {
        const list: IBoundary[] = [];
        list.push(
            { value: "'" + trueValue + "'", outcome: true },
            { value: "'!" + trueValue + "'", outcome: false }
        );
        return list;
    };
    public static updateValue = (current: DecisionVariableString, newValue: string) => {
        return new DecisionVariableString(current.id, current.name, newValue);
    }
    constructor(index: number, name: string, trueValue: string) {
        super(index, name, VariableType.STRING, trueValue, DecisionVariableString.getBoundaries(trueValue));
    }
}