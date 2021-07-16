import { useCallback, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { ResultsLocalStorage } from "../../types";

const useFetchSubmissions = () => {
  const [result, setResults] = useState<ResultsLocalStorage>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [unmounted, setUnmounted] = useState(false);

  const resetSubmissions = async () => {
    try {
      await AsyncStorage.removeItem("savedEntries");
      setError(null);
    } catch (err) {
      setError(err);
    }
    if (!unmounted) {
      setResults(null);
      setLoading(false);
    }
  };

  const fetchSubmissions = useCallback(async () => {
    setLoading(true);
    try {
      const res: ResultsLocalStorage = JSON.parse(
        await AsyncStorage.getItem("savedEntries")
      );

      if (!unmounted) {
        setResults(res);
        setLoading(false);
        setError(null);
      }
    } catch (err) {
      if (!unmounted) {
        setResults(null);
        setLoading(false);
        setError(err);
      }
    }
  }, [unmounted]);

  useEffect(() => {
    fetchSubmissions();

    return () => {
      setUnmounted(true);
    };
  }, [fetchSubmissions]);

  return { result, loading, error, resetSubmissions };
};

export default useFetchSubmissions;
