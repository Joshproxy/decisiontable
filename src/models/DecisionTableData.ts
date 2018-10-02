import { IDecisionVariable } from "./DecisionVariable";
import { IBoundary } from "./IBoundary";

export class DecisionTableData {

    public static variableNames(vars: IDecisionVariable[]): string[] {
        return vars.map(v => v.name);
    }

    public static columnCount(vars: IDecisionVariable[]): number {
        let count = 1;
        vars.forEach(v => count = v.boundaries.length * count);
        return count;
    }

    public static createMatrix(vars: IDecisionVariable[]): IBoundary[][] {
        const matrix: IBoundary[][] = [];
        const columnCount = DecisionTableData.columnCount(vars);
        let maxVariableBoundaryCount = 2;
        let minVariableBoundaryCount = 4;
        vars.forEach(v => {
            maxVariableBoundaryCount = (maxVariableBoundaryCount < v.boundaries.length) ? 
                v.boundaries.length : maxVariableBoundaryCount;
            minVariableBoundaryCount = (minVariableBoundaryCount > v.boundaries.length) ? 
                v.boundaries.length : minVariableBoundaryCount;
        });
        let count = 0;
        vars.forEach((v, ri) => {
            const row: IBoundary[] = [];
            for (let ci = 0; ci < columnCount; ci++) {
                const powFactor = (v.boundaries.length === 4) ? minVariableBoundaryCount : maxVariableBoundaryCount;
                const boundaryIndex = (ri === 0) ?
                    ci % v.boundaries.length :
                    Math.floor(count / Math.pow(powFactor, ri)) % v.boundaries.length;
                row.push(v.boundaries[boundaryIndex]);
                count++;
            }
            matrix.push(row);
        });
        return matrix;
    }
}