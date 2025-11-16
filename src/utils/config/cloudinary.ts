export type CloudinaryResult = {
    secure_url: string
    bytes?: number
    format?: string
    public_id?: string
}

export async function uploadToCloudinary(
    file: File,
    onProgress?: (pct: number) => void
): Promise<CloudinaryResult> {

    if (!file) throw new Error("No file provided")

    const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
    const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET

    if (!CLOUD_NAME) throw new Error("Cloudinary cloud name is missing")
    if (!UPLOAD_PRESET) throw new Error("Cloudinary upload preset is missing")

    const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`

    const form = new FormData()
    form.append("file", file)
    form.append("upload_preset", UPLOAD_PRESET)

    return await new Promise<CloudinaryResult>((resolve, reject) => {
        const xhr = new XMLHttpRequest()
        xhr.open("POST", url)

        // Upload progress
        xhr.upload.onprogress = (event) => {
            if (event.lengthComputable && typeof onProgress === "function") {
                const pct = Math.round((event.loaded / event.total) * 100)
                onProgress(pct)
            }
        }

        xhr.onerror = () => reject(new Error("Upload failed"))

        xhr.onload = () => {
            try {
                const res = JSON.parse(xhr.responseText)

                if (xhr.status >= 200 && xhr.status < 300) {
                    resolve({
                        secure_url: res.secure_url,
                        bytes: res.bytes,
                        format: res.format,
                        public_id: res.public_id,
                    })
                } else {
                    reject(new Error(res.error?.message || "Cloudinary error"))
                }
            } catch (error) {
                reject(error)
            }
        }

        xhr.send(form)
    })
}
