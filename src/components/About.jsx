const FAQS = [
    {
        question: "Who can use Student Marketplace?",
        answer: "Students can browse, save, review, and buy listings. Sellers can create listings and manage sales. Administrators help keep the marketplace safe.",
    },
    {
        question: "How do I review a product?",
        answer: "Open Browse, select Reviews on a product, choose a rating, and write an honest comment about your experience.",
    },
    {
        question: "How do I report suspicious activity?",
        answer: "Use Flag product or Flag seller on the listing. Include clear details so an administrator can investigate.",
    },
    {
        question: "What should I do before buying?",
        answer: "Read the listing and reviews carefully, and message the seller if you need more information. Meet and exchange items safely on campus.",
    },
];

export default function About() {
    return (
        <main className="page">
            <section className="panel about-intro">
                <h1>About Student Marketplace</h1>
                <p>
                    Student Marketplace helps campus communities buy and sell useful items in one place.
                    Students can discover listings, contact sellers, and share feedback; sellers can reach
                    local buyers; and administrators can review safety reports.
                </p>
            </section>

            <section className="panel">
                <h2 className="feedback-section-title">Frequently asked questions</h2>
                <div className="faq-list">
                    {FAQS.map(({ question, answer }) => (
                        <details className="faq-entry" key={question}>
                            <summary>{question}</summary>
                            <p>{answer}</p>
                        </details>
                    ))}
                </div>
            </section>
        </main>
    );
}
