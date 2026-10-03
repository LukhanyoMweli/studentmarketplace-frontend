import { useState } from "react";
import { registerUser } from "../api/authApi";

export default function Register({ onSwitchToLogin }) {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("STUDENT");
    const [message, setMessage] = useState(null);

    const handleRegister = async (e) => {
        e.preventDefault();
        if (!fullName || !email || !phoneNumber || !password) {
            setMessage({ type: "error", text: "Please fill in all fields." });
            return;
        }
        const result = await registerUser(fullName, email, password, phoneNumber, role);
        if (result.success) {
            setMessage({ type: "success", text: "Account created successfully! You can now log in." });
            setTimeout(onSwitchToLogin, 1200);
        } else {
            setMessage({ type: "error", text: result.message });
        }
    };

    return (
        <div className="card">
            <div className="header">Create Account</div>

            <form onSubmit={handleRegister} className="form">
                <label>Name:</label>
                <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} />

                <label>Email:</label>
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />

                <label>Phone No:</label>
                <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />

                <label>Password:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

                <label>UserType:</label>
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="STUDENT">Student</option>
                    <option value="SELLER">Seller</option>
                </select>

                {message && <p className={message.type === "error" ? "error-text" : "success-text"}>{message.text}</p>}

                <div className="button-row">
                    <button type="submit" className="btn-primary">Create Account</button>
                    <button type="button" className="btn-secondary" onClick={onSwitchToLogin}>
                        Login
                    </button>
                </div>
            </form>
        </div>
    );
}