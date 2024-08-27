import { useState, useEffect } from 'react';

function usePost(url, body, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const postData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...options.headers, // Merge custom headers if provided
          },
          body: JSON.stringify(body),
          ...options, // Spread other options (e.g., credentials)
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        if (isMounted) {
          setData(data);
        }
      } catch (error) {
        if (isMounted) {
          setError(error.message);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    postData();

    return () => {
      isMounted = false;
    };
  }, [url, body, options]);

  return { data, loading, error };
}

export default usePost;
