export default function debounce(callback: Function, ms: number) {
    let timeoutId: NodeJS.Timeout;
    return function (this: any, ...args: any[]) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => callback.apply(this, args), ms);
    }
}
