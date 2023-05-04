//initialState
export const initialState = {
    isSignedin: false,
    isConfirmedSignup: false,
    username: ""
}




//actionTypes
const SET_ISSIGNEDIN = "SET_ISSIGNEDIN";
const SET_ISCONFIRMEDSIGNUP = "SET_ISCONFIRMEDSIGNUP";
const SET_USERNAME = "SET_USERNAME";




//actions
export const settingISSIGNEDIN = (bool) => {
    return {
        type: SET_ISSIGNEDIN,
        payload: bool
    }
}
export const settingISCONFIRMEDSIGNUP = (bool) => {
    return {
        type: SET_ISCONFIRMEDSIGNUP,
        payload: bool
    }
}
export const settingUSERNAME = (bool) => {
    return {
        type: SET_USERNAME,
        payload: bool
    }
}




//reducer
/*https://medium.com/@akrush95/global-cached-state-in-react-using-hooks-context-and-local-storage-166eacf8ab46*/
export function reducer(state = initialState, action) {
    if (state === null) {
        localStorage.removeItem("state");
        return initialState;
    }


    switch (action.type) {
        case SET_ISSIGNEDIN:
            return {
                ...state,
                isSignedin: action.payload
            }

        case SET_ISCONFIRMEDSIGNUP:
            return {
                ...state,
                isConfirmedSignup: action.payload
            }

        case SET_USERNAME:
            return {
                ...state,
                username: action.payload
            }

        default:
            return state;
    }
}