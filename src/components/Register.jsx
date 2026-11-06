import { useState } from "react";
import { registerUser } from "../api/authApi";
import AuthLayout from "./AuthLayout";
import { UserIcon, MailIcon, PhoneIcon, LockIcon, CapIcon, EyeIcon, EyeOffIcon } from "./icons";

export default function Register({ onSwitchToLogin }) {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("STUDENT");
    const [showPassword, setShowPassword] = useState(false);
    const [agreed, setAgreed] = useState(false);
    const [message, setMessage] = useState(null);

    const handleRegister = async (e) => {
        e.preventDefault();
        setMessage(null);

        if (!fullName || !email || !phoneNumber || !password) {
            setMessage({ type: "error", text: "Please fill in all fields." });
            return;
        }
        if (password.length < 8) {
            setMessage({ type: "error", text: "Password must be at least 8 characters." });
            return;
        }
        if (!agreed) {
            setMessage({ type: "error", text: "Please agree to the Terms & Privacy Policy." });
            return;
        }

        try {
            const result = await registerUser(fullName, email, password, phoneNumber, role);
            if (result.success) {
                setMessage({ type: "success", text: "Account created successfully! You can now log in." });
                setTimeout(onSwitchToLogin, 1200);
            } else {
                setMessage({ type: "error", text: result.message });
            }
        } catch {
            setMessage({ type: "error", text: "Can't reach the server. Is the backend running?" });
        }
    };

    return (
        <AuthLayout>
            <h1 className="auth-title">Create your account</h1>
            <p className="auth-subtitle">Join your campus marketplace today</p>

            <form onSubmit={handleRegister} noValidate>
                <div className="field-group">
                    <label className="field-label" htmlFor="fullName">Full name</label>
                    <div className="field-input-wrap">
                        <span className="field-icon"><UserIcon /></span>
                        <input id="fullName" type="text" placeholder="Jamie Lee" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                    </div>
                </div>

                <div className="field-group">
                    <label className="field-label" htmlFor="email">University email</label>
                    <div className="field-input-wrap">
                        <span className="field-icon"><MailIcon /></span>
                        <input id="email" type="email" placeholder="jamie@student.cput.ac.za" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                </div>

                <div className="field-group">
                    <label className="field-label" htmlFor="phone">Phone number</label>
                    <div className="field-input-wrap">
                        <span className="field-icon"><PhoneIcon /></span>
                        <input id="phone" type="tel" placeholder="071 234 5678" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                    </div>
                </div>

                <div className="field-group">
                    <label className="field-label" htmlFor="role">I am a</label>
                    <div className="field-input-wrap">
                        <span className="field-icon"><CapIcon /></span>
                        <select id="role" value={role} onChange={(e) => setRole(e.target.value)}>
                            <option value="STUDENT">Student</option>
                            <option value="SELLER">Seller</option>
                        </select>
                    </div>
                </div>

                <div className="field-group">
                    <label className="field-label" htmlFor="password">Password</label>
                    <div className="field-input-wrap">
                        <span className="field-icon"><LockIcon /></span>
                        <input id="password" type={showPassword ? "text" : "password"} placeholder="At least 8 characters"
                               value={password} onChange={(e) => setPassword(e.target.value)} />
                        <button type="button" className="eye-toggle" aria-label="Show or hide password"
                                onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                        </button>
                    </div>
                </div>

                <label className="check-label terms">
                    <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} />
                    <span>
                        I agree to the <a href="#" onClick={(e) => e.preventDefault()}>Terms</a> &amp;{" "}
                        <a href="#" onClick={(e) => e.preventDefault()}>Privacy Policy</a>
                    </span>
                </label>

                {message && <p className={message.type === "error" ? "error-text" : "success-text"}>{message.text}</p>}

                <button type="submit" className="btn-main">Create account</button>
            </form>

            <p className="auth-footer">
                Already have an account?
                <button type="button" className="link-btn link-big" onClick={onSwitchToLogin}>Log in</button>
            </p>
        </AuthLayout>
    );
}