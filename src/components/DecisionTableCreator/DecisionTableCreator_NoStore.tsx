import * as React from 'react';

import { DecisionTableState } from '../../models/DecisionTableState';
import { DecisionTableStateFunctions } from '../../models/DecisionTableStateFunctions';
import { IDecisionVariable } from '../../models/IDecisionVariable/DecisionVariable';
import { NumberRange } from '../../models/NumberRange';
import { VariableType } from '../../models/VariableType';
import DecisionTable from '../Table/DecisionTable';
import DecisionVariableInput from '../Variables/DecisionVariableInput';
import { InputFieldString } from '../Variables/InputFields';

// tslint:disable-next-line:class-name
class DecisionTableCreator_NoStore extends React.Component<
  {},
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
  private updateTrueResult: (updatedResult: string) => void;
  private updateFalseResult: (updatedResult: string) => void;
  private clear: () => void;

  constructor(props: any, context: any) {
    super(props, context);

    this.state = new DecisionTableState();

    this.addVariable = () =>
      this.setState(DecisionTableStateFunctions.addVariable(this.state));
    this.removeVariable = (variableId: number) =>
      this.setState(
        DecisionTableStateFunctions.removeVariable(this.state, variableId)
      );
    this.editVariableName = (variableId: number, newName: string) => {
      DecisionTableStateFunctions.runIfVariable(
        this.state,
        variableId,
        (variable: IDecisionVariable) => {
          variable.name = newName;
          this.setState(
            DecisionTableStateFunctions.editVariable(this.state, variable)
          );
        }
      );
    };
    this.editVariableValue = (
      variableId: number,
      newValue: string | number | NumberRange
    ) => {
      DecisionTableStateFunctions.runIfVariable(
        this.state,
        variableId,
        (variable: IDecisionVariable) => {
          variable.trueValue = newValue;
          this.setState(
            DecisionTableStateFunctions.editVariable(this.state, variable)
          );
        }
      );
    };
    this.editVariableType = (variableId: number, newType: VariableType) => {
      DecisionTableStateFunctions.runIfVariable(
        this.state,
        variableId,
        (variable: IDecisionVariable) => {
          this.setState(
            DecisionTableStateFunctions.editVariable(
              this.state,
              DecisionTableStateFunctions.changeVariableType(variable, newType)
            )
          );
        }
      );
    };
    this.toggleColumn = (columnIndex: number) =>
      this.setState(
        DecisionTableStateFunctions.toggleColumn(this.state, columnIndex)
      );
    this.updateTrueResult = (updatedResult: string) =>
      this.setState(
        DecisionTableStateFunctions.updateFalseResult(this.state, updatedResult)
      );
    this.updateFalseResult = (updatedResult: string) =>
      this.setState(
        DecisionTableStateFunctions.updateFalseResult(this.state, updatedResult)
      );
    this.clear = () =>
      this.setState(DecisionTableStateFunctions.clear(this.state));

    DecisionTableStateFunctions.loadData().then(state => this.setState(state));
  }

  public render() {
    return (
      <div className="DecisionTableCreator">
        <div>
          <div>
            <InputFieldString
              label="Pass Result:"
              value={this.state.trueResult}
              placholder="Result when true"
              onChange={this.updateTrueResult}
            />
            <br />
            <InputFieldString
              label="Fail Result:"
              value={this.state.falseResult}
              placholder="Result when false"
              onChange={this.updateFalseResult}
            />
          </div>
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
            {this.state.decisionVariables.map(variable => (
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
          data={this.state}
          clear={this.clear}
          toggleColumn={this.toggleColumn}
        />
      </div>
    );
  }
}

export default DecisionTableCreator_NoStore;
