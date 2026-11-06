import { useEffect, useState } from "react";
import { api, money } from "../api";

export default function Orders() {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        api("/orders/mine").then(setOrders).catch((e) => setError(e.message));
    }, []);

    return (
        <main className="page">
            <h1>My orders</h1>
            {error && <p className="error-text">{error}</p>}
            {orders.length === 0 && !error && <p className="muted">You haven't placed any orders yet.</p>}

            {orders.map((o) => (
                <div className="panel" key={o.id}>
                    <div className="order-head">
                        <div>
                            <strong>Order #{o.id}</strong>
                            <p className="muted">{new Date(o.createdAt).toLocaleString()}</p>
                        </div>
                        <div className="order-right">
                            <span className="tag">{o.status}</span>
                            <strong>{money(o.total)}</strong>
                        </div>
                    </div>
                    <table>
                        <thead><tr><th>Item</th><th>Qty</th><th>Price</th><th>Subtotal</th></tr></thead>
                        <tbody>
                        {o.lines.map((l) => (
                            <tr key={l.itemId}>
                                <td>{l.title}</td>
                                <td>{l.quantity}</td>
                                <td>{money(l.unitPrice)}</td>
                                <td>{money(l.unitPrice * l.quantity)}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            ))}
        </main>
    );
}