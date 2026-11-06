import { API_BASE_URL } from "../api";

async function post(path, body) {
    const res = await fetch(`${API_BASE_URL}${path}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    });

    const data = await res.json().catch(() => null);

    if (data && typeof data.success === "boolean") return data;

    return {
        success: false,
        message: data?.message || `Server error (${res.status}). Check the backend console.`,
    };
}

export function loginUser(email, password, role) {
    return post("/login", { email, password, role });
}

export function registerUser(fullName, email, password, phoneNumber, role) {
    return post("/register", { fullName, email, password, phoneNumber, role });
}