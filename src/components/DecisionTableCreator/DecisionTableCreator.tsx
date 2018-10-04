import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { DecisionTableState } from '../../models/DecisionTableState';
import { IDecisionVariable } from '../../models/IDecisionVariable/DecisionVariable';
import { VariableType } from '../../models/VariableType';
import { addVariable, changeVariableType, clear, editVariable, removeVariable } from '../../store/actions';
import { IAppStore } from '../../store/store';
import DecisionTable from '../Table/DecisionTable';
import DecisionVariableInput from '../Variables/DecisionVariableInput';

interface IDecisionTableCreatorStateProps {
    data: DecisionTableState;
}

interface IDecisionTableCreatorDispatchProps {
    addVariable: () => void;
    clear: () => void;
    editVariable: (variable: IDecisionVariable) => void;
    removeVariable: (variable: IDecisionVariable) => void;
    changeVariableType: (variable: IDecisionVariable, newType: VariableType) => void;
}

interface IDecisionTableCreatorProps extends IDecisionTableCreatorStateProps, IDecisionTableCreatorDispatchProps { }

class DecisionTableCreator extends React.Component<IDecisionTableCreatorProps, DecisionTableState> {
    constructor(props: IDecisionTableCreatorProps, context: any) {
        super(props, context);
    }

    public render() {
        const add = () => {
            this.props.addVariable();
        }
        return (
            <div className="DecisionTableCreator">
                <div>
                    <button
                        className="btn btn-lg btn-primary pull-xs-right"
                        type="submit"
                        value="Add"
                        onClick={add}>add decision variable
                    </button>                    
                    <button
                        className="btn btn-lg btn-primary pull-xs-right"
                        type="submit"
                        value="Clear"
                        onClick={this.props.clear}>clear all
                    </button>
                </div>
                <div>
                    <ul className="searchResult-list">
                        {this.props.data.decisionVariables.map(variable =>
                            <DecisionVariableInput
                                key={variable.id}
                                variable={variable}
                                editable={true}
                                editVariable={this.props.editVariable}
                                removeVariable={this.props.removeVariable}
                                changeVariableType={this.props.changeVariableType} />
                        )}
                    </ul>
                </div>
                <DecisionTable />
            </div>
        );
    }
}

const mapStateToProps = (storeState: IAppStore): IDecisionTableCreatorStateProps => ({
    data: { ...storeState.reducer } as DecisionTableState
}) as IDecisionTableCreatorStateProps;

const mapDispatchToProps = (dispatch: Dispatch<DecisionTableState>): IDecisionTableCreatorDispatchProps => ({
    addVariable: () => dispatch(addVariable()),
    changeVariableType: (variable: IDecisionVariable, newType: VariableType) => dispatch(changeVariableType(variable, newType)),
    clear: () => dispatch(clear()),
    editVariable: (variable: IDecisionVariable) => dispatch(editVariable(variable)),
    removeVariable: (variable: IDecisionVariable) => dispatch(removeVariable(variable))    
}) as IDecisionTableCreatorDispatchProps;

export default connect(mapStateToProps, mapDispatchToProps)(DecisionTableCreator);
