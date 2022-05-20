import {AppStateType} from './store';

export enum ACTIONS_TYPE {
    INCREASE_COUNT = 'INCREASE_COUNT',
    RESET_COUNT = 'RESET_COUNT',
    SWITCH_MODE = 'SWITCH_MODE',
    SET_MIN_COUNT = 'SET_MIN_COUNT',
    SET_MAX_COUNT = 'SET_MAX_COUNT',
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
            return {
                ...state,
                // @ts-ignore
                minCount: action.minCount,
                // @ts-ignore
                maxCount: (action.minCount >= state.maxCount)
                    // @ts-ignore
                    ? action.minCount + 1
                    : state.maxCount
            }
        case ACTIONS_TYPE.SET_MAX_COUNT:
            return {
                ...state,
                minCount: state.minCount,
                // @ts-ignore
                maxCount: (action.maxCount > state.minCount)
                    // @ts-ignore
                    ? action.maxCount
                    : state.maxCount
            }
        default:
            return state
    }
}

type IncreaseCountACType = ReturnType<typeof increaseCountAC>
export const increaseCountAC = () => ({type: ACTIONS_TYPE.INCREASE_COUNT})

type ResetCountACType = ReturnType<typeof resetCountAC>
export const resetCountAC = () => ({type: ACTIONS_TYPE.RESET_COUNT})

type changeModeACType = ReturnType<typeof changeModeAC>
export const changeModeAC = () => ({type: ACTIONS_TYPE.SWITCH_MODE})

type setMinCountACType = ReturnType<typeof setMinCountAC>
export const setMinCountAC = (value: number) => ({type: ACTIONS_TYPE.SET_MIN_COUNT, minCount: value})

type setMaxCountACType = ReturnType<typeof setMaxCountAC>
export const setMaxCountAC = (value: number) => ({type: ACTIONS_TYPE.SET_MAX_COUNT, maxCount: value})

export type ActionType = IncreaseCountACType | ResetCountACType | changeModeACType | setMinCountACType | setMaxCountACType

export const selectAll = (store: AppStateType) => store.counter