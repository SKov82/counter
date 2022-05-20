import React, {ChangeEvent} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
    ActionType,
    changeModeAC,
    increaseCountAC,
    resetCountAC,
    selectAll, setMaxCountAC,
    setMinCountAC
} from '../redux/counter-reducer';
import css from './Counter.module.css'
import {Dispatch} from 'redux';
import {Button} from './Button';

export const Counter: React.FC = () => {
    const {
        count,
        minCount,
        maxCount,
        isCounterMode
    } = useSelector(selectAll)

    const dispatch = useDispatch<Dispatch<ActionType>>()

    const changeCount = () => dispatch(increaseCountAC())
    const resetCount = () => dispatch(resetCountAC())
    const changeMode = () => dispatch(changeModeAC())
    const setMinCount = (e: ChangeEvent<HTMLInputElement>) => dispatch(setMinCountAC(+e.currentTarget.value))
    const setMaxCount = (e: ChangeEvent<HTMLInputElement>) => dispatch(setMaxCountAC(+e.currentTarget.value))

    const counterJSX = <>
        <div className={`${count >= maxCount ? `${css.red_text}` : ''} ${css.count}`}>
            {count}
        </div>

        <Button
            name={'inc'}
            disabled={count >= maxCount}
            func={changeCount}
            style={css.green_button}
        />
        <Button
            name={'reset'}
            disabled={count <= minCount}
            func={resetCount}
            style={css.red_button}
        />
        <Button
            name={'set'}
            disabled={false}
            func={changeMode}
            style={css.blue_button}
        />
    </>

    const settingsJSX = <>
        <div className={css.settings}>Начальное значение
            <input
                value={minCount}
                type="number"
                min={0}
                onChange={(e) => setMinCount(e)}
            />
        </div>

        <div className={css.settings}>Максимальное значение
            <input
                value={maxCount}
                type="number"
                min={minCount + 1}
                onChange={(e) => setMaxCount(e)}
            />
        </div>

        <Button
            name={'set'}
            disabled={false}
            func={changeMode}
            style={css.blue_button}
        />
    </>

    return (
        <div className={css.counter}>
            {isCounterMode ? counterJSX : settingsJSX}
        </div>
    )
};