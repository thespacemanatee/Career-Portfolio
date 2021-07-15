import { useCallback, useEffect, useState } from "react";
import { RESULTS_ENDPOINT } from "react-native-dotenv";
import axios from "axios";

import { ResultsPayload, ResultsState } from "../../types";

const useFetchResults = (payload?: ResultsPayload) => {
  const [result, setResults] = useState<ResultsState>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [unmounted, setUnmounted] = useState(false);
  const [source] = useState(axios.CancelToken.source());

  const fetchResults = useCallback(
    async (data: ResultsPayload) => {
      let responseData: ResultsState;
      if (data) {
        setLoading(true);
        try {
          const response = await axios({
            method: "post",
            url: RESULTS_ENDPOINT,
            headers: {
              "Content-Type": "application/json",
            },
            data,
            cancelToken: source.token,
          });

          const { count, similar, missing } = response.data;

          responseData = {
            count: JSON.parse(count),
            similar: JSON.parse(similar),
            missing: JSON.parse(missing),
          };

          if (!unmounted) {
            setResults(responseData);
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
      }
      return responseData;
    },
    [source.token, unmounted]
  );

  useEffect(() => {
    fetchResults(payload);

    return () => {
      setUnmounted(true);
      source.cancel("Cancelling HTTP request");
    };
  }, [fetchResults, payload, source]);

  return { result, loading, error, fetchResults };
};

export default useFetchResults;
