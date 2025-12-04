import { AuthState } from "./authContext";

type AuthAction =
    | { type: "signIn" }
    | { type: "logout" }
    | { type: "changeFavoriteImage", payload: string }
    | { type: "changeUsername", payload: string }
    | { type: "changeEmail", payload: string };

export const authReducer = (state: AuthState, action: AuthAction) => {

    switch (action.type) {
        case "signIn":
            return {
                ...state,
                isLoggedIn: true,
                username: "no_name_user_yet"
            };
        case "logout":
            return {
                ...state,
                isLoggedIn: false,
                username: undefined,
                favoriteImage: undefined,
                email: undefined,
            };
        case "changeFavoriteImage":
            return {
                ...state,
                favoriteImage: action.payload
            };
        case "changeUsername":
            return {
                ...state,
                username: action.payload
            };
        case "changeEmail":
            return {
                ...state,
                email: action.payload
            };
    }

}