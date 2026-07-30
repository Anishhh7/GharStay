import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import Photo from '../components/Photo';
import { LoadingRow, ErrorNote, EmptyNote } from '../components/StateBlocks';
import { useApi, asList } from '../api/useApi';
import { rooms } from '../api/resources';

const IMG_CYCLE = ['roomInterior', 'roomSuite', 'villaExterior'];

export default function Rooms() {
  const roomsQ = useApi(() => rooms.list(), []);
  const list = asList(roomsQ.data);

  return (
    <>
      <PageHero
        eyebrow="Where you'll sleep"
        title="Rooms & suites"
        text="Eleven rooms, each built by hand from local timber and stone — no two laid out quite the same."
        photoId="roomSuite"
      />
      <section className="section">
        <div className="container">
          {roomsQ.loading && <LoadingRow count={6} height={360} />}
          {roomsQ.error && <ErrorNote error={roomsQ.error} retry={() => window.location.reload()} />}
          {!roomsQ.loading && !roomsQ.error && list.length === 0 && (
            <EmptyNote text="No rooms are published yet — add some from the admin panel." />
          )}
          {list.length > 0 && (
            <div className="card-grid">
              {list.map((room, i) => (
                <Link to={`/rooms/${room.id || room._id}`} key={room.id || room._id || i} className="plain-card">
                  <div className="plain-card__image">
                    {room.images?.[0] ? (
                      <img src={room.images[0]} alt={room.roomName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <Photo id={IMG_CYCLE[i % IMG_CYCLE.length]} alt={room.roomName} />
                    )}
                  </div>
                  <h5>{room.roomName || 'Room'}</h5>
                  <div className="plain-card__meta">
                    {room.roomType ? `${room.roomType} · ` : ''}
                    {room.price ? `$${room.price} / night` : 'Rates on request'}
                    {room.occupancy ? ` · Sleeps ${room.occupancy}` : ''}
                  </div>
                  {room.description && <p className="plain-card__text">{room.description.slice(0, 100)}</p>}
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}