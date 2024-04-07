import React, { useEffect, useState } from 'react'


interface localStorageInterface<T>  {
    key: string,
    defaultValue: T 
}

export default function useLocalStorage<T>({key, defaultValue}: localStorageInterface<T>): [T, (value: T) => void]{

    const [value, setValue] = useState<T>(() => {
        const jsonValue = localStorage.getItem(key);
        if (jsonValue !== null) {
            return JSON.parse(jsonValue);
        }  else if (typeof defaultValue === "function") {
            return (defaultValue as () => T)();
        } else {
            return defaultValue as T;
        }

    })
    
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
}
