import { useEffect, useState } from "react";
import debounce from "../libs/debouce";

const useWindowDimensions = () => {
    const getWindowSize = () => {
        return {
            width: window.innerWidth,
            height: window.innerHeight,
        }
    }

    const [windowSize, setWindowSize] = useState(getWindowSize);
    
    useEffect(() => {
        const handleResizeDebounced = debounce(() => {
            setWindowSize(getWindowSize());
        }, 300);

        window.addEventListener('resize', handleResizeDebounced);
        return () => window.removeEventListener('resize', handleResizeDebounced);
       
    }, []);

    return windowSize;
}

export default useWindowDimensions;
