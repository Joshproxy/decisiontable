import './DecisionTable.css';

import * as React from 'react';

import { DecisionTableState } from '../../models/DecisionTableState';

interface IDecisionTableStateProps {
  data: DecisionTableState;
}

interface IDecisionTableDispatchProps {
  clear: () => void;
  toggleColumn: (columnIndex: number) => void;
}

interface IDecisionTableProps
  extends IDecisionTableStateProps,
    IDecisionTableDispatchProps {}

class DecisionTable extends React.Component<
  IDecisionTableProps,
  DecisionTableState
> {
  constructor(props: IDecisionTableProps, context: any) {
    super(props, context);
  }

  public render() {
    const matrix = this.props.data.matrix;

    return (
      <div className="DecisionTable">
        <div>
          <table>
            <tbody>
              <tr>
                <td />
                {this.props.data.columnsVisible.map((columnVisible, cvi) => {
                  const buttonText = columnVisible ? "-" : "+";
                  const toggleClick = () => this.props.toggleColumn(cvi);
                  return (
                    <td className="toggle-cell" key={"toggle" + cvi}>
                      <button
                        className="btn btn-sm btn-secondary pull-xs-right toggle-button"
                        onClick={toggleClick}
                      >
                        {buttonText}
                      </button>
                    </td>
                  );
                })}
              </tr>
              {matrix.map((row, ri) => (
                <tr key={"r" + ri}>
                  <td className="var-label">
                    {this.props.data.decisionVariables[ri].name}
                  </td>
                  {row.map((column, ci) => {
                    let c = column.outcome ? "trueValue" : "falseValue";
                    c =
                      c +
                      (this.props.data.columnsVisible[ci]
                        ? ""
                        : " column-hidden");
                    return (
                      <td key={"r" + ri + "c" + ci} className={c}>
                        {column.value}
                      </td>
                    );
                  })}
                </tr>
              ))}
              <tr>
                <td key="resultLabel" className="result-row">
                  Result
                </td>
                {this.props.data.columnsVisible.map((c, ci) => {
                  let result = true;
                  for (
                    let r = 0;
                    r < this.props.data.decisionVariables.length;
                    r++
                  ) {
                    if (!matrix[r][ci].outcome) {
                      result = false;
                      break;
                    }
                  }
                  const resultText = result
                    ? this.props.data.trueResult
                    : this.props.data.falseResult;
                  let classes =
                    "result-row " + (result ? "success" : "failure");
                  if (!this.props.data.columnsVisible[ci]) {
                    classes += " column-hidden";
                  }
                  return (
                    <td className={classes} key={"result" + ci}>
                      {resultText}
                    </td>
                  );
                })}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default DecisionTable;
