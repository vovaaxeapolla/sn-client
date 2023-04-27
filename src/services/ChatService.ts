import api from "../http_ws/http";
import { AxiosResponse } from 'axios';
import { IUser } from "../interfaces/IUser";
import { IMessage } from "../interfaces/IMessage";
import { DialogResponse } from "../interfaces/response/DialogResponse";

export default class ChatService {

    static async sendMessage(id: string, msg: string): Promise<void> {
        return api.post(`/chat/dialog/${id}/publish`, { msg: msg });
    }

    static getMessage(id: string, signal: AbortSignal): Promise<AxiosResponse<IMessage>> {
        return api.post<IMessage>(`/chat/dialog/${id}/subscribe`, {}, { signal: signal });
    }

    static getHistory(id: string, offset: number): Promise<AxiosResponse<IMessage[]>> {
        return api.post<IMessage[]>(`/chat/dialog/${id}/history`, { offset });
    }

    static async accounts(searchQuery: string): Promise<AxiosResponse<IUser[]>> {
        return api.get<IUser[]>('/chat/accounts?searchQuery=' + searchQuery);
    }

    static async createChat(nickname: string): Promise<AxiosResponse<{ chatId: string }>> {
        return api.post<{ chatId: string }>('/chat/dialog', { nickname });
    }

    static async getDialogs(id: string): Promise<AxiosResponse<DialogResponse[]>> {
        return api.get<DialogResponse[]>('/chat/dialogs/' + id);
    }

    static async getDialog(id: string): Promise<AxiosResponse<DialogResponse>> {
        return api.get<DialogResponse>('/chat/dialog/' + id);
    }

}

