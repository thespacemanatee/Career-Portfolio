import { useCallback, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { ResultsLocalStorage } from "../../types";
import { deleteUserInput } from "../utils";

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

  const deleteSubmission = async (id: string) => {
    try {
      await deleteUserInput(id);
    } catch (err) {
      setError(err);
    }
    await fetchSubmissions();
  };

  const fetchSubmissions = useCallback(async () => {
    setLoading(true);
    try {
      const res: ResultsLocalStorage = JSON.parse(
        await AsyncStorage.getItem("savedEntries")
      );

      if (!unmounted) {
        setResults(Object.keys(res).length > 0 ? res : null);
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

  return { result, loading, error, deleteSubmission, resetSubmissions };
};

export default useFetchSubmissions;
