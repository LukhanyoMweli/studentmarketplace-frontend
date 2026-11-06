import { useState } from "react";
import { loginUser } from "../api/authApi";
import AuthLayout from "./AuthLayout";
import { MailIcon, LockIcon, EyeIcon, EyeOffIcon, ShieldCheckIcon, GoogleIcon } from "./icons";

const ROLES = [
    { value: "STUDENT", label: "Student" },
    { value: "SELLER", label: "Seller" },
    { value: "ADMIN", label: "Admin" },
];

export default function Login({ onSwitchToRegister, onLogin }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("STUDENT");
    const [remember, setRemember] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState(null);

    const handleLogin = async (e) => {
        e.preventDefault();
        setMessage(null);

        if (!email || !password) {
            setMessage({ type: "error", text: "Please enter both email and password." });
            return;
        }

        try {
            const result = await loginUser(email, password, role);
            if (result.success) {
                onLogin({ id: result.id, fullName: result.fullName, role: result.role, email, token: result.token });
            } else {
                setMessage({ type: "error", text: result.message });
            }
        } catch {
            setMessage({ type: "error", text: "Can't reach the server. Is the backend running?" });
        }
    };

    return (
        <AuthLayout>
            <h1 className="auth-title">Welcome back</h1>
            <p className="auth-subtitle">Sign in to your account to continue</p>

            <form onSubmit={handleLogin} noValidate>
                <div className="role-toggle" role="radiogroup" aria-label="I am a">
                    {ROLES.map((r) => (
                        <button
                            key={r.value}
                            type="button"
                            role="radio"
                            aria-checked={role === r.value}
                            className={role === r.value ? "active" : ""}
                            onClick={() => setRole(r.value)}
                        >
                            {r.label}
                        </button>
                    ))}
                </div>

                <div className="field-group">
                    <label className="field-label" htmlFor="email">Email</label>
                    <div className="field-input-wrap">
                        <span className="field-icon"><MailIcon /></span>
                        <input id="email" type="email" placeholder="you@student.cput.ac.za"
                               value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                </div>

                <div className="field-group">
                    <label className="field-label" htmlFor="password">Password</label>
                    <div className="field-input-wrap">
                        <span className="field-icon"><LockIcon /></span>
                        <input id="password" type={showPassword ? "text" : "password"} placeholder="••••••••"
                               value={password} onChange={(e) => setPassword(e.target.value)} />
                        <button type="button" className="eye-toggle" aria-label="Show or hide password"
                                onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                        </button>
                    </div>
                </div>

                <div className="options-row">
                    <label className="check-label">
                        <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
                        <span>Remember me</span>
                    </label>
                    <button type="button" className="link-btn">Forgot password?</button>
                </div>

                {message && <p className={message.type === "error" ? "error-text" : "success-text"}>{message.text}</p>}

                <button type="submit" className="btn-main">Login</button>
            </form>

            <div className="divider"><span>Or continue with</span></div>

            <button type="button" className="btn-google">
                <GoogleIcon /> Continue with Google
            </button>

            <div className="edu-notice">
                <ShieldCheckIcon />
                <div>
                    <strong>University email verification</strong>
                    <span>Only verified university emails can join the marketplace</span>
                </div>
            </div>

            <p className="auth-footer">
                New here?
                <button type="button" className="link-btn link-big" onClick={onSwitchToRegister}>Sign up</button>
            </p>
            <p className="legal">
                By continuing, you agree to our{" "}
                <a href="#" onClick={(e) => e.preventDefault()}>Terms</a> ·{" "}
                <a href="#" onClick={(e) => e.preventDefault()}>Privacy Policy</a>
            </p>
        </AuthLayout>
    );
}