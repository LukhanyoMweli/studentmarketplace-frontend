import { useEffect, useState } from "react";
import { api, money } from "../api";

function StudentFeedback({ item }) {
    const [activePanel, setActivePanel] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [rating, setRating] = useState("5");
    const [comment, setComment] = useState("");
    const [reportReason, setReportReason] = useState("");
    const [error, setError] = useState(null);
    const [notice, setNotice] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [loadingReviews, setLoadingReviews] = useState(false);

    const toggleReviews = async () => {
        setError(null);
        if (activePanel === "reviews") {
            setActivePanel(null);
            return;
        }
        setActivePanel("reviews");
        setLoadingReviews(true);
        try {
            const result = await api(`/items/${item.id}/reviews`);
            setReviews(Array.isArray(result) ? result : result.reviews || []);
        } catch (e) {
            setError(e.message);
        } finally {
            setLoadingReviews(false);
        }
    };

    const submitReview = async (e) => {
        e.preventDefault();
        setError(null);
        setSubmitting(true);
        try {
            const review = await api(`/items/${item.id}/reviews`, {
                method: "POST",
                body: { rating: Number(rating), comment: comment.trim() },
            });
            setReviews((current) => [review, ...current]);
            setComment("");
            setNotice("Your review was submitted.");
        } catch (e) {
            setError(e.message);
        } finally {
            setSubmitting(false);
        }
    };

    const submitReport = async (targetType, targetId, e) => {
        e.preventDefault();
        setError(null);
        setSubmitting(true);
        try {
            await api("/reports", {
                method: "POST",
                body: { targetType, targetId, reason: reportReason.trim() },
            });
            setReportReason("");
            setActivePanel(null);
            setNotice("Thanks. Your report was sent to the marketplace administrators.");
        } catch (err) {
            setError(err.message);
        } finally {
            setSubmitting(false);
        }
    };

    const openReport = (targetType) => {
        setError(null);
        setNotice(null);
        setActivePanel(activePanel === targetType ? null : targetType);
    };

    return (
        <section className="feedback">
            <div className="card-actions">
                <button className="btn-outline" type="button" onClick={toggleReviews}>
                    {activePanel === "reviews" ? "Hide reviews" : "Reviews"}
                </button>
                <button className="btn-outline" type="button" onClick={() => openReport("ITEM")}>Flag product</button>
                {item.seller?.id && (
                    <button className="btn-outline" type="button" onClick={() => openReport("SELLER")}>Flag seller</button>
                )}
            </div>

            {notice && <p className="success-text feedback-message">{notice}</p>}
            {error && <p className="error-text feedback-message">{error}</p>}

            {activePanel === "reviews" && (
                <div className="feedback-panel">
                    <h4>Student reviews</h4>
                    {loadingReviews
                        ? <p className="muted small">Loading reviews…</p>
                        : reviews.length === 0
                        ? <p className="muted small">No reviews yet.</p>
                        : reviews.map((review) => (
                            <article className="review-entry" key={review.id}>
                                <strong>{review.reviewer?.fullName || review.reviewerName || "Student"}</strong>
                                <span className="review-rating">{review.rating}/5</span>
                                <p>{review.comment}</p>
                            </article>
                        ))}
                    <form className="feedback-form" onSubmit={submitReview}>
                        <label className="field-label" htmlFor={`rating-${item.id}`}>Your rating</label>
                        <select id={`rating-${item.id}`} value={rating} onChange={(e) => setRating(e.target.value)}>
                            {[5, 4, 3, 2, 1].map((value) => <option key={value} value={value}>{value} / 5</option>)}
                        </select>
                        <label className="field-label" htmlFor={`review-${item.id}`}>Review</label>
                        <textarea
                            id={`review-${item.id}`}
                            rows="3"
                            maxLength="1000"
                            required
                            placeholder="Share an honest review of this product"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                        <button className="btn-sm" type="submit" disabled={submitting}>Submit review</button>
                    </form>
                </div>
            )}

            {(activePanel === "ITEM" || activePanel === "SELLER") && (
                <form
                    className="feedback-panel feedback-form"
                    onSubmit={(e) => submitReport(activePanel, activePanel === "SELLER" ? item.seller.id : item.id, e)}
                >
                    <h4>Flag {activePanel === "SELLER" ? "this seller" : "this product"}</h4>
                    <label className="field-label" htmlFor={`report-${activePanel}-${item.id}`}>Why does this seem suspicious?</label>
                    <textarea
                        id={`report-${activePanel}-${item.id}`}
                        rows="3"
                        maxLength="1000"
                        required
                        placeholder="Describe the issue so administrators can review it"
                        value={reportReason}
                        onChange={(e) => setReportReason(e.target.value)}
                    />
                    <button className="btn-sm" type="submit" disabled={submitting}>Send report</button>
                </form>
            )}
        </section>
    );
}

