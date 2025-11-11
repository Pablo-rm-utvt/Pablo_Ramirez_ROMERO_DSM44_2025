import React, { createContext, useReducer, ReactNode } from "react";
import { authReducer } from "./authReducer";

// Definir estractura del estado del Context
export interface AuthState {
    isLoggedIn: boolean;
    username: string | undefined;
    favoriteImage: string | undefined;
    email: string | undefined;
}

// Definir estado inicial de Context
export const AuthInitialState = {
    isLoggedIn: false,
    username: undefined,
    favoriteImage: undefined,
    email: undefined,
}

// Exportación de métodos y atributos del Context
export interface AuthContextProps {
    authState: AuthState;
    signIn: () => void;
    logout: () => void;
    changeUsername: (username: string) => void;
    changeFavoriteImage: (image: string) => void;
    changeEmail: (email: string) => void;
}

// Creación de Context
export const AuthContext = createContext({} as AuthContextProps);

// Creación de provider
export const AuthProvider = ({ children }: { children: ReactNode }) => {

    // Reducer
    const [authState, dispatch] = useReducer(authReducer, AuthInitialState);

    const signIn = () => dispatch({ type: "signIn" });

    const logout = () => dispatch({ type: "logout" });

    const changeFavoriteImage = (image: string) => {
        dispatch({ type: "changeFavoriteImage", payload: image })
    }

    const changeEmail = (email: string) => {
        dispatch({ type: "changeEmail", payload: email })
    }

    const changeUsername = (username: string) => {
        dispatch({ type: "changeUsername", payload: username })
    }

    return (
        <AuthContext.Provider
            value={{
                authState,
                signIn,
                logout,
                changeFavoriteImage,
                changeEmail,
                changeUsername
            }}
        >
            {children}
        </AuthContext.Provider>
    );


}