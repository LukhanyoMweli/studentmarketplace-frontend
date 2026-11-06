export const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || "/api").replace(/\/$/, "");

export const money = (n) => `R${Number(n).toFixed(2)}`;

export async function api(path, { method = "GET", body } = {}) {
    const user = JSON.parse(
        localStorage.getItem("sm_user") || sessionStorage.getItem("sm_user") || "null",
    );
    const res = await fetch(API_BASE_URL + path, {
        method,
        headers: {
            "Content-Type": "application/json",
            ...(user?.token ? { Authorization: `Bearer ${user.token}` } : {}),
        },
        body: body ? JSON.stringify(body) : undefined,
    });
    if (res.status === 401) {
        localStorage.removeItem("sm_user");
        sessionStorage.removeItem("sm_user");
        window.location.reload();
    }
    const data = await res.json().catch(() => null);
    if (!res.ok) throw new Error(data?.message || "Something went wrong.");
    return data;
}