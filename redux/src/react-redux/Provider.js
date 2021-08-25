import React from 'react';
import ReactReduxtContext from './ReactReduxContext';

export default function Provider(props) {
    return (
        <ReactReduxtContext.Provider value={{store: props.store}}>
            {props.children}
        </ReactReduxtContext.Provider>
    )
}