export default function Browse({ role, onMessage, onChange }) {
    const [items, setItems] = useState([]);
    const [savedIds, setSavedIds] = useState(new Set());
    const [q, setQ] = useState("");
    const [error, setError] = useState(null);
    const [notice, setNotice] = useState(null);
    const [loading, setLoading] = useState(true);
    const isStudent = role === "STUDENT";

    useEffect(() => {
        api("/items").then(setItems).catch((e) => setError(e.message)).finally(() => setLoading(false));
        if (isStudent) {
            api("/saved").then((s) => setSavedIds(new Set(s.map((i) => i.id)))).catch(() => {});
        }
    }, [isStudent]);

    const flash = (text) => {
        setNotice(text);
        setTimeout(() => setNotice(null), 2200);
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

    const toggleSave = async (item) => {
        setError(null);
        const isSaved = savedIds.has(item.id);
        try {
            await api(`/saved/${item.id}`, { method: isSaved ? "DELETE" : "POST" });
            const next = new Set(savedIds);
            if (isSaved) next.delete(item.id);
            else next.add(item.id);
            setSavedIds(next);
        } catch (e) {
            setError(e.message);
        }
    };

    const shown = items.filter((i) => `${i.title} ${i.category || ""}`.toLowerCase().includes(q.toLowerCase()));

    return (
        <main className="page">
            <div className="page-head">
                <h1>{isStudent ? "Browse items" : "Listings"}</h1>
                <input className="search" placeholder="Search items…" value={q} onChange={(e) => setQ(e.target.value)} />
            </div>

            {notice && <div className="toast">{notice}</div>}
            {error && <p className="error-text">{error}</p>}
            {loading && <p className="muted">Loading…</p>}
            {!loading && !error && shown.length === 0 && <p className="muted">No items found yet.</p>}

            <div className="items-grid">
                {shown.map((i) => (
                    <div className="item-card" key={i.id}>
                        <div className="item-img">
                            {i.imageUrl ? <img src={i.imageUrl} alt={i.title} /> : <span>No image</span>}
                        </div>
                        <div className="item-body">
                            <span className="tag">{i.category}</span>
                            <h3>{i.title}</h3>
                            <p className="muted">{i.description}</p>
                            <div className="item-foot">
                                <strong>{money(i.price)}</strong>
                                <span className="muted">{i.stock > 0 ? `${i.stock} in stock` : "Out of stock"}</span>
                            </div>
                            <p className="muted small">Sold by {i.seller?.fullName}</p>

                            {isStudent && (
                                <div className="card-actions">
                                    <button className="btn-sm" disabled={i.stock < 1} onClick={() => addToCart(i)}>Add to cart</button>
                                    <button className="btn-outline" onClick={() => toggleSave(i)}>
                                        {savedIds.has(i.id) ? "♥ Saved" : "♡ Save"}
                                    </button>
                                    <button className="btn-outline" onClick={() => onMessage(i.seller, i)}>Message</button>
                                </div>
                            )}
                            {isStudent && <StudentFeedback item={i} />}
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}