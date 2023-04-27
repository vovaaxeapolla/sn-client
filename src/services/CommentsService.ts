import api from "../http_ws/http";
import { AxiosResponse } from 'axios';
import { IComment } from "../interfaces/IComment";

export default class CommentsService {

    static async create(post_id: string, value: string | null): Promise<void> {
        return api.post('/comment', { post_id, text: value });
    }

    static async getAll(post_id: string): Promise<AxiosResponse<IComment[]>> {
        return api.get<IComment[]>('/comment/' + post_id);
    }

}