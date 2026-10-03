const BASE_URL = "http://localhost:8080/api";

export async function loginUser(email, password, role) {
    const res = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role }),
    });
    return res.json();
}

export async function registerUser(fullName, email, password, phoneNumber, role) {
    const res = await fetch(`${BASE_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, password, phoneNumber, role }),
    });
    return res.json();
}