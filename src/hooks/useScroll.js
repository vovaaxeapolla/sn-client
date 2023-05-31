import { useState, useEffect } from "react";
import useThrottle from "./useThrottle";
export default function useScroll(callback, ms) {
    
    const fn = useThrottle(callback, ms);

    useEffect(() => {
        window.addEventListener('scroll', (e) => fn(e), { passive: true });
        return () => {
            window.removeEventListener('scroll', (e) => fn(e));
        };
    }, []);
}