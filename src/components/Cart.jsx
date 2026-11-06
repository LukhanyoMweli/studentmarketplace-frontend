import { useEffect, useState } from "react";
import { api, money } from "../api";

export default function Cart({ onChange, onDone }) {
    const [lines, setLines] = useState([]);
    const [error, setError] = useState(null);
    const [busy, setBusy] = useState(false);

    useEffect(() => {
        api("/cart").then(setLines).catch((e) => setError(e.message));
    }, []);

    const update = async (promise) => {
        setError(null);
        try {
            setLines(await promise);
            onChange?.();
        } catch (e) {
            setError(e.message);
        }
    };

    const setQty = (line, quantity) => update(api(`/cart/${line.itemId}`, { method: "PUT", body: { quantity } }));
    const remove = (line) => update(api(`/cart/${line.itemId}`, { method: "DELETE" }));

    const total = lines.reduce((sum, l) => sum + l.price * l.quantity, 0);

    const checkout = async () => {
        setBusy(true);
        setError(null);
        try {
            await api("/orders", { method: "POST" });
            onChange?.();
            onDone();
        } catch (e) {
            setError(e.message);
            setBusy(false);
        }
    };

    return (
        <main className="page">
            <h1>My cart</h1>
            {error && <p className="error-text">{error}</p>}
            {lines.length === 0 && !error && <p className="muted">Your cart is empty.</p>}

            {lines.length > 0 && (
                <div className="panel">
                    {lines.map((l) => (
                        <div className="cart-row" key={l.itemId}>
                            <div className="cart-thumb">
                                {l.imageUrl ? <img src={l.imageUrl} alt={l.title} /> : <span>No image</span>}
                            </div>
                            <div className="cart-info">
                                <h3>{l.title}</h3>
                                <p className="muted">Sold by {l.seller} · {money(l.price)} each</p>
                            </div>
                            <div className="qty">
                                <button onClick={() => setQty(l, l.quantity - 1)}>−</button>
                                <span>{l.quantity}</span>
                                <button onClick={() => setQty(l, l.quantity + 1)} disabled={l.quantity >= l.stock}>+</button>
                            </div>
                            <strong className="cart-line-total">{money(l.price * l.quantity)}</strong>
                            <button className="nav-logout" onClick={() => remove(l)}>Remove</button>
                        </div>
                    ))}

                    <div className="cart-total">
                        <span>Total</span>
                        <strong>{money(total)}</strong>
                    </div>
                    <button className="btn-main" disabled={busy} onClick={checkout}>
                        {busy ? "Placing order…" : "Place order"}
                    </button>
                </div>
            )}
        </main>
    );
}