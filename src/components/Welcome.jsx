import { BagIcon, CapIcon, UserIcon, MailIcon, LockIcon } from "./icons";

const CONTENT = {
    STUDENT: {
        label: "Student",
        subtitle: "Find great deals from students on your campus.",
        cards: [
            { title: "Browse items", text: "Textbooks, electronics and more from fellow students.", icon: <BagIcon />, view: "browse" },
            { title: "Saved items", text: "Items you have bookmarked for later.", icon: <CapIcon />, view: "saved" },
            { title: "My cart", text: "Review what you're about to buy and check out.", icon: <BagIcon />, view: "cart" },
            { title: "My orders", text: "Keep track of everything you have bought.", icon: <MailIcon />, view: "orders" },
            { title: "Messages", text: "Chat with sellers about their items.", icon: <MailIcon />, view: "messages" },
            { title: "My profile", text: "Update your details and password.", icon: <UserIcon />, view: "profile" },
        ],
    },
    SELLER: {
        label: "Seller",
        subtitle: "Manage your listings and reach students across campus.",
        cards: [
            { title: "My listings", text: "See and manage everything you are selling.", icon: <BagIcon />, view: "listings" },
            { title: "Add new item", text: "List something new for students to find.", icon: <CapIcon />, view: "listings" },
            { title: "Sales & revenue", text: "Track your orders and earnings.", icon: <MailIcon />, view: "sales" },
            { title: "Messages", text: "Reply to students who are interested.", icon: <MailIcon />, view: "messages" },
            { title: "My profile", text: "Update your details and password.", icon: <UserIcon />, view: "profile" },
        ],
    },
    ADMIN: {
        label: "Admin",
        subtitle: "Oversee users and listings across the marketplace.",
        cards: [
            { title: "Manage users", text: "View all student and seller accounts.", icon: <UserIcon />, view: "users" },
            { title: "Review listings", text: "Keep the marketplace safe and accurate.", icon: <BagIcon />, view: "browse" },
            { title: "My profile", text: "Update your details and password.", icon: <LockIcon />, view: "profile" },
        ],
    },
};

export default function Welcome({ user, onNavigate }) {
    const content = CONTENT[user.role] || CONTENT.STUDENT;

    return (
        <main className="welcome-main">
            <span className="role-badge">{content.label}</span>
            <h1 className="welcome-title">Welcome, {user.fullName}!</h1>
            <p className="welcome-subtitle">{content.subtitle}</p>

            <div className="card-grid">
                {content.cards.map((card) => (
                    <button key={card.title} className="info-card link" onClick={() => onNavigate(card.view)}>
                        <div className="info-card-icon">{card.icon}</div>
                        <h3>{card.title}</h3>
                        <p>{card.text}</p>
                    </button>
                ))}
            </div>
        </main>
    );
}