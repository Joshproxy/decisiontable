import { DecisionVariable } from "./DecisionVariable";
import { IBoundary } from "./IBoundary";
import { VariableType } from "./VariableType";

export class DecisionVariableNumber extends DecisionVariable<number> {
    public static getBoundaries = (trueValue: number) => {
        const list: IBoundary[] = [];
        list.push(
            { value: trueValue.toString(), outcome: true },
            { value: "!" + trueValue.toString(), outcome: false }
        );
        return list;
    };
    public static updateValue = (current: DecisionVariableNumber, newValue: number) => {
        return new DecisionVariableNumber(current.index, current.name, newValue);
    }
    constructor(index: number, name: string, trueValue: number) {
        super(index, name, VariableType.NUMBER, trueValue, DecisionVariableNumber.getBoundaries(trueValue));
    }
}