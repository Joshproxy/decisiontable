import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { DecisionTableState } from '../../models/DecisionTableState';
import { IDecisionVariable } from '../../models/IDecisionVariable/DecisionVariable';
import { NumberRange } from '../../models/NumberRange';
import { VariableType } from '../../models/VariableType';
import {
    addVariable, changeVariableType, clear, editVariable, removeVariable, toggleColumn
} from '../../store/actions';
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
  removeVariable: (variableId: number) => void;
  toggleColumn: (columnIndex: number) => void;
  changeVariableType: (
    variable: IDecisionVariable,
    newType: VariableType
  ) => void;
}

interface IDecisionTableCreatorProps
  extends IDecisionTableCreatorStateProps,
    IDecisionTableCreatorDispatchProps {}

class DecisionTableCreator extends React.Component<
  IDecisionTableCreatorProps,
  DecisionTableState
> {
  constructor(props: IDecisionTableCreatorProps, context: any) {
    super(props, context);
  }

  public render() {
    // tslint:disable-next-line:no-shadowed-variable
    const addVariable = this.props.addVariable;
    // tslint:disable-next-line:no-shadowed-variable
    const removeVariable = this.props.removeVariable;
    // tslint:disable-next-line:no-shadowed-variable
    const toggleColumn = this.props.toggleColumn;
    // tslint:disable-next-line:no-shadowed-variable
    const clear = this.props.clear;
    const editVariableName = (variableId: number, newName: string) => {
      this.runIfVariable(variableId, (variable: IDecisionVariable) => {
        variable.name = newName;
        this.props.editVariable(variable);
      });
    };
    const editVariableValue = (
      variableId: number,
      newValue: string | number | NumberRange
    ) => {
      this.runIfVariable(variableId, (variable: IDecisionVariable) => {
        variable.trueValue = newValue;
        this.props.editVariable(variable);
      });
    };
    const editVariableType = (
        variableId: number,
        newType: VariableType
      ) => {
        this.runIfVariable(variableId, (variable: IDecisionVariable) => {          
          this.props.changeVariableType(variable, newType);
        });
      };
      
    return (
      <div className="DecisionTableCreator">
        <div>
          <button
            className="btn btn-lg btn-primary pull-xs-right"
            type="submit"
            value="Add"
            onClick={addVariable}
          >
            add decision variable
          </button>
          <button
            className="btn btn-lg btn-primary pull-xs-right"
            type="submit"
            value="Clear"
            onClick={clear}
          >
            clear all
          </button>
        </div>
        <div>
          <ul className="searchResult-list">
            {this.props.data.decisionVariables.map(variable => (
              <DecisionVariableInput
                key={variable.id}
                variable={variable}
                editable={true}
                editName={editVariableName}
                editValue={editVariableValue}
                remove={removeVariable}
                editType={editVariableType}
              />
            ))}
          </ul>
        </div>
        <DecisionTable
          data={this.props.data}
          clear={this.props.clear}
          toggleColumn={toggleColumn}
        />
      </div>
    );
  }

  private getVariable = (variableId: number): IDecisionVariable | undefined => {
    return this.props.data.decisionVariables.find(v => v.id === variableId);
  };

  private runIfVariable = (
    variableId: number,
    toRun: (variable: IDecisionVariable) => void
  ) => {
    const variable = this.getVariable(variableId);
    if (variable) {
      toRun(variable);
    }
  };
}

const mapStateToProps = (
  storeState: IAppStore
): IDecisionTableCreatorStateProps =>
  ({
    data: { ...storeState.reducer } as DecisionTableState
  } as IDecisionTableCreatorStateProps);

const mapDispatchToProps = (
  dispatch: Dispatch<DecisionTableState>
): IDecisionTableCreatorDispatchProps =>
  ({
    addVariable: () => dispatch(addVariable()),
    changeVariableType: (variable: IDecisionVariable, newType: VariableType) =>
      dispatch(changeVariableType(variable, newType)),
    clear: () => dispatch(clear()),
    editVariable: (variable: IDecisionVariable) =>
      dispatch(editVariable(variable)),
    removeVariable: (variableId: number) =>
      dispatch(removeVariable(variableId)),
    toggleColumn: (columnIndex: number) => dispatch(toggleColumn(columnIndex))
  } as IDecisionTableCreatorDispatchProps);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DecisionTableCreator);
