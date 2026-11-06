import { useCallback, useEffect, useState } from "react";
import { api } from "./api";
import Login from "./components/Login";
import Register from "./components/Register";
import Navbar from "./components/Navbar";
import Welcome from "./components/Welcome";
import Browse from "./components/Browse";
import Listings from "./components/Listings";
import Users from "./components/Users";
import Cart from "./components/Cart";
import Saved from "./components/Saved";
import Orders from "./components/Orders";
import Sales from "./components/Sales";
import Messages from "./components/Message";
import Profile from "./components/Profile";
import Feedback from "./components/Feedback";
import About from "./components/About";
import "./App.css";

const STORAGE_KEY = "sm_user";

function loadUser() {
    for (const storage of [localStorage, sessionStorage]) {
        try {
            const user = JSON.parse(storage.getItem(STORAGE_KEY));
            if (user?.token) return user;
        } catch {
            storage.removeItem(STORAGE_KEY);
        }
    }
    return null;
}

export default function App() {
    const [authPage, setAuthPage] = useState("login");
    const [user, setUser] = useState(loadUser);
    const [view, setView] = useState("home");
    const [chat, setChat] = useState(null);
    const [counts, setCounts] = useState({ unread: 0, cart: 0 });

    const refreshCounts = useCallback(async () => {
        if (!user) return;
        try {
            const next = { unread: 0, cart: 0 };
            if (user.role === "STUDENT" || user.role === "SELLER") {
                next.unread = (await api("/messages/unread")).count;
            }
            if (user.role === "STUDENT") {
                const lines = await api("/cart");
                next.cart = lines.reduce((sum, l) => sum + l.quantity, 0);
            }
            setCounts(next);
        } catch {
            /* badges are optional */
        }
    }, [user]);

    useEffect(() => {
        refreshCounts();
        const t = setInterval(refreshCounts, 20000);
        return () => clearInterval(t);
    }, [refreshCounts, view]);

    const go = (v, target = null) => {
        setView(v);
        setChat(target);
    };

    const handleLogin = ({ remember, ...userData }) => {
        localStorage.removeItem(STORAGE_KEY);
        sessionStorage.removeItem(STORAGE_KEY);
        const storage = remember ? localStorage : sessionStorage;
        storage.setItem(STORAGE_KEY, JSON.stringify(userData));
        setUser(userData);
        go("home");
    };

    const handleLogout = () => {
        localStorage.removeItem(STORAGE_KEY);
        sessionStorage.removeItem(STORAGE_KEY);
        setUser(null);
        setAuthPage("login");
        go("home");
    };

    const handleProfileUpdated = (p) => {
        const u = { ...user, fullName: p.fullName };
        const storage = localStorage.getItem(STORAGE_KEY) ? localStorage : sessionStorage;
        storage.setItem(STORAGE_KEY, JSON.stringify(u));
        setUser(u);
    };

    if (!user) {
        return authPage === "login" ? (
            <Login onSwitchToRegister={() => setAuthPage("register")} onLogin={handleLogin} />
        ) : (
            <Register onSwitchToLogin={() => setAuthPage("login")} />
        );
    }

    const openChat = (seller, item) =>
        go("messages", { userId: seller.id, name: seller.fullName, itemId: item.id, itemTitle: item.title });

    const pages = {
        home: <Welcome user={user} onNavigate={go} />,
        browse: <Browse role={user.role} onMessage={openChat} onChange={refreshCounts} />,
        saved: <Saved onMessage={openChat} onChange={refreshCounts} />,
        cart: <Cart onChange={refreshCounts} onDone={() => go("orders")} />,
        orders: <Orders />,
        listings: <Listings />,
        sales: <Sales />,
        users: <Users currentUser={user} />,
        messages: <Messages key={chat?.userId ?? "none"} target={chat} onChange={refreshCounts} />,
        profile: <Profile onUpdated={handleProfileUpdated} />,
        feedback: <Feedback currentUser={user} />,
        about: <About />,
    };

    return (
        <div className="welcome-page">
            <Navbar user={user} view={view} counts={counts} onNavigate={go} onLogout={handleLogout} />
            {pages[view] || pages.home}
        </div>
    );
}