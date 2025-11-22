import { useAuth } from "@/context/authContext";

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function getAllPosts() {
  const token = localStorage.getItem("token");
  try {
    const res = await fetch(`${API_BASE_URL}/api/post/get-all-posts`, {
      method: "GET",
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
        "Content-Type": "application/json"
      },
      cache: "no-store",
    }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch posts: ${res.statusText}`);
      console.log(res);
    }

    return res.json();
  } catch (err) {
    console.error("Error fetching posts:", err);
    throw err;
  }
}



export interface UploadNotePayload {
  course: string;
  semester: string;
  subject: string;
  title: string;
  fileUrl: string;
  fileType: string;
  fileSize: string;
}

export interface UploadNoteResponse {
  ok: boolean;
  status: number;
  success?: boolean;
  message?: string;
  error?: string | object;
}

export async function uploadNote(
  payload: UploadNotePayload
): Promise<UploadNoteResponse> {
  try {
    const token = localStorage.getItem("token");
    console.log(token);
    const res = await fetch(`${API_BASE_URL}/api/notes/upload`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    return {
      ok: res.ok,
      status: res.status,
      ...data,
    };
  } catch (error) {
    console.error("Upload Error:", error);

    return {
      ok: false,
      status: 0,
      error: "Network error",
    };
  }
}
