import { DecisionVariable } from "./DecisionVariable";
import { IBoundary } from "./IBoundary";
import { VariableType } from "./VariableType";

export class DecisionVariableNumber extends DecisionVariable<number> {
    constructor(name: string, trueValue: number) {
        super(name, VariableType.NUMBER, trueValue);
    }
    get boundaries() {
        const list: IBoundary[] = [];
        list.push(
            { value: this.trueValue.toString(), outcome: true },
            { value: "!" + this.trueValue.toString(), outcome: false }
        );
        return list;
    };
}