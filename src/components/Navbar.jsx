import { BagIcon, UserIcon } from "./icons";

const LINKS = {
    STUDENT: [["home", "Home"], ["browse", "Browse"], ["saved", "Saved"], ["cart", "Cart"], ["orders", "Orders"], ["messages", "Messages"], ["about", "About & FAQs"]],
    SELLER: [["home", "Home"], ["listings", "My listings"], ["sales", "Sales"], ["messages", "Messages"], ["about", "About & FAQs"]],
    ADMIN: [["home", "Home"], ["browse", "Listings"], ["users", "Users"], ["feedback", "Reviews & reports"], ["about", "About & FAQs"]],
};

export default function Navbar({ user, view, counts, onNavigate, onLogout }) {
    const badge = (key) => (key === "cart" ? counts.cart : key === "messages" ? counts.unread : 0);

    return (
        <header className="welcome-nav">
            <div className="brand-row">
                <div className="brand-icon"><BagIcon /></div>
                <div className="brand-name">Student Marketplace</div>
            </div>
            <nav className="nav-links">
                {(LINKS[user.role] || LINKS.STUDENT).map(([key, label]) => (
                    <button key={key} className={view === key ? "nav-link active" : "nav-link"} onClick={() => onNavigate(key)}>
                        {label}
                        {badge(key) > 0 && <span className="badge">{badge(key)}</span>}
                    </button>
                ))}
            </nav>
            <div className="nav-right">
                <button className={view === "profile" ? "user-chip active" : "user-chip"} onClick={() => onNavigate("profile")}>
                    <UserIcon /> {user.fullName}
                </button>
                <button className="nav-logout" onClick={onLogout}>Log out</button>
            </div>
        </header>
    );
}