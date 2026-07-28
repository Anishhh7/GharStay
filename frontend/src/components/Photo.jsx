// Curated Unsplash photo IDs standing in for real property photography.
// Swap these for actual GharStay shoot assets (or API-served gallery images)
// when available — component API stays the same.
const PHOTO_IDS = {
  heroForest: '1571896349842-33c89424de2d',
  heroMountainLodge: '1518733057094-95b53143d2a7',
  heroForestRoad: '1506905925346-21bda4d32df4',
  pool: '1544986581-efac024faf62',
  villaExterior: '1544984243-ec57ea16fe25',
  dining: '1571003123894-1f0594d2b5d9',
  spa: '1544148103-0773bf10d330',
  roomInterior: '1560448204-e02f11c3d0e2',
  roomSuite: '1590490360182-c33d57733427',
  breakfast: '1533777857889-4be7c70b33f7',
  garden: '1465188162913-8fb5709d6523',
  lanterns: '1519167758481-83f29c1fe8ff',
  fire: '1475483768296-6163e08872a1',
  yoga: '1544367567-0f2fcb009e0b',
  trail: '1441974231531-c6227db76b6e',
};

export function photoUrl(key, { w = 1200, q = 80 } = {}) {
  const id = PHOTO_IDS[key] || PHOTO_IDS.heroForest;
  return `https://images.unsplash.com/photo-${id}?w=${w}&q=${q}&auto=format&fit=crop`;
}

export default function Photo({ id, alt = '', w = 1200, q = 80, style, className }) {
  return (
    <img
      src={photoUrl(id, { w, q })}
      alt={alt}
      loading="lazy"
      style={{ width: '100%', height: '100%', objectFit: 'cover', ...style }}
      className={className}
    />
  );
}
