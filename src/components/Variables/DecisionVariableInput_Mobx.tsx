import { observer } from 'mobx-react';
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
  changeType: (variable: IDecisionVariable, newType: VariableType) => void;
  remove: (variableId: number) => void;
}

interface IDecisionVariableInputProps
  extends IDecisionVariableInputStateProps,
    IDecisionVariableInputDispatchProps {}

@observer
// tslint:disable-next-line:class-name
class DecisionVariableInput_Mobx extends React.Component<
  IDecisionVariableInputProps,
  IDecisionVariable
> {
  constructor(props: IDecisionVariableInputProps, context: any) {
    super(props, context);
  }

  public render() {    
    const editName = (newName: string) => {      
      this.props.variable.name = newName;
    };
    const editType = (ev: React.ChangeEvent<HTMLSelectElement>) => {
      const newType = (parseInt(ev.target.value, 10) as VariableType);
      this.props.changeType(this.props.variable, newType);
    };
    const valueChange = (newValue: string | number) => {      
      this.props.variable.trueValue = newValue;
    };
    const valueMinChange = (min: number) => {
      const newRange = new NumberRange(min, (this.props.variable.trueValue as NumberRange).max);
      this.props.variable.trueValue = newRange;
    };
    const valueMaxChange = (max: number) => {
      const newRange = new NumberRange((this.props.variable.trueValue as NumberRange).min, max);
      this.props.variable.trueValue = newRange;
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
        <select onChange={editType} value={this.props.variable.type}>
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

export default DecisionVariableInput_Mobx;
