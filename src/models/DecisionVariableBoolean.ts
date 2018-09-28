import { DecisionVariable } from "./DecisionVariable";
import { IBoundary } from "./IBoundary";
import { VariableType } from "./VariableType";

export class DecisionVariableBoolean extends DecisionVariable<boolean> {
    constructor(name: string) {
        super(name, VariableType.BOOLEAN, true);
    }
    get boundaries() {
        const list: IBoundary[] = [];
        list.push(
            { value: "T", outcome: true },
            { value: "F", outcome: false }
        );
        return list;
    };
}