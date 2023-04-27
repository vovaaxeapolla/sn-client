import { IUser } from "./IUser"

export interface IAccount extends IUser {
    email: string
    isActivated: boolean
    id: string
}