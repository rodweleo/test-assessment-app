import { fetchDrivers } from "../functions/fetchDrivers";
import { useQuery } from "@tanstack/react-query";

export const useDrivers = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ["drivers"],
        queryFn: fetchDrivers,
    });

    return { data, isLoading, error }

}