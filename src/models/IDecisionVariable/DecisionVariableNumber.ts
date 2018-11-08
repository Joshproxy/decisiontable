import { computed } from 'mobx';

import { IBoundary } from '../IBoundary';
import { VariableType } from '../VariableType';
import { DecisionVariable } from './DecisionVariable';

export class DecisionVariableNumber extends DecisionVariable<number> {
  public static getBoundaries = (trueValue: number) => {
    const list: IBoundary[] = [];
    list.push(
      { value: trueValue.toString(), outcome: true },
      { value: "!" + trueValue.toString(), outcome: false }
    );
    return list;
  };
  public static updateValue = (
    current: DecisionVariableNumber,
    newValue: number
  ) => {
    return new DecisionVariableNumber(current.id, current.name, newValue);
  };
  constructor(index: number, name: string, trueValue: number) {
    super(
      index,
      name,
      VariableType.NUMBER,
      trueValue,
      DecisionVariableNumber.getBoundaries(trueValue)
    );
  }
  @computed get boundaries() {
    return DecisionVariableNumber.getBoundaries(this.trueValue);
  }
}
