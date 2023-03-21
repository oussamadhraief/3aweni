import { createContext, ReactNode, useReducer } from "react";

export const AuthContext = createContext({user: null})

export const authReducer = (state: any,action: any) => {
    switch (action.type){
        case 'LOGIN':
            return {user: action.payload}
        case 'LOGOUT':
            return {user: null}
        default: 
            return state
    }
        
}

export const AuthContextProvider = ({children}: { children: any}) => {
    const [state,dispatch] = useReducer(authReducer, {
        user: null
    })

    console.log('AuthContext state: ',state)

    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            {children}
        </AuthContext.Provider>
    )
    
}