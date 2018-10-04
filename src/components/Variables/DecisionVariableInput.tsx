import * as React from 'react';
import { IDecisionVariable } from '../../models/DecisionVariable';
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
  changeVariableType: (variable: IDecisionVariable, newType: VariableType) => void;
}

interface IDecisionVariableInputProps extends IDecisionVariableInputStateProps, IDecisionVariableInputDispatchProps { }

class DecisionVariableInput extends React.Component<IDecisionVariableInputProps, IDecisionVariable> {

  constructor(props: IDecisionVariableInputProps, context: any) {
    super(props, context);    
  }

  public render() {
    const variableChange = (newState: IDecisionVariable) => {
      this.props.editVariable(newState);
    }
    const editName = (ev: React.ChangeEvent<HTMLInputElement>) => {
      const newState = { ...this.props.variable, name: ev.target.value }      
      variableChange(newState);
    }
    const typeChange = (ev: React.ChangeEvent<HTMLSelectElement>) => {
      const newType = parseInt(ev.target.value, 10) as VariableType;
      this.props.changeVariableType(this.props.variable, newType);      
    }
    const valueChange = (ev: React.ChangeEvent<HTMLInputElement>) => {      
      const newState = (this.props.variable.type === VariableType.STRING) ? 
      DecisionVariableString.updateValue(this.props.variable, ev.target.value) :
      DecisionVariableNumber.updateValue(this.props.variable, parseInt(ev.target.value, 10));      
      variableChange(newState);
    }
    const valueMinChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
      const min = parseInt(ev.target.value, 10);
      if(isNaN(min)) { return; }
      const newState = DecisionVariableNumberRange.updateMinValue(this.props.variable, min);      
      variableChange(newState);
    }
    const valueMaxChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
      const max = parseInt(ev.target.value, 10);
      if(isNaN(max)) { return; }
      const newState = DecisionVariableNumberRange.updateMaxValue(this.props.variable, max);      
      variableChange(newState);
    }
    const remove = () => {
      this.props.removeVariable(this.props.variable);
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
          value={this.props.variable.name}
          onChange={editName} />

        {this.props.variable.type === VariableType.STRING &&        
        <span>              
          <label>True value:</label>
          <input
            className="form-control form-control-lg value-input"
            placeholder="True value"
            value={this.props.variable.trueValue}
            onChange={valueChange}          
            />
        </span>
        }
        {this.props.variable.type === VariableType.NUMBER &&
        <span>      
          <label>True value:</label>         
          <input
            className="form-control form-control-lg value-input"
            placeholder="True value"
            type="number"
            min="-99999999"
            max="99999999"
            value={this.props.variable.trueValue}
            onChange={valueChange}          
            />
        </span>
        }
        {this.props.variable.type === VariableType.NUMBER_RANGE &&
        <span>       
          <label>True range:</label>      
          <input
            className="form-control form-control-lg value-input"
            placeholder="Min value"
            type="number"
            min="-99999999"
            max="99999999"
            value={(this.props.variable.trueValue as NumberRange).min}
            onChange={valueMinChange}          
            />
          -     
          <input
            className="form-control form-control-lg value-input"
            placeholder="Max value"
            type="number"
            min="-99999999"
            max="99999999"
            value={(this.props.variable.trueValue as NumberRange).max}
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
