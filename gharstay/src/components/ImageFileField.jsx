import { useRef, useState } from 'react';

export default function ImageFileField({
  id,
  file,
  existingUrl,
  onChange,
  required,
  disabled,
}) {
  const inputRef = useRef(null);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState('');

  const previewUrl = file ? URL.createObjectURL(file) : existingUrl;

  function handleFile(f) {
    if (!f) return;
    if (!f.type.startsWith('image/')) {
      setError('Please choose an image file.');
      return;
    }
    setError('');
    onChange(f);
  }

  if (disabled) {
    return (
      <div>
        {existingUrl ? (
          <img
            src={existingUrl}
            alt=""
            style={{
              width: 72,
              height: 72,
              objectFit: 'cover',
              border: '1px solid var(--color-border)',
            }}
          />
        ) : (
          <span
            style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}
          >
            No photo
          </span>
        )}
        <div
          style={{
            fontSize: '0.78rem',
            color: 'var(--color-text-muted)',
            marginTop: '0.4rem',
          }}
        >
          Photo can't be changed from here yet — the update endpoint doesn't
          accept a new file.
        </div>
      </div>
    );
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
          padding: previewUrl ? '0.75rem' : '1.6rem',
          textAlign: 'center',
          cursor: 'pointer',
          borderRadius: 2,
        }}
      >
        {previewUrl ? (
          <div
            style={{
              display: 'flex',
              gap: '0.9rem',
              alignItems: 'center',
              textAlign: 'left',
            }}
          >
            <img
              src={previewUrl}
              alt=""
              style={{
                width: 72,
                height: 72,
                objectFit: 'cover',
                flexShrink: 0,
                border: '1px solid var(--color-border)',
              }}
            />
            <div>
              <div
                style={{
                  fontSize: '0.85rem',
                  color: 'var(--color-text-muted)',
                }}
              >
                {file ? file.name : 'Current photo'}
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onChange(null);
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
            Click to choose a photo, or drag one here
          </span>
        )}
      </div>

      <input
        ref={inputRef}
        id={id}
        type="file"
        accept="image/*"
        required={required && !previewUrl}
        onChange={(e) => handleFile(e.target.files?.[0])}
        style={{
          position: 'absolute',
          width: 1,
          height: 1,
          opacity: 0,
          pointerEvents: 'none',
        }}
      />

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
