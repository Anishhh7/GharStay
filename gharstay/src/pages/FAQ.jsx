import { useState } from 'react';
import PageHero from '../components/PageHero';
import { LoadingRow, ErrorNote, EmptyNote } from '../components/StateBlocks';
import { useApi, asList } from '../api/useApi';
import { faq } from '../api/resources';

function FaqRow({ item }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: '1px solid var(--color-border)' }}>
      <button
        onClick={() => setOpen((o) => !o)}
        style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', padding: '1.2rem 0', display: 'flex', justifyContent: 'space-between', gap: '1rem' }}
      >
        <h5 style={{ margin: 0 }}>{item.question}</h5>
        <span style={{ color: 'var(--color-gold)', fontSize: '1.3rem' }}>{open ? '−' : '+'}</span>
      </button>
      {open && <p style={{ color: 'var(--color-text-muted)', paddingBottom: '1.2rem', maxWidth: '65ch' }}>{item.answer}</p>}
    </div>
  );
}

export default function FAQ() {
  const faqQ = useApi(() => faq.list(), []);
  const list = asList(faqQ.data);

  return (
    <>
      <PageHero eyebrow="Good to know" title="Frequently asked questions" photoId="spa" />
      <section className="section">
        <div className="container-narrow">
          {faqQ.loading && <LoadingRow count={5} height={60} />}
          {faqQ.error && <ErrorNote error={faqQ.error} />}
          {!faqQ.loading && !faqQ.error && list.length === 0 && <EmptyNote text="No FAQs published yet." />}
          {list.map((item, i) => <FaqRow item={item} key={item.id || item._id || i} />)}
        </div>
      </section>
    </>
  );
}
