import { useState } from "react";
import { loginUser } from "../api/authApi";

export default function Login({ onSwitchToRegister }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("STUDENT");
    const [message, setMessage] = useState(null);

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            setMessage({ type: "error", text: "Please enter both email and password." });
            return;
        }
        const result = await loginUser(email, password, role);
        if (result.success) {
            setMessage({ type: "success", text: `Welcome, ${result.fullName}! Logged in as ${result.role}.` });
        } else {
            setMessage({ type: "error", text: result.message });
        }
    };

    return (
        <div className="card">
            <div className="header">Student Market Place</div>

            <div className="role-row">
                <span>Sign in as:</span>
                {["STUDENT", "SELLER", "ADMIN"].map((r) => (
                    <label key={r}>
                        <input
                            type="radio"
                            name="role"
                            value={r}
                            checked={role === r}
                            onChange={() => setRole(r)}
                        />
                        {r.charAt(0) + r.slice(1).toLowerCase()}
                    </label>
                ))}
            </div>

            <form onSubmit={handleLogin} className="form">
                <label>Email:</label>
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />

                <label>Password:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

                {message && <p className={message.type === "error" ? "error-text" : "success-text"}>{message.text}</p>}

                <div className="button-row">
                    <button type="submit" className="btn-primary">Login</button>
                    <button type="button" className="btn-secondary" onClick={onSwitchToRegister}>
                        Register
                    </button>
                </div>
            </form>
        </div>
    );
}