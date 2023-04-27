import api, { API_URL } from "../http_ws/http";
import { AxiosResponse } from "axios";
import { IAccount } from "../interfaces/IAccount";
import { IUser } from "../interfaces/IUser";

export default class UsersService {

    static async getUser(nickname: string): Promise<AxiosResponse<IAccount>> {
        return await api.get<IAccount>(`${API_URL}/user/${nickname}`);
    }

    static async follow(id: string): Promise<AxiosResponse<any>> {
        return await api.get(`${API_URL}/user/follow/${id}`);
    }

    static async unfollow(id: string): Promise<AxiosResponse<any>> {
        return await api.get(`${API_URL}/user/unfollow/${id}`);
    }

    static async following(id: string): Promise<AxiosResponse<any>> {
        return await api.get(`${API_URL}/user/following/${id}`);
    }

    static async followersCount(id: string): Promise<AxiosResponse<{ count: string }>> {
        return api.get(`/user/${id}/followers/count`);
    }

    static async followingsCount(id: string): Promise<AxiosResponse<{ count: string }>> {
        return api.get(`/user/${id}/followings/count`);
    }

    static async followers(id: string): Promise<AxiosResponse<IUser[]>> {
        return api.get(`/user/${id}/followers`);
    }

    static async followings(id: string): Promise<AxiosResponse<IUser[]>> {
        return api.get(`/user/${id}/followings`);
    }

}