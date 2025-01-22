import { useState } from "react";
import { BikeFilter } from "../../utils/types";
import FilterWidget from "../../components/filter-widget";
import { MapContainer } from "../../components/map-container";
import { useAssetLocations } from "../../hooks/useAssetLocations";
import { useSearchParams } from "react-router-dom";

export default function Home() {
    const [filters, setFilters] = useState<BikeFilter>({
        moving: true,
        parked: true,
        tripStatus: {
            trip: true,
            online: true,
            offline: true
        }
    });

    const searchParams = useSearchParams()
    const params = searchParams[0]


    const { data, isLoading, error } = useAssetLocations()

    return (
        <div className="h-screen w-full flex gap-5 relative">
            <MapContainer assetLocations={data ? data.asset_location ? data.asset_location : [] : []} filters={filters} />
            <div className="w-80">
                <FilterWidget filters={filters} setFilters={setFilters} />
            </div>
        </div>
    )
}