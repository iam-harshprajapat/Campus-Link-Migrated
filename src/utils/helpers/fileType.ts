export function mapMimeToType(mime: string | undefined): string {
    if (!mime) return 'unknown'

    const m = mime.toLowerCase()

    if (m === 'application/pdf') return 'pdf'
    if (m.includes('word') || m === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || m === 'application/msword') return 'docx'
    if (m === 'application/vnd.ms-powerpoint' || m === 'application/vnd.openxmlformats-officedocument.presentationml.presentation' || m.includes('presentation')) return 'ppt'
    if (m === 'application/vnd.ms-excel' || m === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') return 'xls'
    if (m.startsWith('image/jpeg')) return 'jpeg'
    if (m.startsWith('image/png')) return 'png'
    if (m.startsWith('image/')) return m.split('/')[1]

    if (m.includes('pptx')) return 'ppt'
    if (m.includes('docx')) return 'docx'
    if (m.includes('xls')) return 'xls'

    return 'unknown'
}
