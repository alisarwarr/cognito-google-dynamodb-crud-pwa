import React, { createContext, useContext, useReducer } from 'react';
import { initialState, reducer } from './contextapi';


const StateContext = createContext([]);


/*https://medium.com/@akrush95/global-cached-state-in-react-using-hooks-context-and-local-storage-166eacf8ab46*/
const localState =
typeof window!=='undefined'
?JSON.parse(localStorage.getItem("state"))
:'';


export function StateProvider({ children }) {
    const [ state, dispatch ] = useReducer(reducer, localState||initialState);

    React.useEffect(() => {
        localStorage.setItem("state", JSON.stringify(state));
    }, [state]);

    return (
        <StateContext.Provider
            value={[ state, dispatch ]}
        >
            { children }
        </StateContext.Provider>
    )
}


export const useStateValue = () => useContext(StateContext);