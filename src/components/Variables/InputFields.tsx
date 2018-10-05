import * as React from 'react';

import { NumberRange } from '../../models/NumberRange';

export interface IInputField {
  label: string;
  value: string | number | NumberRange;
  placholder: string;
}

const getWrappedStringHandler = (handler: (value: string) => void) => {
  return (ev: React.ChangeEvent<HTMLInputElement>) => {
    handler(ev.target.value);
  };
};

const getWrappedNumberHandler = (handler: (value: number) => void) => {
  return (ev: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(ev.target.value, 10);
    if (isNaN(val)) {
      return;
    }
    handler(val);
  };
};

export interface IOnInputChange {
  onChange: (value: string | number) => void;
}

export interface IInputFieldProps extends IInputField, IOnInputChange {}

export interface IInputRangeFieldProps extends IInputField {
  onMinChange: (value: number) => void;
  onMaxChange: (value: number) => void;
}

export const InputFieldString: React.SFC<IInputFieldProps> = props => {
  return (
    <span>
      <label>{props.label}: </label>
      <input
        className="form-control form-control-lg value-input"
        placeholder={props.placholder}
        value={props.value as string}
        onChange={getWrappedStringHandler(props.onChange)}
      />
    </span>
  );
};

export const InputNumber: React.SFC<IInputFieldProps> = props => {
  return (
    <input
      className="form-control form-control-lg value-input"
      placeholder={props.placholder}
      value={props.value as number}
      onChange={getWrappedNumberHandler(props.onChange)}
      type="number"
      min="-99999999"
      max="99999999"
    />
  );
};

export const InputFieldNumber: React.SFC<IInputFieldProps> = props => {
  return (
    <span>
      <label>{props.label}: </label>
      <InputNumber {...props} />
    </span>
  );
};

export const InputFieldNumberRange: React.SFC<
  IInputRangeFieldProps
> = props => {
  const minProps = {
    ...props,
    onChange: props.onMinChange,
    value: (props.value as NumberRange).min
  };
  const maxProps = {
    ...props,
    onChange: props.onMaxChange,
    value: (props.value as NumberRange).max
  };
  return (
    <span>
      <label>{props.label}: </label>
      <InputNumber {...minProps} />-<InputNumber {...maxProps} />
    </span>
  );
};
