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

  const [form, setForm] = useState({
    checkedIn: '', checkedOut: '', numberOfGuests: 2,
    customerName: '', customerEmail: '', customerNumber: '', remarks: '',
  });
  const [status, setStatus] = useState('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  async function submit(e) {
    e.preventDefault();
    setStatus('submitting');
    setErrorMsg('');
    try {
      await reservations.create({ room: id, ...form });
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
        <h1 style={{ marginBottom: '2rem' }}>{room?.roomName || 'Room'}</h1>

        <div className="split-detail">
          <div>
            <div className="split-detail__gallery">
              {room?.images?.length > 0 ? (
                room.images.slice(0, 3).map((url, i) => <img key={i} src={url} alt={room.roomName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />)
              ) : (
                <>
                  <Photo id="roomSuite" alt={room?.roomName} />
                  <Photo id="roomInterior" alt="" />
                  <Photo id="villaExterior" alt="" />
                </>
              )}
            </div>

            <div style={{ marginTop: 'var(--sp-4)' }}>
              <h4>About this room</h4>
              {room?.roomType && (
                <span className="eyebrow" style={{ display: 'inline-block', marginTop: '0.6rem' }}>{room.roomType}{room.occupancy ? ` · Sleeps ${room.occupancy}` : ''}</span>
              )}
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

              {room?.features?.length > 0 && (
                <>
                  <h5 style={{ marginTop: 'var(--sp-3)' }}>Features</h5>
                  <ul className="amenity-list">
                    {room.features.map((f, i) => <li key={i}>{f}</li>)}
                  </ul>
                </>
              )}
            </div>
          </div>

          <div className="detail-panel">
            {room?.availability === false ? (
              <div className="notice">This room isn't currently available for booking — check back soon, or ask the front desk about similar rooms.</div>
            ) : status === 'success' ? (
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
                    <label htmlFor="checkedIn">Check in</label>
                    <input id="checkedIn" type="date" required value={form.checkedIn} onChange={update('checkedIn')} />
                  </div>
                  <div className="form-field">
                    <label htmlFor="checkedOut">Check out</label>
                    <input id="checkedOut" type="date" required value={form.checkedOut} onChange={update('checkedOut')} />
                  </div>
                </div>
                <div className="form-field">
                  <label htmlFor="numberOfGuests">Guests</label>
                  <input id="numberOfGuests" type="number" min="1" value={form.numberOfGuests} onChange={update('numberOfGuests')} />
                </div>
                <div className="form-field">
                  <label htmlFor="customerName">Full name</label>
                  <input id="customerName" required value={form.customerName} onChange={update('customerName')} />
                </div>
                <div className="form-field">
                  <label htmlFor="customerEmail">Email</label>
                  <input id="customerEmail" type="email" required value={form.customerEmail} onChange={update('customerEmail')} />
                </div>
                <div className="form-field">
                  <label htmlFor="customerNumber">Phone (with country code, e.g. +9779800000000)</label>
                  <input id="customerNumber" required placeholder="+9779800000000" value={form.customerNumber} onChange={update('customerNumber')} />
                </div>
                <div className="form-field">
                  <label htmlFor="remarks">Remarks (optional)</label>
                  <textarea id="remarks" rows={3} value={form.remarks} onChange={update('remarks')} />
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