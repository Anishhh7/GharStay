import { useRef, useState } from 'react';
import { uploadFile } from '../api/client';

export default function ImageUploadField({ id, value, onChange, required }) {
  const inputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [dragOver, setDragOver] = useState(false);

  async function handleFile(file) {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setError('Please choose an image file.');
      return;
    }
    setError('');
    setUploading(true);
    try {
      const url = await uploadFile(file);
      onChange(url);
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          handleFile(e.dataTransfer.files?.[0]);
        }}
        onClick={() => inputRef.current?.click()}
        style={{
          border: `1px dashed ${dragOver ? 'var(--color-gold)' : 'var(--color-border)'}`,
          background: dragOver ? 'var(--color-beige)' : 'var(--color-cream)',
          padding: value ? '0.75rem' : '1.6rem',
          textAlign: 'center',
          cursor: 'pointer',
          borderRadius: 2,
        }}
      >
        {value ? (
          <div
            style={{
              display: 'flex',
              gap: '0.9rem',
              alignItems: 'center',
              textAlign: 'left',
            }}
          >
            <img
              src={value}
              alt="Uploaded preview"
              style={{
                width: 72,
                height: 72,
                objectFit: 'cover',
                flexShrink: 0,
                border: '1px solid var(--color-border)',
              }}
            />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  fontSize: '0.85rem',
                  color: 'var(--color-text-muted)',
                  wordBreak: 'break-all',
                }}
              >
                {value}
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onChange('');
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#A33B2E',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  padding: 0,
                  marginTop: '0.4rem',
                }}
              >
                Remove
              </button>
            </div>
          </div>
        ) : (
          <span
            style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}
          >
            {uploading
              ? 'Uploading…'
              : 'Click to choose a photo, or drag one here'}
          </span>
        )}
      </div>

      <input
        ref={inputRef}
        id={id}
        type="file"
        accept="image/*"
        required={required && !value}
        onChange={(e) => handleFile(e.target.files?.[0])}
        style={{
          position: 'absolute',
          width: 1,
          height: 1,
          opacity: 0,
          pointerEvents: 'none',
        }}
      />

      {uploading && (
        <div
          style={{
            fontSize: '0.82rem',
            color: 'var(--color-earth)',
            marginTop: '0.4rem',
          }}
        >
          Uploading photo…
        </div>
      )}
      {error && (
        <div
          style={{ fontSize: '0.82rem', color: '#A33B2E', marginTop: '0.4rem' }}
        >
          {error}
        </div>
      )}
    </div>
  );
}
