// custom hook that logs mounting, updating, and unmounting
import {useEffect, useRef} from 'react';

function useLogging(componentName = 'Component', props={}){
    const prevPropsRef = useRef(null);

    // log on mount
    useEffect(() => {
        console.log(`[${componentName}] mounted with props:`, props);

        // log on unmount, the cleanup function
        return() => {
            console.log(`[${componentName}] will unmount`);
        };
    },[]);


    // log on update
    useEffect(() => {
        // skip the first render to avoid duplicate logs, 
        // otherwise both "mounted" and "updated" message show on the initial render
        if(prevPropsRef.current){
            console.log(`[${componentName}] updated:`, {
                prevProps: prevPropsRef.current,
                currentProps: props,
            });
        }
        // update previous props reference
        prevPropsRef.current = props;

    }, [props,componentName])


}
export default useLogging;