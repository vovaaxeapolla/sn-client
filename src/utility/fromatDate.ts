export default function formatDate(timestamp: string | number) {
    let date = new Date(+timestamp * 1000);
    let formated = `${(date.getDate() + "").padStart(2, '0')}.${(date.getMonth() + 1 + "").padStart(2, '0')}.${date.getFullYear()}`;
    return formated;
}
