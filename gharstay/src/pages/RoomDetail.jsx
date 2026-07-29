import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Photo from '../components/Photo';
import { LoadingRow, ErrorNote } from '../components/StateBlocks';
import { useApi } from '../api/useApi';
import { rooms, reservations } from '../api/resources';

export default function RoomDetail() {
  const { id } = useParams();
  const roomQ = useApi(() => rooms.get(id), [id]);
  const room = roomQ.data?.data || roomQ.data;

  const [form, setForm] = useState({ checkIn: '', checkOut: '', guests: 2, name: '', email: '', phone: '' });
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [errorMsg, setErrorMsg] = useState('');

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  async function submit(e) {
    e.preventDefault();
    setStatus('submitting');
    setErrorMsg('');
    try {
      await reservations.create({ roomId: id, ...form });
      setStatus('success');
    } catch (err) {
      setStatus('error');
      setErrorMsg(err.message);
    }
  }

  if (roomQ.loading) {
    return <div className="container section"><LoadingRow count={1} height={480} /></div>;
  }
  if (roomQ.error) {
    return <div className="container section"><ErrorNote error={roomQ.error} /></div>;
  }

  return (
    <section className="section" style={{ paddingTop: 'calc(84px + var(--sp-5))' }}>
      <div className="container">
        <Link to="/rooms" className="eyebrow" style={{ display: 'inline-block', marginBottom: '1.5rem' }}>← All rooms</Link>
        <h1 style={{ marginBottom: '2rem' }}>{room?.name || 'Room'}</h1>

        <div className="split-detail">
          <div>
            <div className="split-detail__gallery">
              <Photo id="roomSuite" alt={room?.name} />
              <Photo id="roomInterior" alt="" />
              <Photo id="villaExterior" alt="" />
            </div>

            <div style={{ marginTop: 'var(--sp-4)' }}>
              <h4>About this room</h4>
              <p style={{ color: 'var(--color-text-muted)', marginTop: '0.8rem', maxWidth: '60ch' }}>
                {room?.description || 'A quiet, timber-lined room finished with local stone and hand-woven textiles, facing the terraced hillside.'}
              </p>

              {room?.amenities?.length > 0 && (
                <>
                  <h5 style={{ marginTop: 'var(--sp-3)' }}>Amenities</h5>
                  <ul className="amenity-list">
                    {room.amenities.map((a, i) => <li key={i}>{a}</li>)}
                  </ul>
                </>
              )}
            </div>
          </div>

          <div className="detail-panel">
            {status === 'success' ? (
              <div className="notice notice--success">
                Reservation request sent. The team will confirm availability by email shortly.
              </div>
            ) : (
              <form onSubmit={submit}>
                <div className="detail-panel__price">
                  {room?.price ? `$${room.price}` : 'On request'} <span>/ night</span>
                </div>

                {status === 'error' && <div className="notice notice--error">{errorMsg}</div>}

                <div className="two-col-form">
                  <div className="form-field">
                    <label htmlFor="checkIn">Check in</label>
                    <input id="checkIn" type="date" required value={form.checkIn} onChange={update('checkIn')} />
                  </div>
                  <div className="form-field">
                    <label htmlFor="checkOut">Check out</label>
                    <input id="checkOut" type="date" required value={form.checkOut} onChange={update('checkOut')} />
                  </div>
                </div>
                <div className="form-field">
                  <label htmlFor="guests">Guests</label>
                  <input id="guests" type="number" min="1" value={form.guests} onChange={update('guests')} />
                </div>
                <div className="form-field">
                  <label htmlFor="name">Full name</label>
                  <input id="name" required value={form.name} onChange={update('name')} />
                </div>
                <div className="form-field">
                  <label htmlFor="email">Email</label>
                  <input id="email" type="email" required value={form.email} onChange={update('email')} />
                </div>
                <div className="form-field">
                  <label htmlFor="phone">Phone</label>
                  <input id="phone" value={form.phone} onChange={update('phone')} />
                </div>

                <button className="btn btn-primary" type="submit" disabled={status === 'submitting'} style={{ width: '100%', justifyContent: 'center' }}>
                  {status === 'submitting' ? 'Sending…' : 'Request to book'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
