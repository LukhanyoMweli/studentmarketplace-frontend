import { useEffect, useState } from "react";
import { api, money } from "../api";

const EMPTY = { title: "", description: "", price: "", category: "", stock: 1, imageUrl: "" };

export default function Listings() {
    const [items, setItems] = useState([]);
    const [form, setForm] = useState(EMPTY);
    const [error, setError] = useState(null);

    useEffect(() => {
        api("/items/mine").then(setItems).catch((e) => setError(e.message));
    }, []);

    const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

    const add = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            const item = await api("/items", {
                method: "POST",
                body: { ...form, price: Number(form.price), stock: Number(form.stock) },
            });
            setItems([item, ...items]);
            setForm(EMPTY);
        } catch (err) {
            setError(err.message);
        }
    };

    const remove = async (id) => {
        try {
            await api(`/items/${id}`, { method: "DELETE" });
            setItems(items.filter((i) => i.id !== id));
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <main className="page">
            <h1>My listings</h1>

            <form className="panel form-grid" onSubmit={add}>
                <input placeholder="Title" value={form.title} onChange={set("title")} />
                <input placeholder="Category (e.g. Textbooks)" value={form.category} onChange={set("category")} />
                <input type="number" min="0" step="0.01" placeholder="Price (R)" value={form.price} onChange={set("price")} />
                <input type="number" min="1" placeholder="Stock" value={form.stock} onChange={set("stock")} />
                <input className="span-2" placeholder="Image URL (optional)" value={form.imageUrl} onChange={set("imageUrl")} />
                <textarea className="span-2" rows="3" placeholder="Description" value={form.description} onChange={set("description")} />
                {error && <p className="error-text span-2">{error}</p>}
                <button className="btn-main span-2" type="submit">Add item</button>
            </form>

            <div className="panel table-wrap">
                <table>
                    <thead>
                    <tr><th>Item</th><th>Category</th><th>Price</th><th>Stock</th><th></th></tr>
                    </thead>
                    <tbody>
                    {items.length === 0 && <tr><td colSpan="5" className="muted">You haven't listed anything yet.</td></tr>}
                    {items.map((i) => (
                        <tr key={i.id}>
                            <td>{i.title}</td>
                            <td>{i.category}</td>
                            <td>{money(i.price)}</td>
                            <td>{i.stock}</td>
                            <td><button className="nav-logout" onClick={() => remove(i.id)}>Remove</button></td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </main>
    );
}