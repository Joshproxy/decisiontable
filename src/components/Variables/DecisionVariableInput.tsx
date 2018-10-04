import * as React from 'react';

import { IDecisionVariable } from '../../models/IDecisionVariable/DecisionVariable';
import { DecisionVariableNumber } from '../../models/IDecisionVariable/DecisionVariableNumber';
import {
    DecisionVariableNumberRange
} from '../../models/IDecisionVariable/DecisionVariableNumberRange';
import { DecisionVariableString } from '../../models/IDecisionVariable/DecisionVariableString';
import { VariableType } from '../../models/VariableType';
import { InputFieldNumber, InputFieldNumberRange, InputFieldString } from './InputFields';

interface IDecisionVariableInputStateProps {
  editable: boolean;
  variable: IDecisionVariable;
}

interface IDecisionVariableInputDispatchProps {
  editVariable: (variable: IDecisionVariable) => void;
  removeVariable: (variable: IDecisionVariable) => void;
  changeVariableType: (
    variable: IDecisionVariable,
    newType: VariableType
  ) => void;
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
    const variableChange = (newState: IDecisionVariable) => {
      this.props.editVariable(newState);
    };
    const editName = (ev: React.ChangeEvent<HTMLInputElement>) => {
      const newState = { ...this.props.variable, name: ev.target.value };
      variableChange(newState);
    };
    const typeChange = (ev: React.ChangeEvent<HTMLSelectElement>) => {
      const newType = parseInt(ev.target.value, 10) as VariableType;
      this.props.changeVariableType(this.props.variable, newType);
    };
    const valueChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
      const newState =
        this.props.variable.type === VariableType.STRING
          ? DecisionVariableString.updateValue(
              this.props.variable,
              ev.target.value
            )
          : DecisionVariableNumber.updateValue(
              this.props.variable,
              parseInt(ev.target.value, 10)
            );
      variableChange(newState);
    };
    const valueMinChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
      const min = parseInt(ev.target.value, 10);
      if (isNaN(min)) {
        return;
      }
      const newState = DecisionVariableNumberRange.updateMinValue(
        this.props.variable,
        min
      );
      variableChange(newState);
    };
    const valueMaxChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
      const max = parseInt(ev.target.value, 10);
      if (isNaN(max)) {
        return;
      }
      const newState = DecisionVariableNumberRange.updateMaxValue(
        this.props.variable,
        max
      );
      variableChange(newState);
    };
    const remove = () => {
      this.props.removeVariable(this.props.variable);
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
        <select onChange={typeChange}>
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
