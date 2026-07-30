import { useRef, useState } from 'react';
import { uploadFile } from '../api/client';

export default function MultiImageUploadField({ id, value, onChange }) {
  const urls = Array.isArray(value) ? value : [];
  const inputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [dragOver, setDragOver] = useState(false);

  async function handleFiles(fileList) {
    const files = Array.from(fileList || []).filter((f) => f.type.startsWith('image/'));
    if (files.length === 0) {
      setError('Please choose image files.');
      return;
    }
    setError('');
    setUploading(true);
    try {
      const uploaded = await Promise.all(files.map((f) => uploadFile(f)));
      onChange([...urls, ...uploaded]);
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  }

  function removeAt(i) {
    onChange(urls.filter((_, idx) => idx !== i));
  }

  return (
    <div>
      {urls.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.6rem' }}>
          {urls.map((url, i) => (
            <div key={i} style={{ position: 'relative', width: 64, height: 64 }}>
              <img src={url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', border: '1px solid var(--color-border)' }} />
              <button
                type="button"
                onClick={() => removeAt(i)}
                aria-label="Remove image"
                style={{
                  position: 'absolute', top: -6, right: -6, width: 20, height: 20, borderRadius: '50%',
                  background: '#A33B2E', color: '#fff', border: 'none', fontSize: '0.75rem', lineHeight: 1, cursor: 'pointer',
                }}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFiles(e.dataTransfer.files); }}
        onClick={() => inputRef.current?.click()}
        style={{
          border: `1px dashed ${dragOver ? 'var(--color-gold)' : 'var(--color-border)'}`,
          background: dragOver ? 'var(--color-beige)' : 'var(--color-cream)',
          padding: '1rem',
          textAlign: 'center',
          cursor: 'pointer',
          borderRadius: 2,
        }}
      >
        <span style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
          {uploading ? 'Uploading…' : 'Click to add photos, or drag them here'}
        </span>
      </div>

      <input
        ref={inputRef}
        id={id}
        type="file"
        accept="image/*"
        multiple
        onChange={(e) => handleFiles(e.target.files)}
        style={{ position: 'absolute', width: 1, height: 1, opacity: 0, pointerEvents: 'none' }}
      />

      {error && <div style={{ fontSize: '0.82rem', color: '#A33B2E', marginTop: '0.4rem' }}>{error}</div>}
    </div>
  );
}