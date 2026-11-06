import { useCallback, useEffect, useState } from "react";
import { api } from "../api";

export default function Feedback({ currentUser }) {
    const [reviews, setReviews] = useState([]);
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadFeedback = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const [reviewResults, reportResults] = await Promise.all([
                api("/admin/reviews"),
                api("/admin/reports"),
            ]);
            setReviews(Array.isArray(reviewResults) ? reviewResults : reviewResults.reviews || []);
            setReports(Array.isArray(reportResults) ? reportResults : reportResults.reports || []);
        } catch (e) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (currentUser.role === "ADMIN") loadFeedback();
    }, [currentUser.role, loadFeedback]);

    if (currentUser.role !== "ADMIN") {
        return <main className="page"><p className="error-text">Only administrators can view marketplace feedback.</p></main>;
    }

    return (
        <main className="page">
            <div className="page-head">
                <h1>Reviews &amp; reports</h1>
                <button className="btn-outline" type="button" onClick={loadFeedback} disabled={loading}>
                    {loading ? "Loading…" : "Refresh"}
                </button>
            </div>
            {error && <p className="error-text">{error}</p>}

            <section className="panel">
                <h2 className="feedback-section-title">Product reviews ({reviews.length})</h2>
                {loading && <p className="muted">Loading reviews…</p>}
                {!loading && reviews.length === 0 && <p className="muted">No product reviews have been submitted.</p>}
                {reviews.map((review) => (
                    <article className="moderation-entry" key={review.id}>
                        <div className="moderation-entry-head">
                            <strong>{review.item?.title || review.itemTitle || `Product ${review.itemId || ""}`}</strong>
                            <span className="review-rating">{review.rating}/5</span>
                        </div>
                        <p>{review.comment}</p>
                        <p className="muted small">
                            By {review.reviewer?.fullName || review.reviewerName || "Student"}
                            {review.createdAt ? ` · ${new Date(review.createdAt).toLocaleDateString()}` : ""}
                        </p>
                    </article>
                ))}
            </section>

            <section className="panel">
                <h2 className="feedback-section-title">Suspicious product and seller reports ({reports.length})</h2>
                {loading && <p className="muted">Loading reports…</p>}
                {!loading && reports.length === 0 && <p className="muted">No reports have been submitted.</p>}
                {reports.map((report) => (
                    <article className="moderation-entry" key={report.id}>
                        <div className="moderation-entry-head">
                            <strong>{report.targetType === "SELLER" ? "Seller report" : "Product report"}</strong>
                            <span className="tag">{report.status || "OPEN"}</span>
                        </div>
                        <p>{report.reason}</p>
                        <p className="muted small">
                            Target: {report.target?.fullName || report.target?.title || report.targetId}
                            {report.reporter?.fullName ? ` · Reported by ${report.reporter.fullName}` : ""}
                            {report.createdAt ? ` · ${new Date(report.createdAt).toLocaleDateString()}` : ""}
                        </p>
                    </article>
                ))}
            </section>
        </main>
    );
}
