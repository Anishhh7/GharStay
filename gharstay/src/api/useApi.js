import { useEffect, useRef, useState } from 'react';

/**
 * Runs an async fetcher on mount (and whenever deps change), tracking
 * loading/error/data state. fetcher must be stable-ish; pass deps to
 * control re-fetching, same as useEffect.
 */
export function useApi(fetcher, deps = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const alive = useRef(true);

  useEffect(() => {
    alive.current = true;
    setLoading(true);
    setError(null);
    fetcher()
      .then((res) => { if (alive.current) setData(res); })
      .catch((err) => { if (alive.current) setError(err); })
      .finally(() => { if (alive.current) setLoading(false); });
    return () => { alive.current = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { data, loading, error };
}

// Normalizes list responses that may come back as a bare array or as
// { data: [...] } / { items: [...] } / { results: [...] } wrappers.
export function asList(response) {
  if (!response) return [];
  if (Array.isArray(response)) return response;
  return response.data || response.items || response.results || [];
}
