import { observer } from 'mobx-react';
import * as React from 'react';
import { VariableType } from 'src/models/VariableType';

import { DecisionTableModel } from '../../models/DecisionTableModel';
import { IDecisionVariable } from '../../models/IDecisionVariable/DecisionVariable';
import DecisionTable_Mobx from '../Table/DecisionTable_Mobx';
import DecisionVariableInput_Mobx from '../Variables/DecisionVariableInput_Mobx';
import { InputFieldString } from '../Variables/InputFields';

@observer
// tslint:disable-next-line:class-name
class DecisionTableCreator_Mobx extends React.Component<
{ model: DecisionTableModel} ,
  {}
> {
  constructor(props: { model: DecisionTableModel}, context: any) {
    super(props, context);

    const model = this.props.model;
    DecisionTableModel
    .loadData()
    .then((state: DecisionTableModel) => {      
      model.decisionVariables = state.decisionVariables;
      model.columnsVisible = state.columnsVisible;
      model.trueResult = state.trueResult;
      model.falseResult = state.falseResult;
      }
    );
  }

  public render() {
    const model = this.props.model;
    const dataJson = model.toUrlEncodedJson();
    const changeVariableType = (variable: IDecisionVariable, newType: VariableType) => {
      model.decisionVariables = model.decisionVariables
      .map(v => (v.id === variable.id) ? DecisionTableModel.changeVariableType(variable,newType) : v);         
    };      
    
    window.location.hash = dataJson;
    return (
      <div className="DecisionTableCreator">
        <div>
          <div>
            <InputFieldString
              label="Pass Result:"
              value={model.trueResult}
              placholder="Result when true"
              onChange={model.updateTrueResult}
            />
            <br />
            <InputFieldString
              label="Fail Result:"
              value={model.falseResult}
              placholder="Result when false"
              onChange={model.updateFalseResult}
            />
          </div>
          <button
            className="btn btn-lg btn-primary pull-xs-right"
            type="submit"
            value="Add"
            onClick={model.addVariable}
          >
            add decision variable
          </button>
          <button
            className="btn btn-lg btn-primary pull-xs-right"
            type="submit"
            value="Clear"
            onClick={model.clear}
          >
            clear all
          </button>
        </div>
        <div>
          <ul className="searchResult-list">
            {model.decisionVariables.map(variable => (
              <DecisionVariableInput_Mobx
                key={variable.id}
                variable={variable}
                editable={true}
                changeType={changeVariableType}
                remove={model.removeVariable}
              />
            ))}
          </ul>
        </div>
        <DecisionTable_Mobx
          data={model}
        />
      </div>
    );
  }
}

export default DecisionTableCreator_Mobx;
