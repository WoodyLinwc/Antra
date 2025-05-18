// HOC that logs mounting, updating, and unmounting
import React from 'react';

function withLogging(WrappedComponent, componentName = 'Component'){
    class WithLogging extends React.Component{

        componentDidMount(){
            console.log(`[${componentName}] mounted with props:`, this.props);
        }

        componentDidUpdate(prevProps){
            console.log(`[${componentName}] updated:`, {
                prevProps,
                currentProps: this.props,
            });
        }

        componentWillUnmount(){
            console.log(`[${componentName}] will unmount`)
        }

        render(){
            return <WrappedComponent {...this.props} />
        }
    }

    // set display name for debugging in React's DevTools to show meaningful component names
    const displayName = WrappedComponent.displayName || WrappedComponent.name || componentName;
    WithLogging.displayName = `withLogging(${displayName})`;

    return WithLogging;

}

export default withLogging;