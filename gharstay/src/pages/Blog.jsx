import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import Photo from '../components/Photo';
import { LoadingRow, ErrorNote, EmptyNote } from '../components/StateBlocks';
import { useApi, asList } from '../api/useApi';
import { blog } from '../api/resources';

const IMG_CYCLE = ['lanterns', 'garden', 'trail', 'breakfast'];

export default function Blog() {
  const blogQ = useApi(() => blog.list(), []);
  const list = asList(blogQ.data);

  return (
    <>
      <PageHero eyebrow="Notes from the valley" title="Journal" photoId="garden" />
      <section className="section">
        <div className="container">
          {blogQ.loading && <LoadingRow count={4} height={340} />}
          {blogQ.error && <ErrorNote error={blogQ.error} />}
          {!blogQ.loading && !blogQ.error && list.length === 0 && (
            <EmptyNote text="No journal entries published yet." />
          )}
          {list.length > 0 && (
            <div className="card-grid">
              {list.map((post, i) => (
                <Link to={`/blog/${post.id || post._id}`} key={post.id || post._id || i} className="plain-card">
                  <div className="plain-card__image">
                    <Photo id={IMG_CYCLE[i % IMG_CYCLE.length]} alt={post.title} />
                  </div>
                  <span className="plain-card__meta">{post.date ? new Date(post.date).toLocaleDateString() : ''}</span>
                  <h5 style={{ marginTop: '0.3rem' }}>{post.title}</h5>
                  {(post.excerpt || post.summary) && <p className="plain-card__text">{post.excerpt || post.summary}</p>}
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
