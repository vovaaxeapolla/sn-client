export default interface Post {
    id: number;
    date: string;
    text: string;
    image: string | null;
    name: string | null;
    surname: string | null;
    nickname: string;
    avatar: string;
}