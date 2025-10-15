import { useEffect, useState } from "react";

function useCurrencyInfo(currency) {
    const [rates, setRates] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!currency) return;

        setLoading(true);
        setError(null);

        fetch(`https://api.frankfurter.app/latest?from=${currency}`)
            .then((res) => {
                if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
                return res.json();
            })
            .then((data) => {
                if (data && data.rates) {
                    setRates(data.rates);
                } else {
                    throw new Error("Invalid response from API");
                }
            })
            .catch((err) => {
                console.error("Error fetching currency data:", err);
                setError(err);
                setRates({});
            })
            .finally(() => setLoading(false));
    }, [currency]);

    return { rates, loading, error };
}

export default useCurrencyInfo;
