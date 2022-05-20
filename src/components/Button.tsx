import React from 'react';

type ButtonType = {
    name: string
    disabled: boolean
    func: (name: string) => void
    style: string
}

export function Button({name, disabled, func, style}: ButtonType) {
    return (
        <button disabled={disabled}
                onClick={ () => {func(name)} }
                className={style}
        >
            {name}
        </button>
    );
}