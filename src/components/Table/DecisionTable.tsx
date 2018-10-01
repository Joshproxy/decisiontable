import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { DecisionTableData } from '../../models/DecisionTableData';
import { DecisionTableState } from '../../models/DecisionTableState';
import { clear } from '../../store/actions';
import { IAppStore } from '../../store/store';
import './DecisionTable.css';

interface IDecisionTableStateProps {
    data: DecisionTableState;
}

interface IDecisionTableDispatchProps {
    clear: () => void;
}

interface IDecisionTableProps extends IDecisionTableStateProps, IDecisionTableDispatchProps { }

class DecisionTable extends React.Component<IDecisionTableProps, DecisionTableState> {
    private columnCount = 0;
    constructor(props: IDecisionTableProps, context: any) {
        super(props, context);
    }

    public render() {        
        const resultRow = [];
        const matrix = this.props.data.matrix;
        resultRow.push(<td key='resultLabel'>Result</td>)        
        this.columnCount = DecisionTableData.columnCount(this.props.data.decisionVariables);        
        for (let c = 0; c < this.columnCount; c++) {
            let result = 'T';
            for (let r = 0; r < this.props.data.decisionVariables.length; r++) {
                if (!matrix[r][c].outcome) {
                    result = 'F';
                    break;
                }
            }
            resultRow.push(<td key={'result'+c}>{result}</td>)
        }
        return (
            <div className="DecisionTable">
                <div>
                    <button
                        className="btn btn-lg btn-primary pull-xs-right"
                        type="submit"
                        value="Clear"
                        onClick={this.props.clear}>Clear
                </button>
                </div>
                <div>
                    <table>
                        <tbody>
                        {matrix.map((row, ri) =>
                            <tr key={'r'+ri}>
                                <td className="var-label">{this.props.data.decisionVariables[ri].name}</td>
                                {row.map((column, ci) =>
                                    <td key={'r'+ri+'c'+ci}>{column.value}</td>
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
    clear: () => dispatch(clear())
}) as IDecisionTableDispatchProps;

export default connect(mapStateToProps, mapDispatchToProps)(DecisionTable);
