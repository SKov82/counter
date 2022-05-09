import {StateType, reducer} from './Settings';

test('reducer in settings component test', () => {
    let startState: StateType = {
        minCount: 0,
        maxCount: 5
    }

    let endState = reducer(startState, {type: 'minCount', value: 1})

    expect(endState.minCount).toBe(1)
})