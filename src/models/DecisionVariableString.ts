import { DecisionVariable } from "./DecisionVariable";
import { IBoundary } from "./IBoundary";
import { VariableType } from "./VariableType";

export class DecisionVariableString extends DecisionVariable<string> {
    constructor(name: string, trueValue: string) {
        super(name, VariableType.STRING, trueValue);
    }
    get boundaries() {
        const list: IBoundary[] = [];
        list.push(
            { value: this.trueValue, outcome: true },
            { value: "!" + this.trueValue, outcome: false }
        );
        return list;
    };
}