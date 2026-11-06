import { useEffect, useRef, useState } from "react";
import { api } from "../api";

export default function Messages({ target, onChange }) {
    const [convos, setConvos] = useState([]);
    const [active, setActive] = useState(target ? { userId: target.userId, name: target.name } : null);
    const [ctx, setCtx] = useState(target?.itemId ? { id: target.itemId, title: target.itemTitle } : null);
    const [thread, setThread] = useState([]);
    const [text, setText] = useState("");
    const [error, setError] = useState(null);
    const bottom = useRef(null);

    const loadConvos = () =>
        api("/messages/conversations").then(setConvos).catch((e) => setError(e.message));

    const loadThread = (id) =>
        api(`/messages/with/${id}`)
            .then((t) => { setThread(t); onChange?.(); })
            .catch((e) => setError(e.message));

    useEffect(() => {
        loadConvos();
        const t = setInterval(loadConvos, 10000);
        return () => clearInterval(t);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (!active) return;
        loadThread(active.userId);
        const t = setInterval(() => loadThread(active.userId), 8000);
        return () => clearInterval(t);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [active?.userId]);

    useEffect(() => {
        bottom.current?.scrollIntoView({ behavior: "smooth" });
    }, [thread.length]);

    const open = (c) => {
        setError(null);
        setThread([]);
        setCtx(null);
        setActive({ userId: c.userId, name: c.name });
    };

    const send = async (e) => {
        e.preventDefault();
        if (!text.trim() || !active) return;
        setError(null);
        try {
            await api("/messages", {
                method: "POST",
                body: { receiverId: active.userId, itemId: ctx?.id ?? null, content: text.trim() },
            });
            setText("");
            setCtx(null);
            await loadThread(active.userId);
            loadConvos();
        } catch (err) {
            setError(err.message);
        }
    };

    const list = active && !convos.some((c) => c.userId === active.userId)
        ? [{ userId: active.userId, name: active.name, lastMessage: "New conversation", unread: 0 }, ...convos]
        : convos;

    return (
        <main className="page">
            <h1>Messages</h1>

            <div className="chat">
                <aside className="chat-list">
                    {list.length === 0 && <p className="muted pad">No conversations yet. Students can start one with "Message" on an item.</p>}
                    {list.map((c) => (
                        <button key={c.userId} className={active?.userId === c.userId ? "chat-row active" : "chat-row"} onClick={() => open(c)}>
                            <div>
                                <strong>{c.name}</strong>
                                <p className="muted clip">{c.lastMessage}</p>
                            </div>
                            {c.unread > 0 && <span className="badge">{c.unread}</span>}
                        </button>
                    ))}
                </aside>

                <section className="chat-pane">
                    {!active ? (
                        <p className="muted pad">Select a conversation.</p>
                    ) : (
                        <>
                            <div className="chat-title">{active.name}</div>
                            <div className="chat-thread">
                                {thread.length === 0 && <p className="muted">No messages yet. Say hello!</p>}
                                {thread.map((m) => (
                                    <div key={m.id} className={m.mine ? "bubble mine" : "bubble"}>
                                        {m.itemTitle && <span className="bubble-item">About: {m.itemTitle}</span>}
                                        <p>{m.content}</p>
                                        <span className="bubble-time">{new Date(m.createdAt).toLocaleString()}</span>
                                    </div>
                                ))}
                                <div ref={bottom} />
                            </div>

                            {ctx && (
                                <div className="chat-ctx">
                                    About: <strong>{ctx.title}</strong>
                                    <button type="button" onClick={() => setCtx(null)}>×</button>
                                </div>
                            )}
                            {error && <p className="error-text pad">{error}</p>}

                            <form className="chat-form" onSubmit={send}>
                                <input placeholder="Type a message…" value={text} maxLength={1000} onChange={(e) => setText(e.target.value)} />
                                <button className="btn-sm" type="submit">Send</button>
                            </form>
                        </>
                    )}
                </section>
            </div>
        </main>
    );
}