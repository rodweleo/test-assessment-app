import { fetchAssetLocations } from "../functions/fetchAssetLocations"
import { useQuery } from "@tanstack/react-query"

export const useAssetLocations = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ["assetLocations"],
        queryFn: fetchAssetLocations,
    });

    return { data, isLoading, error }

}