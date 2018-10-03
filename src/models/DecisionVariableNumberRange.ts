import { DecisionVariable } from "./DecisionVariable";
import { IBoundary } from "./IBoundary";
import { NumberRange } from "./NumberRange";
import { VariableType } from "./VariableType";

export class DecisionVariableNumberRange extends DecisionVariable<NumberRange> {
    public static getBoundaries = (min: number, max: number) => {
        const list: IBoundary[] = [];
        const toBoundary = (v: number, o: boolean): IBoundary => {
            return { value: v.toString(), outcome: o };
        }
        list.push(
            toBoundary(min - 1, false),
            toBoundary(min, true),
            toBoundary(max, true),
            toBoundary(max + 1, false));
        return list;
    };
    public static updateMinValue = (current: DecisionVariableNumberRange, newMinValue: number) => {
        return new DecisionVariableNumberRange(current.id, current.name, newMinValue, current.trueValue.max);
    }
    public static updateMaxValue = (current: DecisionVariableNumberRange, newMaxValue: number) => {
        return new DecisionVariableNumberRange(current.id, current.name, current.trueValue.min, newMaxValue);
    }
    constructor(index: number, name: string, minValue: number = 1, maxValue: number = 999) {
        super(index, name, VariableType.NUMBER_RANGE, new NumberRange(minValue, maxValue), DecisionVariableNumberRange.getBoundaries(minValue, maxValue));
    }
}