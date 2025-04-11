'use client'
import { useCallback, useRef } from "react";

const useDebounce = ( timeout: number = 500, cb: (...args: any) => void ) => {

    const timer = useRef<number | null>(null);

    const debouncer = useCallback((...args: any[]) => {

        if(timer.current){
            clearTimeout(timer.current)
        }

        timer.current = window.setTimeout(() => {
            cb(...args)
        }, timeout, cb)


    }, [timer]);

    return debouncer
};

export default useDebounce;