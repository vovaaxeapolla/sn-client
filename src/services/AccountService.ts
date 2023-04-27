import api, { API_URL } from "../http_ws/http";
import axios from "axios";
import { AxiosResponse } from "axios";
import { IAccount } from "../interfaces/IAccount";

export default class AccountService {

    static async changePassword(oldPassword: string, newPassword: string): Promise<void> {
        return api.post('/password/change', { oldPassword, newPassword });
    }

    static async deleteAvatar(): Promise<AxiosResponse<IAccount>> {
        return api.delete('/avatar');
    }

    static async changeAvatar(formData: FormData): Promise<AxiosResponse<IAccount>> {
        return api.post('/avatar', formData);
    }

    static async changePersonalInfo(fullname: string, nickname: string): Promise<AxiosResponse<IAccount>> {
        return api.post('/user', { fullname, nickname });
    }

}