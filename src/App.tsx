import React, {useState} from 'react';
import './App.css';
import {Counter} from './components/Counter';
import {Settings} from './components/Settings';

export type SettingsType = {
    minCount: number
    maxCount: number
    visible: boolean
}

function App() {
    const [settings, setSettings] = useState<SettingsType>(
        {minCount: 0, maxCount: 5, visible: true}
    )
    function changeSettings(minCount: number, maxCount: number) {
        setSettings({minCount: minCount, maxCount: maxCount, visible: !settings.visible})
    }

    return (
        <div className="App">
            {settings.visible
                ? <Counter settings={settings}
                           changeSettings={changeSettings}
                 />
                : <Settings settings={settings}
                            changeSettings={changeSettings}
                 />
            }
        </div>
    );
}

export default App;
