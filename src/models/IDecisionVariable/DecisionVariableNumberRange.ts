import { computed } from 'mobx';

import { IBoundary } from '../IBoundary';
import { NumberRange } from '../NumberRange';
import { VariableType } from '../VariableType';
import { DecisionVariable } from './DecisionVariable';

export class DecisionVariableNumberRange extends DecisionVariable<NumberRange> {
    public static getBoundaries = (valueRange: NumberRange) => {
        const list: IBoundary[] = [];
        const toBoundary = (v: number, o: boolean): IBoundary => {
            return { value: v.toString(), outcome: o };
        }
        list.push(
            toBoundary(valueRange.min - 1, false),
            toBoundary(valueRange.min, true),
            toBoundary(valueRange.max, true),
            toBoundary(valueRange.max + 1, false));
        return list;
    };
    public static updateMinValue = (current: DecisionVariableNumberRange, newMinValue: number) => {
        return new DecisionVariableNumberRange(current.id, current.name, newMinValue, current.trueValue.max);
    }
    public static updateMaxValue = (current: DecisionVariableNumberRange, newMaxValue: number) => {
        return new DecisionVariableNumberRange(current.id, current.name, current.trueValue.min, newMaxValue);
    }
    constructor(index: number, name: string, minValue: number = 1, maxValue: number = 9) {
        super(index, name, VariableType.NUMBER_RANGE, new NumberRange(minValue, maxValue), DecisionVariableNumberRange.getBoundaries(new NumberRange(minValue, maxValue)));
    }
    @computed get boundaries() {
        return DecisionVariableNumberRange.getBoundaries(this.trueValue);
    }
}