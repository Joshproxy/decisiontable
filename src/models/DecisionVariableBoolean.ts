import { DecisionVariable } from "./DecisionVariable";
import { IBoundary } from "./IBoundary";
import { VariableType } from "./VariableType";

export class DecisionVariableBoolean extends DecisionVariable<boolean> {
    constructor(index: number, name: string) {
        super(index, name, VariableType.BOOLEAN, true);
        this.boundaries = this.getBoundaries();
    }
    private getBoundaries() {
        const list: IBoundary[] = [];
        list.push(
            { value: "T", outcome: true },
            { value: "F", outcome: false }
        );
        return list;
    };
}