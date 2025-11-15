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
