import { useQuery } from "@tanstack/react-query";
import { fetchBikes } from "../functions/fetchBikes";

export const useBikes = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ["bikes"],
        queryFn: fetchBikes,
    });

    return { data, isLoading, error }
}