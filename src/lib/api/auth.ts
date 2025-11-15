// lib/api/auth.ts
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function loginUser(credentials: { email: string; password: string }) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Login failed");
    }

    return res.json();
  } catch (error) {
    console.error("Login error:", error);
  }
}
