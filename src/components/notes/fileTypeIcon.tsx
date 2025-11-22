import PdfIcon from "@/assets/fileIcons/PDF.svg"
import DocxIcon from "@/assets/fileIcons/DOCX.svg"
import PptIcon from "@/assets/fileIcons/PPT.svg"
import XlsIcon from "@/assets/fileIcons/XLS.svg"
import JpgIcon from "@/assets/fileIcons/JPG.svg"
import DefaultIcon from "@/assets/fileIcons/default.svg"
import PngIcon from "@/assets/fileIcons/PNG.svg"
interface FileTypeIconProps {
    type: string
    size?: number
}

export default function FileTypeIcon({ type, size = 24 }: FileTypeIconProps) {
    const icons: Record<string, any> = {
        pdf: PdfIcon,
        docx: DocxIcon,
        ppt: PptIcon,
        xls: XlsIcon,
        jpg: JpgIcon,
        jpeg: JpgIcon,
        png: PngIcon,
    }

    const Icon = icons[type] || DefaultIcon

    return <Icon width={size} height={size} />
}
