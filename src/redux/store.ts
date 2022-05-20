import {counterReducer} from './counter-reducer';
import {combineReducers, createStore} from 'redux';

export type AppStateType = ReturnType<typeof rootReducer>

const rootReducer = combineReducers({
    counter: counterReducer
})

const counter = localStorage.getItem('counter')
let preloadedState = counter ? JSON.parse(counter) : undefined

export const store = createStore(rootReducer, preloadedState)

store.subscribe(() => {
    localStorage.setItem('counter', JSON.stringify(store.getState()))
})