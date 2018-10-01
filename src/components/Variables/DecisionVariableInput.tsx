import * as React from 'react';
import { IDecisionVariable } from '../../models/DecisionVariable';
import { DecisionVariableBoolean } from '../../models/DecisionVariableBoolean';
import { DecisionVariableNumber } from '../../models/DecisionVariableNumber';
import { DecisionVariableNumberRange } from '../../models/DecisionVariableNumberRange';
import { DecisionVariableString } from '../../models/DecisionVariableString';
import { NumberRange } from '../../models/NumberRange';
import { VariableType } from '../../models/VariableType';

interface IDecisionVariableInputStateProps {
  editable: boolean;
  variable: IDecisionVariable;
}

interface IDecisionVariableInputDispatchProps {
  editVariable: (variable: IDecisionVariable) => void;
  removeVariable: (variable: IDecisionVariable) => void;
}

interface IDecisionVariableInputProps extends IDecisionVariableInputStateProps, IDecisionVariableInputDispatchProps { }

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
      const newState = { ...this.state, name: ev.target.value }
      this.setState(newState);
      variableChange(newState);
    }
    const typeChange = (ev: React.ChangeEvent<HTMLSelectElement>) => {
      let newVariableType: IDecisionVariable;
      const chosenType = parseInt(ev.target.value, 10) as VariableType;
      switch (chosenType) {
        case VariableType.BOOLEAN:
          newVariableType = new DecisionVariableBoolean(this.state.index, this.state.name);
          break;
        case VariableType.STRING:
          newVariableType = new DecisionVariableString(this.state.index, this.state.name, '');
          break;
        case VariableType.NUMBER:
          newVariableType = new DecisionVariableNumber(this.state.index, this.state.name, 1);
          break;
        case VariableType.NUMBER_RANGE:
          newVariableType = new DecisionVariableNumberRange(this.state.index, this.state.name);
          break;
        default:
          newVariableType = new DecisionVariableBoolean(this.state.index, this.state.name);
      }
      const newState = { ...this.state, ...newVariableType };
      this.setState(newState);
      variableChange(newState);
    }
    const valueChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
      const newState = { ...this.state, trueValue: ev.target.value }
      this.setState(newState);
      variableChange(newState);
    }
    const valueMinChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
      const trueValue = this.state.trueValue as NumberRange;
      trueValue.min = parseInt(ev.target.value, 10);
      const newState = { ...this.state, trueValue }
      this.setState(newState);
      variableChange(newState);
    }
    const valueMaxChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
      const trueValue = this.state.trueValue as NumberRange;
      trueValue.max = parseInt(ev.target.value, 10);
      const newState = { ...this.state, trueValue }
      this.setState(newState);
      variableChange(newState);
    }
    const remove = () => {
      this.props.removeVariable(this.state);
    }
    const variableTypeOptions = [];
    variableTypeOptions.push(<option key={'typeOption' + VariableType.BOOLEAN} value={VariableType.BOOLEAN}>Boolean</option>);
    variableTypeOptions.push(<option key={'typeOption' + VariableType.STRING} value={VariableType.STRING}>String</option>);
    variableTypeOptions.push(<option key={'typeOption' + VariableType.NUMBER} value={VariableType.NUMBER}>Number</option>);
    variableTypeOptions.push(<option key={'typeOption' + VariableType.NUMBER_RANGE} value={VariableType.NUMBER_RANGE}>Number Range</option>);

    return (
      <div className="DecisionVariableInput">
        <label>Name:</label>
        <input
          className="form-control form-control-lg"
          placeholder="Name"
          value={this.state.name}
          onChange={editName} />

        {this.state.type !== VariableType.BOOLEAN && this.state.type !== VariableType.NUMBER_RANGE &&
        <span>
          <label>True value:</label>        
          <input
            className="form-control form-control-lg"
            placeholder="True value"
            value={this.state.trueValue}
            onChange={valueChange}          
            />
        </span>
        }
        {this.state.type !== VariableType.BOOLEAN && this.state.type === VariableType.NUMBER_RANGE &&
        <span>
          <label>Min value:</label>        
          <input
            className="form-control form-control-lg"
            placeholder="True value"
            value={(this.state.trueValue as NumberRange).min}
            onChange={valueMinChange}          
            />
          <label>Max value:</label>        
          <input
            className="form-control form-control-lg"
            placeholder="True value"
            value={(this.state.trueValue as NumberRange).max}
            onChange={valueMaxChange}          
            />
        </span>
        }
        
        <label>Type:</label>
        <select
          onChange={typeChange}>
          {variableTypeOptions}
        </select>

        <button
          className="btn btn-lg btn-primary pull-xs-right"
          onClick={remove}>remove
        </button>
      </div>
    );
  }
}

export default DecisionVariableInput;
