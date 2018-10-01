import { DecisionVariable } from "./DecisionVariable";
import { IBoundary } from "./IBoundary";
import { VariableType } from "./VariableType";

export class DecisionVariableNumber extends DecisionVariable<number> {
    constructor(index: number, name: string, trueValue: number) {
        super(index, name, VariableType.NUMBER, trueValue);
        this.boundaries = this.getBoundaries();
    }
    private getBoundaries() {
        const list: IBoundary[] = [];
        list.push(
            { value: this.trueValue.toString(), outcome: true },
            { value: "!" + this.trueValue.toString(), outcome: false }
        );
        return list;
    };
}