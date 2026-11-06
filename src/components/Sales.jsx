import { useEffect, useState } from "react";
import { api, money } from "../api";

export default function Sales() {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        api("/orders/sales").then(setData).catch((e) => setError(e.message));
    }, []);

    return (
        <main className="page">
            <h1>Sales &amp; revenue</h1>
            {error && <p className="error-text">{error}</p>}
            {!data && !error && <p className="muted">Loading…</p>}

            {data && (
                <>
                    <div className="stats">
                        <div className="stat"><span>Total revenue</span><strong>{money(data.total)}</strong></div>
                        <div className="stat"><span>Items sold</span><strong>{data.unitsSold}</strong></div>
                        <div className="stat"><span>Orders</span><strong>{data.orders}</strong></div>
                    </div>

                    <div className="panel table-wrap">
                        <table>
                            <thead>
                            <tr><th>Date</th><th>Item</th><th>Buyer</th><th>Qty</th><th>Price</th><th>Amount</th></tr>
                            </thead>
                            <tbody>
                            {data.sales.length === 0 && <tr><td colSpan="6" className="muted">No sales yet.</td></tr>}
                            {data.sales.map((s, idx) => (
                                <tr key={idx}>
                                    <td>{new Date(s.date).toLocaleDateString()}</td>
                                    <td>{s.item}</td>
                                    <td>{s.buyer}</td>
                                    <td>{s.quantity}</td>
                                    <td>{money(s.unitPrice)}</td>
                                    <td>{money(s.amount)}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </>
            )}
        </main>
    );
}