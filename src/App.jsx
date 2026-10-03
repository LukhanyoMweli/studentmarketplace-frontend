import { useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import "./App.css";

export default function App() {
    const [page, setPage] = useState("login");

    return (
        <div className="app-shell">
            <div className="brand-panel">
                <div className="brand-watermark">SM</div>
                <div className="brand-content">
                    <p className="brand-eyebrow">CPUT · Peer to Peer</p>
                    <h1 className="brand-title">Student<br />Market<br />Place</h1>
                    <p className="brand-tagline">
                        Buy, sell, and trade with students on your own campus.
                    </p>
                </div>
                <p className="brand-footer">Built by students, for students.</p>
            </div>

            <div className="form-panel">
                {page === "login" ? (
                    <Login onSwitchToRegister={() => setPage("register")} />
                ) : (
                    <Register onSwitchToLogin={() => setPage("login")} />
                )}
            </div>
        </div>
    );
}