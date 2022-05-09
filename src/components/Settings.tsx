import React, {useReducer} from 'react';
import css from './Counter.module.css';
import {SettingsType} from '../App';
import {Button} from './Button';

type SettingsPropsType = {
    settings: SettingsType
    changeSettings: (minCount: number, maxCount: number) => void
}

type StateType = {
    minCount: number
    maxCount: number
}

type ActionType = {
    type: string
    value: number
}

type ReducerType = {
    reducer: (state: StateType, action: ActionType) => StateType
}

const Settings: React.FC<SettingsPropsType> = ({settings, changeSettings}) => {
    function reducer(state: StateType, action: ActionType): StateType {
        switch (action.type) {
            case 'minCount':
                return {
                    minCount: action.value,
                    maxCount: (action.value >= state.maxCount)
                        ? ++action.value
                        : state.maxCount
                }
            case 'maxCount':
                return {
                    minCount: state.minCount,
                    maxCount: (action.value > state.minCount)
                        ? action.value
                        : state.maxCount
                }
            default:
                throw new Error('Unknown action type')
        }
    }
    const [state, dispatch] = useReducer(reducer, {
        minCount: settings.minCount,
        maxCount: settings.maxCount
    });

    function setSettings() {
        localStorage.clear()
        changeSettings(state.minCount, state.maxCount)
    }

    return (
        <div className={css.counter}>

            <span>Начальное значение</span>
            <input value={state.minCount}
                   type="number"
                   min={0}
                   onChange={ (e) => {
                       dispatch( {type: 'minCount', value: +e.currentTarget.value} )
                   }}
            />

            <span>Максимальное значение</span>
            <input value={state.maxCount}
                   type="number"
                   min={state.minCount + 1}
                   onChange={ (e) => {
                       dispatch( {type: 'maxCount', value: +e.currentTarget.value} )
                   }}
            />

            <Button
                name={'set'}
                disabled={false}
                func={setSettings}
                style={css.blue_button}
            />
        </div>
    )
}

export default Settings;