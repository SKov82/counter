import React, {useEffect, useState} from 'react';
import css from './Counter.module.css'
import {Button} from './Button';
import {SettingsType} from '../App';

type CounterPropsType = {
    settings: SettingsType
    changeSettings: (minCount: number, maxCount: number) => void
}

export function Counter({settings, changeSettings}: CounterPropsType) {
    let savedCount = localStorage.getItem('count')
    let [count, setCount] = useState<number>(
        savedCount
            ? JSON.parse(savedCount)
            : settings.minCount
    )

    function changeCount(name: string) {
        name === 'inc' ? setCount(++count) : setCount(settings.minCount)
    }

    function setSettings() {
        changeSettings(settings.minCount, settings.maxCount)
    }

    useEffect(() => {
        localStorage.setItem('count', count.toString())
    }, [count])

    return (
        <div className={css.counter}>
            <div className={ count >= settings.maxCount ? `${css.red_text}` : '' }>
                {count}
            </div>

            <Button
                name={'inc'}
                disabled={count >= settings.maxCount}
                func={changeCount}
                style={css.green_button}
            />
            <Button
                name={'reset'}
                disabled={count <= settings.minCount}
                func={changeCount}
                style={css.red_button}
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
