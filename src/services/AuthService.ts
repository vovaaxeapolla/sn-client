import api from "../http_ws/http";
import { AxiosResponse } from 'axios';
import { AuthResponse } from "../interfaces/response/AuthResponse";


export default class AuthService {

    static async signin(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return api.post<AuthResponse>('/signin', { email, password });
    }

    static async signup(email: string, fullname: string, nickname: string, password: string) {
        return api.post<AuthResponse>('/signup', { email, fullname, nickname, password });
    }

    static async logout(): Promise<void> {
        return api.post('/logout')
    }

}