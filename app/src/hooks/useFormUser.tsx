import { useReducer } from "react";
import { useUserApi } from "./useUserApi";

export interface FormUserData {
    id_user: number;
    username: string;
    password: string;
    email: string;
    image: string;
    update: string;
}

interface UseFormUser {
    state: FormUserData;
    handleInputChange: (fieldName: keyof FormUserData, value: string | number) => void;
    handleSubmit: () => void;
    handleDelete: () => void;
}

export const useFormUser = (): UseFormUser => {

    const { createUser, deleteUser, updateUser } = useUserApi();

    const initialForm: FormUserData = {
        id_user: 0,
        username: "",
        password: "",
        email: "",
        image: "",
        update: "",
    }

    type Action = { type: "handleInputChange", payload: { fieldName: keyof FormUserData, value: string | number } };

    const formReducer = (state: FormUserData, action: Action) => {
        switch (action.type) {
            case "handleInputChange":
                return {
                    ...state,
                    [action.payload.fieldName]: action.payload.value
                }
        }
    }

    const [state, dispatch] = useReducer(formReducer, initialForm);

    const handleInputChange = (fieldName: keyof FormUserData, value: string | number) => {
        dispatch({ type: "handleInputChange", payload: { fieldName, value } });
    }

    const handleSubmit = () => (state.id_user === 0) ? createUser(state) : updateUser(state);

    const handleDelete = () => deleteUser(state);

    return { state, handleInputChange, handleSubmit, handleDelete };

}