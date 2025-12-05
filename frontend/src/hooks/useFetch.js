import { useEffect, useState } from 'react';
import axios from '../api/axiosInstance';

export default function useFetch(url, options) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    axios(url, options)
      .then((res) => mounted && setData(res.data))
      .catch((e) => mounted && setError(e))
      .finally(() => mounted && setLoading(false));
    return () => { mounted = false; };
  }, [url]);

  return { data, loading, error };
}


