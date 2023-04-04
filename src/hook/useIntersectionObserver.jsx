import { useEffect, useRef } from "react"

const useIntersectionObserver = ({ root, target, onIntersect, threshold = 0.1, rootMargin = "0px" }) => {
    useEffect(
        () => {
            if(!root || !target){
                return;
            }

            const observer = new IntersectionObserver(onIntersect, {
                root,
                rootMargin,
                threshold,
            });

            observer.observe(target);
            
            return () => {
                observer.disconnect();
            };
        }, [target, root, rootMargin, onIntersect, threshold]
    );
}

export default useIntersectionObserver;