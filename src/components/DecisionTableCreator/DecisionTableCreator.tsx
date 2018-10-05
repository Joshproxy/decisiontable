import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { DecisionTableState } from '../../models/DecisionTableState';
import { DecisionTableStateFunctions } from '../../models/DecisionTableStateFunctions';
import { IDecisionVariable } from '../../models/IDecisionVariable/DecisionVariable';
import { NumberRange } from '../../models/NumberRange';
import { VariableType } from '../../models/VariableType';
import * as Actions from '../../store/actions';
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
}

interface IDecisionTableCreatorProps
  extends IDecisionTableCreatorStateProps,
    IDecisionTableCreatorDispatchProps {}

class DecisionTableCreator extends React.Component<
  IDecisionTableCreatorProps,
  DecisionTableState
> {
  private addVariable: () => void;
  private removeVariable: (variableId: number) => void;
  private editVariableName: (variableId: number, newName: string) => void;
  private editVariableValue: (
    variableId: number,
    newValue: string | number | NumberRange
  ) => void;
  private editVariableType: (variableId: number, newType: VariableType) => void;
  private toggleColumn: (columnIndex: number) => void;
  private clear: () => void;
  private getState: () => DecisionTableState;

  constructor(props: IDecisionTableCreatorProps, context: any) {
    super(props, context);
    const useStore = true;

    this.state = new DecisionTableState();

    let dispatchProps: IDecisionTableCreatorDispatchProps = {
      addVariable: () =>
        this.setState(DecisionTableStateFunctions.addVariable(this.state)),
      clear: () => this.setState(DecisionTableStateFunctions.clear(this.state)),
      editVariable: (variable: IDecisionVariable) =>
        this.setState(
          DecisionTableStateFunctions.editVariable(this.state, variable)
        ),
      removeVariable: (variableId: number) =>
        this.setState(
          DecisionTableStateFunctions.removeVariable(this.state, variableId)
        ),
      toggleColumn: (columnIndex: number) =>
        this.setState(
          DecisionTableStateFunctions.toggleColumn(this.state, columnIndex)
        )
    };

    if (useStore) {
      dispatchProps = {
          addVariable: this.props.addVariable,
          clear: this.props.clear,
          editVariable: this.props.editVariable,
          removeVariable: this.props.removeVariable,
          toggleColumn: this.props.toggleColumn
      }
    }

    this.getState = () => (useStore) ? this.props.data : this.state;

    this.addVariable = dispatchProps.addVariable;
    this.removeVariable = dispatchProps.removeVariable;
    this.editVariableName = (variableId: number, newName: string) => {
      DecisionTableStateFunctions.runIfVariable(
        this.getState(),
        variableId,
        (variable: IDecisionVariable) => {
          variable.name = newName;
          dispatchProps.editVariable(variable);
        }
      );
    };
    this.editVariableValue = (
      variableId: number,
      newValue: string | number | NumberRange
    ) => {
      DecisionTableStateFunctions.runIfVariable(
        this.getState(),
        variableId,
        (variable: IDecisionVariable) => {
          variable.trueValue = newValue;
          dispatchProps.editVariable(variable);
        }
      );
    };
    this.editVariableType = (variableId: number, newType: VariableType) => {
      DecisionTableStateFunctions.runIfVariable(
        this.getState(),
        variableId,
        (variable: IDecisionVariable) => {
            dispatchProps.editVariable(
            DecisionTableStateFunctions.changeVariableType(variable, newType)
          );
        }
      );
    };
    this.toggleColumn = dispatchProps.toggleColumn;
    this.clear = dispatchProps.clear;
  }

  public render() {
    return (
      <div className="DecisionTableCreator">
        <div>
          <button
            className="btn btn-lg btn-primary pull-xs-right"
            type="submit"
            value="Add"
            onClick={this.addVariable}
          >
            add decision variable
          </button>
          <button
            className="btn btn-lg btn-primary pull-xs-right"
            type="submit"
            value="Clear"
            onClick={this.clear}
          >
            clear all
          </button>
        </div>
        <div>
          <ul className="searchResult-list">
            {this.getState().decisionVariables.map(variable => (
              <DecisionVariableInput
                key={variable.id}
                variable={variable}
                editable={true}
                editName={this.editVariableName}
                editValue={this.editVariableValue}
                remove={this.removeVariable}
                editType={this.editVariableType}
              />
            ))}
          </ul>
        </div>
        <DecisionTable
          data={this.getState()}
          clear={this.clear}
          toggleColumn={this.toggleColumn}
        />
      </div>
    );
  }
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
    addVariable: () => dispatch(Actions.addVariable()),
    clear: () => dispatch(Actions.clear()),
    editVariable: (variable: IDecisionVariable) =>
      dispatch(Actions.editVariable(variable)),
    removeVariable: (variableId: number) =>
      dispatch(Actions.removeVariable(variableId)),
    toggleColumn: (columnIndex: number) =>
      dispatch(Actions.toggleColumn(columnIndex))
  } as IDecisionTableCreatorDispatchProps);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DecisionTableCreator);
