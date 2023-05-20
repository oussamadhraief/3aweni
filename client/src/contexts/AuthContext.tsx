import axios from "../utils/axiosConfig";
import { createContext, useState, useEffect, useReducer } from "react";
import { userInt } from "../utils/interfaces";

interface AuthContextType {
    user: userInt | null;
    logout: () => void;
    login: (user: userInt) => void;
}

interface LoadingAuthContextType {
    Loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AuthContext = createContext<AuthContextType | null>(null)
export const LoadingAuthContext = createContext<LoadingAuthContextType>({ Loading : true, setLoading: () => {}})

export const authReducer = (state: any,action: any) => {

    switch (action.type){
        case 'ADD':
            return {user: action.payload}
        case 'CLEAR':
            return {user: null}
        default: 
            return state
    }

}

export const AuthContextProvider = ({children}: { children: React.ReactNode | React.ReactNode[]}) => {
    const [state,dispatch] = useReducer(authReducer, {
        user: null
    })

    const [Loading, setLoading] = useState<boolean>(true)

    const login = (user: userInt) => {
        dispatch({ type: 'ADD', payload: user })
    }

    const logout = () => {
        dispatch({ type: 'CLEAR' })
    }
    

    return (
        <AuthContext.Provider value={{...state, logout, login}}>
            <LoadingAuthContext.Provider value={{ Loading, setLoading }}>
                {children}
            </LoadingAuthContext.Provider>
        </AuthContext.Provider>
    )
    
}