import { IAccount } from "../IAccount"

export interface AuthResponse {
    accessToken: string
    refreshToken: string
    user: IAccount
}