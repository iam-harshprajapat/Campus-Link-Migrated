export function formatBytes(bytes: number): string {
    if (!bytes || bytes <= 0) return "0.00 KB";

    // Less than 1 MB → show KB
    if (bytes < 1024 * 1024) {
        const kb = bytes / 1024;
        const truncated = Math.floor(kb * 100) / 100;
        return `${truncated.toFixed(2)} KB`;
    }

    // 1 MB and above → show MB
    const mb = bytes / (1024 * 1024);
    const truncated = Math.floor(mb * 100) / 100;
    return `${truncated.toFixed(2)} MB`;
}
