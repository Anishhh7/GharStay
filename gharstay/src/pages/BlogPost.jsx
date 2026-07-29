import { useParams, Link } from 'react-router-dom';
import Photo from '../components/Photo';
import { LoadingRow, ErrorNote } from '../components/StateBlocks';
import { useApi } from '../api/useApi';
import { blog } from '../api/resources';

export default function BlogPost() {
  const { id } = useParams();
  const postQ = useApi(() => blog.get(id), [id]);
  const post = postQ.data?.data || postQ.data;

  if (postQ.loading) return <div className="container section"><LoadingRow count={1} height={420} /></div>;
  if (postQ.error) return <div className="container section"><ErrorNote error={postQ.error} /></div>;

  return (
    <article className="section" style={{ paddingTop: 'calc(84px + var(--sp-5))' }}>
      <div className="container-narrow">
        <Link to="/blog" className="eyebrow" style={{ display: 'inline-block', marginBottom: '1.5rem' }}>← Journal</Link>
        <span className="eyebrow">{post?.date ? new Date(post.date).toLocaleDateString() : 'Journal'}</span>
        <h1 style={{ margin: '0.6rem 0 2rem' }}>{post?.title}</h1>
        <div style={{ aspectRatio: '16/9', overflow: 'hidden', marginBottom: 'var(--sp-4)' }}>
          <Photo id="lanterns" alt="" />
        </div>
        <div style={{ color: 'var(--color-text)', fontSize: 'var(--fs-body-lg)', lineHeight: 1.75, whiteSpace: 'pre-line' }}>
          {post?.content || post?.body || post?.excerpt || 'This post has no content yet.'}
        </div>
      </div>
    </article>
  );
}
