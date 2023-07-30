import { useState } from "react";

export default function useFetch({ entity }) {
  const [result, setResult] = useState(null);
  const [pagination, setPagination] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onFetch = async (Fn) => {
    const { data, isLoading, isSuccess } = await Fn({ entity });

    if (isSuccess) {
      setResult(data.result);
      setPagination(data.pagination);
      setIsSuccess(true);
    } else {
      setIsSuccess(false);
    }

    setIsLoading(isLoading);
  };

  return { onFetch, result, pagination, isSuccess, isLoading };
}
