import { DecisionVariable } from "./DecisionVariable";
import { IBoundary } from "./IBoundary";
import { VariableType } from "./VariableType";

export class DecisionVariableString extends DecisionVariable<string> {
    constructor(index: number, name: string, trueValue: string) {
        super(index, name, VariableType.STRING, trueValue);
        this.boundaries = this.getBoundaries();
    }
    private getBoundaries() {
        const list: IBoundary[] = [];
        list.push(
            { value: this.trueValue, outcome: true },
            { value: "!" + this.trueValue, outcome: false }
        );
        return list;
    };
}