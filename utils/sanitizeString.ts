export default function removePreTags(str: string): string {
    // Remove <pre> tags and their content
    return str.replace(/<pre.*?>.*?<\/pre>/gs, '');
}