import {AppStateType} from './store';

export enum ACTIONS_TYPE {
    INCREASE_COUNT = 'INCREASE_COUNT',
    RESET_COUNT = 'RESET_COUNT',
    SWITCH_MODE = 'SWITCH_MODE',
    SET_MIN_COUNT = 'SET_MIN_COUNT',
    SET_MAX_COUNT = 'SET_MAX_COUNT',
}

export type ActionType = {
    type: ACTIONS_TYPE
    value?: number
}

export type StateType = {
    count: number
    minCount: number
    maxCount: number
    isCounterMode: boolean
}

const initialState: StateType = {
    count: 0,
    minCount: 0,
    maxCount: 5,
    isCounterMode: true
}

export const counterReducer = (state: StateType = initialState, action: ActionType): StateType => {
    switch (action.type) {
        case ACTIONS_TYPE.INCREASE_COUNT:
            return {...state, count: state.count + 1}
        case ACTIONS_TYPE.RESET_COUNT:
            return {...state, count: state.minCount}
        case ACTIONS_TYPE.SWITCH_MODE:
            return {...state, isCounterMode: !state.isCounterMode, count: state.minCount}
        case ACTIONS_TYPE.SET_MIN_COUNT:
            return (action.value !== undefined) ? {
                ...state,
                minCount: action.value,
                maxCount: (action.value >= state.maxCount) ? action.value + 1 : state.maxCount
            } : state
        case ACTIONS_TYPE.SET_MAX_COUNT:
            return (action.value) ? {
                ...state,
                minCount: state.minCount,
                maxCount: (action.value > state.minCount) ? action.value : state.maxCount
            } : state
        default:
            return state
    }
}

export const increaseCountAC = (): ActionType => ({type: ACTIONS_TYPE.INCREASE_COUNT})
export const resetCountAC = (): ActionType => ({type: ACTIONS_TYPE.RESET_COUNT})
export const changeModeAC = (): ActionType => ({type: ACTIONS_TYPE.SWITCH_MODE})
export const setMinCountAC = (value: number): ActionType => ({type: ACTIONS_TYPE.SET_MIN_COUNT, value: value})
export const setMaxCountAC = (value: number): ActionType => ({type: ACTIONS_TYPE.SET_MAX_COUNT, value: value})

export const selectAll = (store: AppStateType) => store.counter