import * as React from 'react';
// import { connect } from 'react-redux';
// import { Dispatch } from 'redux';
// import { DecisionTableData } from '../../models/DecisionTableData';
import { IDecisionVariable } from '../../models/DecisionVariable';
// import { IAppStore } from '../../store/store';

interface IDecisionVariableInputStateProps {
  editable: boolean;
  variable: IDecisionVariable;
}

interface IDecisionVariableInputDispatchProps {
  editVariable: (variable: IDecisionVariable) => void;
  removeVariable: (variable: IDecisionVariable) => void;
}

interface IDecisionVariableInputProps extends IDecisionVariableInputStateProps, IDecisionVariableInputDispatchProps {}

class DecisionVariableInput extends React.Component<IDecisionVariableInputProps, IDecisionVariable> {
  constructor(props: IDecisionVariableInputProps, context: any) {
    super(props, context);
    this.state = this.props.variable;
  }
  public render() {
    const variableChange = (newState: IDecisionVariable) => {
      this.props.editVariable(newState);
    }
    const editName = (ev: React.ChangeEvent<HTMLInputElement>) => {
      const newState = {...this.state, name: ev.target.value}
      this.setState(newState);
      variableChange(newState);
    }
    const remove = () => {
      this.props.removeVariable(this.state);
    }
    return (
      <div className="DecisionVariableInput">
        <label>Name:</label>
        <input
          className="form-control form-control-lg"
          type="search"
          placeholder="Search Text"
          value={this.state.name}
          onChange={editName} />

        <button
          className="btn btn-lg btn-primary pull-xs-right"
          type="submit"
          value="Remove"
          onClick={remove}>Remove
        </button>
      </div>
    );
  }
}

// const mapStateToProps = (storeState: IAppStore, props: IDecisionVariableInputProps): IDecisionVariableInputStateProps => ({
//   editable: true,
//   variable: props.variable
// }) as IDecisionVariableInputStateProps;

// const mapDispatchToProps = (dispatch: Dispatch<DecisionTableData>) : IDecisionVariableInputDispatchProps => ({
//   editVariable: (variable: IDecisionVariable) => dispatch(editVariable(variable)),
//   removeVariable: (variable: IDecisionVariable) => dispatch(removeVariable(variable))
// }) as IDecisionVariableInputDispatchProps

export default DecisionVariableInput;
