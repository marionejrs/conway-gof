import { MutableRefObject, useState, useEffect } from 'react';
import ElementSize from '../models/ElementSize';

export default function useElementSize(ref : MutableRefObject<HTMLDivElement | null>) : ElementSize {
    let [ width, setWidth ] = useState<number>(ref.current ? ref.current.clientWidth : 0);
    let [ height, setHeight ] = useState<number>(ref.current ? ref.current.clientHeight : 0);

    let handleResize = () => {
        setWidth(ref.current ? ref.current.clientWidth : 0);
        setHeight(ref.current ? ref.current.clientHeight : 0);
    }

    useEffect(() => {
        handleResize();
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return {
        width, height
    }
}