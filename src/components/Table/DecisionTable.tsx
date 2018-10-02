import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { DecisionTableData } from '../../models/DecisionTableData';
import { DecisionTableState } from '../../models/DecisionTableState';
import { clear, toggleColumn } from '../../store/actions';
import { IAppStore } from '../../store/store';
import './DecisionTable.css';

interface IDecisionTableStateProps {
    data: DecisionTableState;
}

interface IDecisionTableDispatchProps {
    clear: () => void;
    toggleColumn: (columnIndex: number) => void;
}

interface IDecisionTableProps extends IDecisionTableStateProps, IDecisionTableDispatchProps { }

class DecisionTable extends React.Component<IDecisionTableProps, DecisionTableState> {
    private columnCount = 0;
    constructor(props: IDecisionTableProps, context: any) {
        super(props, context);
    }

    public render() {
        const matrix = this.props.data.matrix;
        this.columnCount = DecisionTableData.columnCount(this.props.data.decisionVariables);

        // Build toggle column row
        const toggleRow = [];
        toggleRow.push(<td key="blank-cell" />);
        for (let c = 0; c < this.columnCount; c++) {
            const buttonText = this.props.data.columnsVisible[c] ? '-' : '+';
            const toggleClick = () => this.props.toggleColumn(c);
            toggleRow.push(<td className="toggle-cell" key={'toggle' + c}>
                <button
                    className="btn btn-sm btn-secondary pull-xs-right toggle-button"
                    onClick={toggleClick}>
                    {buttonText}
                </button>
            </td>);
        }

        // Build result row
        const resultRow = [];
        resultRow.push(<td key='resultLabel' className="result-row">Result</td>);
        for (let c = 0; c < this.columnCount; c++) {
            let result = 'T';
            for (let r = 0; r < this.props.data.decisionVariables.length; r++) {
                if (!matrix[r][c].outcome) {
                    result = 'F';
                    break;
                }
            }
            const classes = "result-row " + ((result === 'T') ? 'success' : 'failure');
            const resultColumn = (this.props.data.columnsVisible[c]) ?
                <td className={classes} key={'result' + c}>{result}</td> :
                <td className="column-hidden" key={'result' + c} />;
            resultRow.push(resultColumn);
        }

        return (
            <div className="DecisionTable">                
                <div>
                    <table>
                        <tbody>
                            <tr>
                                {toggleRow}
                            </tr>
                            {matrix.map((row, ri) =>
                                <tr key={'r' + ri}>
                                    <td className="var-label">{this.props.data.decisionVariables[ri].name}</td>
                                    {row.map((column, ci) => {
                                        let c = (column.outcome) ? 'trueValue' : 'falseValue';
                                        c = c + ((this.props.data.columnsVisible[ci]) ? '' : ' column-hidden');
                                        return <td key={'r' + ri + 'c' + ci} className={c}>{column.value}</td>
                                    }
                                    )}
                                </tr>
                            )}
                            <tr>
                                {resultRow}
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (storeState: IAppStore): IDecisionTableStateProps => ({
    data: { ...storeState.reducer } as DecisionTableState
}) as IDecisionTableStateProps;

const mapDispatchToProps = (dispatch: Dispatch<DecisionTableState>) => ({
    clear: () => dispatch(clear()),
    toggleColumn: (columnIndex: number) => dispatch(toggleColumn(columnIndex))
}) as IDecisionTableDispatchProps;

export default connect(mapStateToProps, mapDispatchToProps)(DecisionTable);
