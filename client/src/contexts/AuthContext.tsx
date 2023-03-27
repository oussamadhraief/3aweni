import axios from "axios";
import { createContext, ReactNode, useEffect, useReducer } from "react";

interface userInt {
    id: string;
    name: string;
    phone: string;
    email: string;
    // role: string;
  }

interface AuthContextType {
    user: userInt | null;
    logout: () => void;
    login: (user: userInt) => void;
}

export const AuthContext = createContext<AuthContextType | null>(null)

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

    useEffect(() => {
        axios.get('/api/user',
        { withCredentials: true })
        .then((res) => {
            
            const { data: { user } } = res
            
            if(user){ 
                dispatch({ type: 'ADD', payload: user })
            }
            
            
        })
    }, [])

    const login = (user: userInt) => {
        dispatch({ type: 'ADD', payload: user })
    }

    const logout = () => {
        dispatch({ type: 'CLEAR' })
    }
    

    return (
        <AuthContext.Provider value={{...state, logout, login}}>
            {children}
        </AuthContext.Provider>
    )
    
}