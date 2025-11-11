export interface UserResponse {
    id_user: number;
    username: string;
    email: string;
    password: string;
    image: string;
    update: string;
}

export type RequestLogin = UserResponse | false;