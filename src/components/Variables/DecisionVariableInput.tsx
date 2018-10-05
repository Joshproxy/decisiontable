import * as React from 'react';

import { IDecisionVariable } from '../../models/IDecisionVariable/DecisionVariable';
import { NumberRange } from '../../models/NumberRange';
import { VariableType } from '../../models/VariableType';
import { InputFieldNumber, InputFieldNumberRange, InputFieldString } from './InputFields';

interface IDecisionVariableInputStateProps {
  editable: boolean;
  variable: IDecisionVariable;
}

interface IDecisionVariableInputDispatchProps {
  editName: (variableId: number, newName: string) => void;
  editValue: (variableId: number, newValue: string | number | NumberRange) => void;
  editType: (variableId: number, newType: VariableType) => void;
  remove: (variableId: number) => void;
}

interface IDecisionVariableInputProps
  extends IDecisionVariableInputStateProps,
    IDecisionVariableInputDispatchProps {}

class DecisionVariableInput extends React.Component<
  IDecisionVariableInputProps,
  IDecisionVariable
> {
  constructor(props: IDecisionVariableInputProps, context: any) {
    super(props, context);
  }

  public render() {    
    const editName = (newName: string) => {
      this.props.editName(this.props.variable.id, newName);
    };
    const editType = (ev: React.ChangeEvent<HTMLSelectElement>) => {
      const newType = (parseInt(ev.target.value, 10) as VariableType);
      this.props.editType(this.props.variable.id, newType);
    };
    const valueChange = (newValue: string | number) => {      
      this.props.editValue(this.props.variable.id, newValue);
    };
    const valueMinChange = (min: number) => {
      const newRange = new NumberRange(min, (this.props.variable.trueValue as NumberRange).max);
      this.props.editValue(this.props.variable.id, newRange);
    };
    const valueMaxChange = (max: number) => {
      const newRange = new NumberRange((this.props.variable.trueValue as NumberRange).min, max);
      this.props.editValue(this.props.variable.id, newRange);
    };
    const remove = () => {
      this.props.remove(this.props.variable.id);
    };

    return (
      <div className="DecisionVariableInput">
        <InputFieldString
          label="Name"
          value={this.props.variable.name}
          placholder="Variable name"
          onChange={editName}
        />
        {this.props.variable.type === VariableType.STRING && (
          <InputFieldString
            label="True value"
            value={this.props.variable.trueValue}
            placholder="True value"
            onChange={valueChange}
          />
        )}
        {this.props.variable.type === VariableType.NUMBER && (
          <InputFieldNumber
            label="True value"
            value={this.props.variable.trueValue}
            placholder="True value"
            onChange={valueChange}
          />
        )}
        {this.props.variable.type === VariableType.NUMBER_RANGE && (
          <InputFieldNumberRange
            label="True range"
            value={this.props.variable.trueValue}
            placholder="True value"
            onMinChange={valueMinChange}
            onMaxChange={valueMaxChange}
          />
        )}

        <label>Type:</label>
        <select onChange={editType}>
          <option
            key={"typeOption" + VariableType.BOOLEAN}
            value={VariableType.BOOLEAN}
          >
            Boolean
          </option>
          <option
            key={"typeOption" + VariableType.STRING}
            value={VariableType.STRING}
          >
            String
          </option>
          <option
            key={"typeOption" + VariableType.NUMBER}
            value={VariableType.NUMBER}
          >
            Number
          </option>
          <option
            key={"typeOption" + VariableType.NUMBER_RANGE}
            value={VariableType.NUMBER_RANGE}
          >
            Number Range
          </option>
        </select>

        <button
          className="btn btn-lg btn-primary pull-xs-right"
          onClick={remove}
        >
          remove
        </button>
      </div>
    );
  }
}

export default DecisionVariableInput;
