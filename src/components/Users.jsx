import { useEffect, useState } from "react";
import { api } from "../api";

export default function Users({ currentUser }) {
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("ALL");
    const [error, setError] = useState(null);
    const [deletingId, setDeletingId] = useState(null);

    useEffect(() => {
        if (currentUser.role !== "ADMIN") return;
        api("/admin/users").then(setUsers).catch((e) => setError(e.message));
    }, [currentUser.role]);

    const count = (r) => users.filter((u) => u.role === r).length;
    const shown = filter === "ALL" ? users : users.filter((u) => u.role === filter);

    const removeUser = async (user) => {
        if (user.id === currentUser.id || !window.confirm(`Delete ${user.fullName}'s account? This cannot be undone.`)) return;
        setError(null);
        setDeletingId(user.id);
        try {
            await api(`/admin/users/${user.id}`, { method: "DELETE" });
            setUsers((current) => current.filter((entry) => entry.id !== user.id));
        } catch (e) {
            setError(e.message);
        } finally {
            setDeletingId(null);
        }
    };

    if (currentUser.role !== "ADMIN") {
        return <main className="page"><p className="error-text">Only administrators can manage users.</p></main>;
    }

    return (
        <main className="page">
            <h1>Users</h1>
            {error && <p className="error-text">{error}</p>}

            <div className="role-toggle filter">
                {[["ALL", `All (${users.length})`], ["STUDENT", `Students (${count("STUDENT")})`],
                    ["SELLER", `Sellers (${count("SELLER")})`], ["ADMIN", `Admins (${count("ADMIN")})`]].map(([k, label]) => (
                    <button key={k} type="button" className={filter === k ? "active" : ""} onClick={() => setFilter(k)}>{label}</button>
                ))}
            </div>

            <div className="panel table-wrap">
                <table>
                    <thead>
                    <tr><th>Name</th><th>Email</th><th>Phone</th><th>Role</th><th>Actions</th></tr>
                    </thead>
                    <tbody>
                    {shown.map((u) => (
                        <tr key={u.id}>
                            <td>{u.fullName}</td>
                            <td>{u.email}</td>
                            <td>{u.phoneNumber}</td>
                            <td><span className="tag">{u.role}</span></td>
                            <td>
                                <button
                                    className="nav-logout"
                                    type="button"
                                    disabled={u.id === currentUser.id || deletingId === u.id}
                                    onClick={() => removeUser(u)}
                                    aria-label={`Delete ${u.fullName}`}
                                >
                                    {deletingId === u.id ? "Deleting…" : "Delete"}
                                </button>
                            </td>
                        </tr>
                    ))}
                    {shown.length === 0 && <tr><td colSpan="5" className="muted">No users found.</td></tr>}
                    </tbody>
                </table>
            </div>
        </main>
    );
}