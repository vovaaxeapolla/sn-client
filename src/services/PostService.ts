import api from "../http_ws/http";
import { AxiosResponse } from 'axios';
import { PostResponse } from "../interfaces/response/PostResponse";

export default class PostService {

    static async create(formData: FormData): Promise<void> {
        return api.post('/posts', formData);
    }

    static async getAll(): Promise<AxiosResponse<PostResponse[]>> {
        return api.get<PostResponse[]>('/posts');
    }

    static async delete(id: string): Promise<AxiosResponse<PostResponse[]>> {
        return api.delete<PostResponse[]>('/posts/' + id);
    }

    static async getPostsCount(id: string): Promise<AxiosResponse<{ count: string }>> {
        return api.get(`/posts/user/${id}/count`);
    }
}