import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { DecisionTableState } from '../../models/DecisionTableState';
import { IDecisionVariable } from '../../models/IDecisionVariable/DecisionVariable';
import * as Actions from '../../store/actions';
import { IAppStore } from '../../store/store';
import DecisionTable from '../Table/DecisionTable';
import DecisionVariableInput from '../Variables/DecisionVariableInput';
import { InputFieldString } from '../Variables/InputFields';

interface IDecisionTableCreatorStateProps {
  data: DecisionTableState;
}

interface IDecisionTableCreatorDispatchProps {
  addVariable: () => void;
  clear: () => void;
  editVariable: (variable: IDecisionVariable) => void;
  initialLoad: () => void;
  removeVariable: (variableId: number) => void;
  toggleColumn: (columnIndex: number) => void;
  updateTrueResult: (updatedResult: string) => void;
  updateFalseResult: (updatedResult: string) => void;
}

interface IDecisionTableCreatorProps
  extends IDecisionTableCreatorStateProps,
    IDecisionTableCreatorDispatchProps {}

// tslint:disable-next-line:class-name
class DecisionTableCreator_StoreBased extends React.Component<
  IDecisionTableCreatorProps,
  DecisionTableState
> {
  constructor(props: IDecisionTableCreatorProps, context: any) {
    super(props, context);
    this.props.initialLoad();
  }

  public render() {
    return (
      <div className="DecisionTableCreator">
        <div>
          <div>
            <InputFieldString
              label="Pass Result:"
              value={this.props.data.trueResult}
              placholder="Result when true"
              onChange={this.props.updateTrueResult}
            />
            <br />
            <InputFieldString
              label="Fail Result:"
              value={this.props.data.falseResult}
              placholder="Result when false"
              onChange={this.props.updateFalseResult}
            />
          </div>
          <button
            className="btn btn-lg btn-primary pull-xs-right"
            type="submit"
            value="Add"
            onClick={this.props.addVariable}
          >
            add decision variable
          </button>
          <button
            className="btn btn-lg btn-primary pull-xs-right"
            type="submit"
            value="Clear"
            onClick={this.props.clear}
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
                edit={this.props.editVariable}
                remove={this.props.removeVariable}
              />
            ))}
          </ul>
        </div>
        <DecisionTable
          data={this.props.data}
          clear={this.props.clear}
          toggleColumn={this.props.toggleColumn}
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
    addVariable: () => dispatch(Actions.addVariable.action()),
    clear: () => dispatch(Actions.clear.action()),
    editVariable: (variable: IDecisionVariable) =>
      dispatch(Actions.editVariable.action(variable)),
    initialLoad: () => dispatch(Actions.initialLoad.action()),
    removeVariable: (variableId: number) =>
      dispatch(Actions.removeVariable.action(variableId)),
    toggleColumn: (columnIndex: number) =>
      dispatch(Actions.toggleColumn.action(columnIndex)),
    updateFalseResult: (updatedResult: string) =>
      dispatch(Actions.updateFalseResult.action(updatedResult)),
    updateTrueResult: (updatedResult: string) =>
      dispatch(Actions.updateTrueResult.action(updatedResult))
  } as IDecisionTableCreatorDispatchProps);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DecisionTableCreator_StoreBased);
