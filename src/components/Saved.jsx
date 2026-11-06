import { useEffect, useState } from "react";
import { api, money } from "../api";

export default function Saved({ onMessage, onChange }) {
    const [items, setItems] = useState([]);
    const [error, setError] = useState(null);
    const [notice, setNotice] = useState(null);

    useEffect(() => {
        api("/saved").then(setItems).catch((e) => setError(e.message));
    }, []);

    const flash = (text) => {
        setNotice(text);
        setTimeout(() => setNotice(null), 2200);
    };

    const remove = async (id) => {
        try {
            await api(`/saved/${id}`, { method: "DELETE" });
            setItems(items.filter((i) => i.id !== id));
        } catch (e) {
            setError(e.message);
        }
    };

    const addToCart = async (item) => {
        setError(null);
        try {
            await api(`/cart/${item.id}`, { method: "POST" });
            flash(`Added "${item.title}" to your cart`);
            onChange?.();
        } catch (e) {
            setError(e.message);
        }
    };

    return (
        <main className="page">
            <h1>Saved items</h1>
            {notice && <div className="toast">{notice}</div>}
            {error && <p className="error-text">{error}</p>}
            {items.length === 0 && !error && <p className="muted">You haven't saved anything yet. Tap "Save" on an item in Browse.</p>}

            <div className="items-grid">
                {items.map((i) => (
                    <div className="item-card" key={i.id}>
                        <div className="item-img">
                            {i.imageUrl ? <img src={i.imageUrl} alt={i.title} /> : <span>No image</span>}
                        </div>
                        <div className="item-body">
                            <span className="tag">{i.category}</span>
                            <h3>{i.title}</h3>
                            <div className="item-foot">
                                <strong>{money(i.price)}</strong>
                                <span className="muted">{i.stock > 0 ? `${i.stock} in stock` : "Out of stock"}</span>
                            </div>
                            <p className="muted small">Sold by {i.seller?.fullName}</p>
                            <div className="card-actions">
                                <button className="btn-sm" disabled={i.stock < 1} onClick={() => addToCart(i)}>Add to cart</button>
                                <button className="btn-outline" onClick={() => onMessage(i.seller, i)}>Message</button>
                                <button className="btn-outline" onClick={() => remove(i.id)}>Remove</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}