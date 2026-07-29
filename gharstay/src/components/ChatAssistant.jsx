import { useEffect, useRef, useState } from 'react';
import { aiAssistant } from '../api/resources';
import './chatAssistant.css';

const GREETING = {
  role: 'assistant',
  text: "Namaste — I'm the GharStay guide. Ask me about rooms, the restaurant, packages, or getting here.",
};

export default function ChatAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([GREETING]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, open]);

  async function send(e) {
    e.preventDefault();
    const text = input.trim();
    if (!text || sending) return;

    setMessages((m) => [...m, { role: 'user', text }]);
    setInput('');
    setSending(true);
    setError('');

    try {
      const res = await aiAssistant.ask(text);
      // Confirmed from askAssitant: keyword matches respond with
      // { data: { answer } }; the Gemini fallback responds with
      // { data: <whatever getGeminiAnswer returns> }, which may be a
      // plain string or an object — handle both.
      const payload = res?.data ?? res;
      const reply =
        (typeof payload === 'string' && payload) ||
        payload?.answer || payload?.reply || payload?.text ||
        "Got a response but couldn't read it — check what getGeminiAnswer() returns.";
      setMessages((m) => [...m, { role: 'assistant', text: reply }]);
    } catch (err) {
      setError(err.message);
      setMessages((m) => [...m, { role: 'assistant', text: "Sorry, I couldn't reach the assistant just now." }]);
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="chat-widget">
      {open && (
        <div className="chat-widget__panel">
          <div className="chat-widget__header">
            <span>GharStay guide</span>
            <button aria-label="Close chat" onClick={() => setOpen(false)}>×</button>
          </div>

          <div className="chat-widget__messages" ref={scrollRef}>
            {messages.map((m, i) => (
              <div key={i} className={`chat-widget__bubble chat-widget__bubble--${m.role}`}>
                {m.text}
              </div>
            ))}
            {sending && <div className="chat-widget__bubble chat-widget__bubble--assistant chat-widget__typing">···</div>}
          </div>

          {error && <div className="chat-widget__error">{error}</div>}

          <form className="chat-widget__input" onSubmit={send}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about your stay…"
              aria-label="Message"
            />
            <button type="submit" disabled={sending || !input.trim()}>Send</button>
          </form>
        </div>
      )}

      <button className="chat-widget__toggle" onClick={() => setOpen((o) => !o)} aria-label={open ? 'Close chat assistant' : 'Open chat assistant'}>
        {open ? '×' : '💬'}
      </button>
    </div>
  );
}
