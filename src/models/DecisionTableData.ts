import { IDecisionVariable } from "./DecisionVariable";
import { IBoundary } from "./IBoundary";

export class DecisionTableData {
    private decisionVariables: IDecisionVariable[];

    public AddVariable = (variable: IDecisionVariable) => {
        this.decisionVariables.push(variable);
    }

    get variableNames(): string[] {
        return this.decisionVariables.map(v => v.name);
    }

    get columnCount(): number {
        let count = 0;
        this.decisionVariables.forEach(v => count = v.boundaries.length * count);
        return count;
    }

    public getMatrix(): IBoundary[][] {        
        const matrix: IBoundary[][] = [];
        const columnCount = this.columnCount;
        let count = 0;
        this.decisionVariables.forEach((v, ri) => {
            const row: IBoundary[] = [];
            for (let ci = 0; ci < columnCount; ci++) {
                const boundaryIndex = (ri === 0) ? ci % 2 : Math.floor(count/(ri*2)) % 2;
                row.push(v.boundaries[boundaryIndex]);
                count++;
            }
            matrix.push(row);
        });
        return matrix;
    }
}