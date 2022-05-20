import {ACTIONS_TYPE, counterReducer, StateType} from './counter-reducer';

const startState: StateType = {
    count: 2,
    minCount: 0,
    maxCount: 5,
    isCounterMode: true
}

test('increasing the counter', () => {
    let endState = counterReducer(startState, {type: ACTIONS_TYPE.INCREASE_COUNT})

    expect(endState.count).toBe(startState.count + 1)
    expect(endState.minCount).toBe(startState.minCount)
    expect(endState.maxCount).toBe(startState.maxCount)
    expect(endState.isCounterMode).toBe(startState.isCounterMode)
})

test('reset the counter to minCount', () => {
    let endState = counterReducer(startState, {type: ACTIONS_TYPE.RESET_COUNT})

    expect(endState.count).toBe(startState.minCount)
    expect(endState.minCount).toBe(startState.minCount)
    expect(endState.maxCount).toBe(startState.maxCount)
    expect(endState.isCounterMode).toBe(startState.isCounterMode)
})

test('switching mode from Counter to Settings and back', () => {
    let endState = counterReducer(startState, {type: ACTIONS_TYPE.SWITCH_MODE})

    expect(endState.count).toBe(endState.minCount)
    expect(endState.minCount).toBe(startState.minCount)
    expect(endState.maxCount).toBe(startState.maxCount)
    expect(endState.isCounterMode).toBe(!startState.isCounterMode)
})