import { makeAutoObservable } from "mobx";
import { IAccount } from "../interfaces/IAccount";
import AuthService from "../services/AuthService";
import axios, { AxiosResponse } from "axios"
import { AuthResponse } from "../interfaces/response/AuthResponse";
import { API_URL } from "../http_ws/http";
import AccountService from "../services/AccountService";

export default class UserStore {
    user = {} as IAccount;
    isAuth = false;
    isLoading = true;

    constructor() {
        makeAutoObservable(this);
    }

    setAuth(bool: boolean) {
        this.isAuth = bool;
    }

    setUser(user: IAccount) {
        this.user = user;
    }

    setLoading(bool: boolean) {
        this.isLoading = bool;
    }

    async signin(email: string, password: string) {
        try {
            const response = await AuthService.signin(email, password);
            localStorage.setItem('accessToken', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
            return response;
        } catch (e: any) {
            return e.response?.data?.message;
        }
    }

    async signup(email: string, fullaname: string, nickname: string, password: string) {
        try {
            const response = await AuthService.signup(email, fullaname, nickname, password);
            localStorage.setItem('accessToken', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
            return response;
        } catch (e: any) {
            return e.response?.data?.message;
        }
    }

    async logout() {
        try {
            await AuthService.logout();
            localStorage.removeItem('accessToken');
            this.setAuth(false);
            this.setUser({} as IAccount);
        } catch (e: any) {
            return e.response?.data?.message;
        }
    }

    async checkAuth() {
        this.setLoading(true);
        try {
            const req = async (): Promise<AxiosResponse<AuthResponse>> => {
                const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, { withCredentials: true });
                localStorage.setItem('accessToken', response.data.accessToken);
                this.setAuth(true);
                return response;
            }
            const res = await req();
            this.setUser(res.data.user);
            setInterval(req, 30 * 60 * 1000);
        } catch (e: any) {
            return e.response?.data?.message;
        } finally {
            this.setLoading(false)
        }
    }

    async resetPassword(email: string) {
        try {
            await axios.post(`${API_URL}/password/reset`, { email }, { withCredentials: true });
        } catch (e: any) {
            return e.response?.data?.message;
        }
    }

    async changePassword(oldPassword: string, newPassword: string) {
        try {
            await AccountService.changePassword(oldPassword, newPassword);
        } catch (e: any) {
            return e.response?.data?.message;
        }
    }

    async changePersonalInfo(fullname: string, nickname: string) {
        try {
            const response = await AccountService.changePersonalInfo(fullname, nickname);
            this.setUser(response.data);
        } catch (e: any) {
            return e.response?.data?.message;
        }
    }

}