import { useEffect, useState } from "react";
import { api } from "../api";

export default function Profile({ onUpdated }) {
    const [profile, setProfile] = useState(null);
    const [fullName, setFullName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [infoMsg, setInfoMsg] = useState(null);

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [pwMsg, setPwMsg] = useState(null);

    useEffect(() => {
        api("/profile")
            .then((p) => {
                setProfile(p);
                setFullName(p.fullName);
                setPhoneNumber(p.phoneNumber);
            })
            .catch((e) => setInfoMsg({ type: "error", text: e.message }));
    }, []);

    const saveInfo = async (e) => {
        e.preventDefault();
        setInfoMsg(null);
        try {
            const p = await api("/profile", { method: "PUT", body: { fullName, phoneNumber } });
            setProfile(p);
            onUpdated(p);
            setInfoMsg({ type: "success", text: "Profile updated." });
        } catch (err) {
            setInfoMsg({ type: "error", text: err.message });
        }
    };

    const savePassword = async (e) => {
        e.preventDefault();
        setPwMsg(null);
        if (newPassword !== confirm) {
            setPwMsg({ type: "error", text: "New passwords don't match." });
            return;
        }
        try {
            await api("/profile/password", { method: "PUT", body: { currentPassword, newPassword } });
            setCurrentPassword("");
            setNewPassword("");
            setConfirm("");
            setPwMsg({ type: "success", text: "Password updated." });
        } catch (err) {
            setPwMsg({ type: "error", text: err.message });
        }
    };

    if (!profile) return <main className="page"><p className="muted">Loading…</p>{infoMsg && <p className="error-text">{infoMsg.text}</p>}</main>;

    return (
        <main className="page narrow">
            <h1>My profile</h1>

            <form className="panel form-grid" onSubmit={saveInfo}>
                <label className="span-2 field-label">Full name
                    <input value={fullName} onChange={(e) => setFullName(e.target.value)} />
                </label>
                <label className="span-2 field-label">Email (can't be changed)
                    <input value={profile.email} disabled />
                </label>
                <label className="span-2 field-label">Phone number
                    <input value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                </label>
                <label className="span-2 field-label">Role
                    <input value={profile.role} disabled />
                </label>
                {infoMsg && <p className={infoMsg.type === "error" ? "error-text span-2" : "success-text span-2"}>{infoMsg.text}</p>}
                <button className="btn-main span-2" type="submit">Save changes</button>
            </form>

            <h2 className="sub">Change password</h2>
            <form className="panel form-grid" onSubmit={savePassword}>
                <input className="span-2" type="password" placeholder="Current password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
                <input className="span-2" type="password" placeholder="New password (min 8 characters)" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                <input className="span-2" type="password" placeholder="Confirm new password" value={confirm} onChange={(e) => setConfirm(e.target.value)} />
                {pwMsg && <p className={pwMsg.type === "error" ? "error-text span-2" : "success-text span-2"}>{pwMsg.text}</p>}
                <button className="btn-main span-2" type="submit">Update password</button>
            </form>
        </main>
    );
}