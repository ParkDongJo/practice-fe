import { useEffect } from 'react';

export default function useClickOutside(ref, callback) {
    useEffect(() => {
        const handleClick = e => {
            if (ref.current && !ref.current.contains(e.target)) {
                console.log('click outside');
                callback();
            }
        };

        document.addEventListener('click', handleClick);
        return () => {
            document.removeEventListener('click', handleClick);
        };
    }, [ref, callback]);
};