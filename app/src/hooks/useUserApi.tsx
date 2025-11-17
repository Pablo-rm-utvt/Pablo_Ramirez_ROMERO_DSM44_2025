import { useEffect, useState } from "react";
import { myApi } from "../api/myApi";
import { UserResponse } from "../interfaces/userInterfaces";
import { FormUserData } from "./useFormUser";

interface UseUserApi {
    isLoading: boolean;
    listUser: UserResponse;
    loadUsers: () => void;
    createUser: (data: FormUserData) => void;
    updateUser: (data: FormUserData) => void;
    deleteUser: (data: FormUserData) => void;
}

export const useUserApi = (): UseUserApi => {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [listUser, setListUser] = useState<UserResponse>({} as UserResponse);
    const urlApi = "http://192.168.100.132:3000/api/dsm44/usuarios";

    const loadUsers = async () => {
        setIsLoading(true);
        const response = await myApi.get<UserResponse>(urlApi);
        setListUser(response.data);
        setIsLoading(false);
    }

    useEffect(() => {
        loadUsers();
    }, []);

    const createUser = async (data: FormUserData) => {
        const dataBody = {
            username: data.username,
            password: data.password,
            email: data.email,
            image: data.image,
        }
        await myApi.post(urlApi, dataBody);
    }

    const updateUser = async (data: FormUserData) => {
        const dataBody = {
            username: data.username,
            email: data.email,
            image: data.image,
            ...(data.password && { password: data.password }),
        }
        await myApi.patch(`${urlApi}/${data.id_user}`, dataBody);
    };

    const deleteUser = async (data: FormUserData) => {
        await myApi.delete(urlApi + `/${data.id_user}`);
    }

    return { isLoading, listUser, loadUsers, createUser, updateUser, deleteUser };
}