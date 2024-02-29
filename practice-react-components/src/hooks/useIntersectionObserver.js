import { useRef } from 'react';

export default function useIntersectionObserver(callback) {
    const observer = useRef(
        new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    callback();
                }
            });
        })
    );

    const observe = (target) => {
        observer.current.observe(target);
    }
    const unobserve = (target) => {
        observer.current.unobserve(target);
    }
    const disconnect = () => {
        observer.current.disconnect();
    }

    return { observe, unobserve, disconnect };
}
