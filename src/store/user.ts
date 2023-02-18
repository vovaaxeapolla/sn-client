import IUser from "../models/IUser";
import { makeAutoObservable } from "mobx";

export default class User {
    private User = {} as IUser;
    private isAuth = false;

    constructor() {
        const auth = localStorage.getItem('isAuth')
        this.isAuth = auth ? JSON.parse(auth) : false;
        makeAutoObservable(this);
    }

    private setAuth(bool: boolean) {
        this.isAuth = bool;
    }

    private setUser(user: IUser) {
        this.User = user;
    }

    public get auth() {
        return this.isAuth;
    }

    public get user() {
        return this.User;
    }

    async signup(email: string, password: string, name: string, surname: string) {
        try {
            const result = await fetch(
                '/auth/registration', {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: email, password: password, name: name, surname: surname })
            });
            if (result.status === 200) {
                localStorage.setItem('isAuth', 'true');
                this.setAuth(true);
                const data = await result.json();
                this.setUser(data);
            }
        } catch (e) {
            console.log(e);
        }
    }

    async login(email: string, password: string) {
        try {
            const result = await fetch(
                '/auth/login', {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: email, password: password })
            });
            if (result.status === 200) {
                localStorage.setItem('isAuth', 'true');
                this.setAuth(true);
                const data = await result.json();
                this.setUser(data);
            }
        } catch (e) {
            console.log(e);
        }
    }

    async logout() {
        try {
            const result = await fetch('/auth/logout');
            if (result.status === 200) {
                localStorage.setItem('isAuth', 'false');
                this.setAuth(false);
                this.setUser({ name: null, surname: null, nickname: null, avatar: "" });
            }
        } catch (e) {
            console.log(e);
        }
    }

    async checkAuth() {
        const data = await fetch('/auth/isauth');
        if (data.status !== 200) {
            localStorage.setItem('isAuth', 'false');
            this.setAuth(false)
        } else {
            localStorage.setItem('isAuth', 'true');
            const json = await data.json();
            console.log(json);
            this.setUser(json);
            this.setAuth(true);
        }
    }

    async updateUser(nickname: string, avatar: File) {
        const formData = new FormData();
        formData.append('avatar', avatar);
        const result = await fetch(
            `/user/update/${nickname}`, {
            method: 'post',
            body: formData
        });
    }

}