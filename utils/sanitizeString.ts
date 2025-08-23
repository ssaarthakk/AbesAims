export default function removePreTags(str: string): string {
    return str.replace(/<pre.*?>.*?<\/pre>/gs, '');
}