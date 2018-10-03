import { Action, handleActions, ReducerMap } from 'redux-actions';
import { DecisionTableData } from '../models/DecisionTableData';
import { DecisionTableState } from '../models/DecisionTableState';
import { IDecisionVariable } from '../models/DecisionVariable';
import { DecisionVariableBoolean } from '../models/DecisionVariableBoolean';
import { ADD_VARIABLE, CLEAR, EDIT_VARIABLE, REMOVE_VARIABLE, TOGGLE_COLUMN } from './actions';

const nextId = (vars : IDecisionVariable[]) => {
    return (vars.length > 0) ? vars[vars.length-1].id + 1 : 0;
}

const reducerMap = {
    [ADD_VARIABLE]: (state: DecisionTableState, action: Action<IDecisionVariable>): DecisionTableState => {
        const newId = nextId(state.decisionVariables);
        const newVariable = new DecisionVariableBoolean(newId, String.fromCharCode('A'.charCodeAt(0) + newId))
        const decisionVariables = [...state.decisionVariables, newVariable ];
        const matrix = DecisionTableData.createMatrix(decisionVariables);
        const columnsVisible = matrix[0].map(() =>true);
        return { ...state, decisionVariables, matrix, columnsVisible};        
    },
    [CLEAR]: (state: DecisionTableState): DecisionTableState => {
        return { ...state, decisionVariables: [], matrix: [], columnsVisible: [] };
    },
    [EDIT_VARIABLE]: (state: DecisionTableState, action: Action<IDecisionVariable>): DecisionTableState => {
        const e = action.payload!;
        let updateMatrix = false;
        const decisionVariables = state.decisionVariables.map(v => {
            if (v.id === e.id) {
                if(e.name === v.name) {
                    updateMatrix = true;
                }
                return e;
            } else {
                return v;
            }
        });
        if (!updateMatrix) {
            return { ...state, decisionVariables };
        }
        const matrix = DecisionTableData.createMatrix(decisionVariables);
        const columnsVisible = matrix[0].map(() =>true);
        return { ...state, decisionVariables, matrix, columnsVisible };
    },
    [REMOVE_VARIABLE]: (state: DecisionTableState, action: Action<IDecisionVariable>): DecisionTableState => {
        const e = action.payload!;
        const decisionVariables = [...state.decisionVariables];
        const removeIndex = decisionVariables.findIndex(d => d.id === e.id);
        decisionVariables.splice(removeIndex, 1);        
        const matrix = DecisionTableData.createMatrix(decisionVariables);        
        const columnsVisible = (matrix.length > 0) ? matrix[0].map(() =>true) : [];
        return { ...state, decisionVariables, matrix, columnsVisible };
    },
    [TOGGLE_COLUMN]: (state: DecisionTableState, action: Action<number>): DecisionTableState => {
        const columnsVisible = state.columnsVisible;
        columnsVisible[action.payload!] = !columnsVisible[action.payload!];
        return { ...state, columnsVisible }
    }
} as ReducerMap<DecisionTableState, IDecisionVariable>;


const reducer = handleActions<DecisionTableState, IDecisionVariable>(reducerMap, new DecisionTableState());

export default reducer;