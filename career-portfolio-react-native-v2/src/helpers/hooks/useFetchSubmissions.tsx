import { useCallback, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { ResultsLocalStorageItem } from "../../types";

const useFetchSubmissions = () => {
  const [result, setResults] = useState<ResultsLocalStorageItem[]>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [unmounted, setUnmounted] = useState(false);

  const resetSubmissions = async () => {
    try {
      await AsyncStorage.removeItem("savedEntries");
      await fetchSubmissions();
    } catch (err) {
      setError(err);
    }
  };

  const fetchSubmissions = useCallback(async () => {
    setLoading(true);
    try {
      const res: ResultsLocalStorageItem[] = JSON.parse(
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
        setError(err);
        setLoading(false);
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
