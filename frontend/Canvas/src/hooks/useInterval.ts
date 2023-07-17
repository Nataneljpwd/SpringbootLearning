import { useEffect, useRef } from "react";

const useInterval = (callback: () => void, delay: number) => {//the delay in seconds
    const savedCallback = useRef<() => void>();
    // Remember the latest callback.
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback])
    // Set up the interval.
    useEffect(() => {
        function tick() {
            if (savedCallback.current)
                savedCallback.current();
        }
        if (delay !== null) {
            let id = setInterval(tick, delay * 1000);
            return () => clearInterval(id);
        }
    })
}
export default useInterval;
