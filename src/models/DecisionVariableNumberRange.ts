import { DecisionVariable } from "./DecisionVariable";
import { IBoundary } from "./IBoundary";
import { NumberRange } from "./NumberRange";
import { VariableType } from "./VariableType";

export class DecisionVariableNumberRange extends DecisionVariable<NumberRange> {
    constructor(name: string, minValue: number = 1, maxValue: number = 999) {
        super(name, VariableType.NUMBER_RANGE, new NumberRange(minValue, maxValue));
    }
    get boundaries () {
        const list: IBoundary[] = [];
        const toBoundary = (v: number, o: boolean): IBoundary => {
            return { value: v.toString(), outcome: o };
        }
        list.push(
            toBoundary(this.trueValue.min - 1, false),
            toBoundary(this.trueValue.min, true),
            toBoundary(this.trueValue.max, true),
            toBoundary(this.trueValue.max + 1, false));
        return list;
    };
}