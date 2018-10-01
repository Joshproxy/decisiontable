import { Action, handleActions, ReducerMap } from 'redux-actions';
import { DecisionTableData } from '../models/DecisionTableData';
import { DecisionTableState } from '../models/DecisionTableState';
import { IDecisionVariable } from '../models/DecisionVariable';
import { ADD_VARIABLE, CLEAR, EDIT_VARIABLE, REMOVE_VARIABLE, TOGGLE_COLUMN } from './actions';

const reducerMap = {
    [ADD_VARIABLE]: (state: DecisionTableState, action: Action<IDecisionVariable>): DecisionTableState => {
        const decisionVariables = [...state.decisionVariables, action.payload! ];
        const matrix = DecisionTableData.createMatrix(decisionVariables);
        const columnsVisible = matrix[0].map(() =>true);
        return { ...state, decisionVariables, matrix, columnsVisible};        
    },
    [CLEAR]: (state: DecisionTableState): DecisionTableState => {
        return { ...state, decisionVariables: [], matrix: [], columnsVisible: [] };
    },
    [EDIT_VARIABLE]: (state: DecisionTableState, action: Action<IDecisionVariable>): DecisionTableState => {
        const e = action.payload!;
        return { ...state, decisionVariables: state.decisionVariables.map(v => v.index === e.index ? e : v) };
    },
    [REMOVE_VARIABLE]: (state: DecisionTableState, action: Action<IDecisionVariable>): DecisionTableState => {
        const e = action.payload!;
        const removedArray = state.decisionVariables.slice(e.index, 1);
        const decisionVariables = removedArray.map((d, i) => {
            d.index = i;
            return d;
        });
        const matrix = DecisionTableData.createMatrix(decisionVariables);        
        const columnsVisible = state.columnsVisible.splice(e.index, 1);
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