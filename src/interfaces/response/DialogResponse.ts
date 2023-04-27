import { IUser } from "../IUser"

export interface DialogResponse extends IUser {
    id: string
    text: string
    date: number
}