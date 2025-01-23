import { useState } from "react";
import { BikeFilter } from "../../utils/types";
import FilterWidget from "../../components/filter-widget";
import { MapContainer } from "../../components/map-container";
import { useAssetLocations } from "../../hooks/useAssetLocations";
import { useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import { MapContainerKeyTable } from "../../components/map-container-key-table";

export default function Home() {
    const [filters, setFilters] = useState<BikeFilter>({
        moving: true,
        parked: true,
        tripStatus: {
            ontrip: true,
            online: true,
            offline: true
        }
    });

    const [searchParams] = useSearchParams();

    const bikeValue = searchParams.get("bike")

    const { data, isLoading, error } = useAssetLocations()

    const MAP_TOAST = "MAP_TOAST"
    if (isLoading) {
        toast.loading("Fetching asset locations...", {
            id: MAP_TOAST
        })
    }

    if (!isLoading) {
        toast.dismiss()
    }

    if (error) {
        toast.error(`Something went wrong. ${error.message}`)
    }

    return (
        <div className="h-screen w-full flex gap-5 relative">
            <MapContainer assetLocations={data ? data.asset_location ? data.asset_location : [] : []} filters={filters} selectedBike={bikeValue} />
            <div className="w-[500px] space-y-5">
                <FilterWidget filters={filters} setFilters={setFilters} />

                <MapContainerKeyTable />
            </div>
        </div>
    )
}