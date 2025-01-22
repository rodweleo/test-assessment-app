
import PropTypes from 'prop-types';
import { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { AssetLocation, BikeFilter } from '../utils/types';
import { determineMovingState } from '../functions';
import 'mapbox-gl/dist/mapbox-gl.css';
import BikePopupCard from './bike-pop-up-card';
import { MdElectricBike } from 'react-icons/md';
import { renderReactToElement } from '../functions/renderReactToElement';

interface MapProps {
    filters?: BikeFilter;
    assetLocations?: AssetLocation[];
    selectedBike?: string | null;
}


const MapContainer = ({ filters, assetLocations, selectedBike }: MapProps) => {

    const mapContainer = useRef<HTMLDivElement | null>(null);
    const map = useRef<mapboxgl.Map | null>(null);
    const markersRef = useRef<mapboxgl.Marker[]>([]);



    const getMarkerColor = (asset: AssetLocation) => {
        if (determineMovingState(asset.vehiclespeed)) {
            switch (asset.tripstatus) {
                case 'ONTRIP': return 'green';
                case 'ONLINE': return 'blue';
                case 'OFFLINE': return 'gray';
                default: return 'black';
            }
        } else {
            switch (asset.tripstatus) {
                case 'ONTRIP': return 'orange';
                case 'ONLINE': return 'purple';
                case 'OFFLINE': return 'red';
                default: return 'black';
            }
        }
    };


    useEffect(() => {
        // if (!mapContainer.current) return;
        mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN!;


        map.current = new mapboxgl.Map({
            container: mapContainer.current as HTMLElement,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [36.8219, -1.2921],
            zoom: 12
        });


        map.current.addControl(
            new mapboxgl.NavigationControl(),
            'top-right'
        );

        map.current.on('load', () => {
            console.log("Map is loaded")
        })

        // Add markers for each bike
        // Clear existing markers
        markersRef.current.forEach(marker => marker.remove());
        markersRef.current = [];

        assetLocations?.forEach(asset => {
            if ((determineMovingState(asset.vehiclespeed) && filters?.moving) ||
                (!determineMovingState(asset.vehiclespeed) && filters?.parked)) {
                if (filters?.tripStatus[asset.tripstatus.toLowerCase() as keyof typeof filters.tripStatus]) {
                    const bikePopupNode = renderReactToElement(<BikePopupCard bike={asset} />);
                    const color = getMarkerColor(asset);
                    const markerElement = renderReactToElement(<MdElectricBike size={40} color={color} />);

                    const marker = new mapboxgl.Marker({
                        element: markerElement,
                        color: color,
                    })
                        .setLngLat([asset.lon, asset.lat])
                        .setPopup(
                            new mapboxgl.Popup({ offset: 25 })
                                .setDOMContent(bikePopupNode)
                        );

                    if (map.current) {
                        marker.addTo(map.current);
                    }

                    markersRef.current.push(marker);

                }

            }
        });


        return () => {
            markersRef.current.forEach(marker => marker.remove());
            if (map.current) {
                map.current.remove();
            }
        }
    }, [assetLocations, filters]);

    useEffect(() => {
        if (map.current && selectedBike && assetLocations) {
            const selectedAsset = assetLocations.find(
                (asset) => asset.licenseplate === selectedBike
            );
            if (selectedAsset) {
                map.current.flyTo({
                    center: [selectedAsset.lon, selectedAsset.lat],
                    zoom: 14,
                    essential: true,
                });
            }
        }
    }, [selectedBike, assetLocations]);


    return (
        <div className="relative h-full w-full">
            <div
                ref={mapContainer}
                className='h-full w-full'
            />
        </div>

    );
};

MapContainer.propTypes = {
    data: PropTypes.array,
    onFeatureClick: PropTypes.func,
    onLoad: PropTypes.func
};

export { MapContainer };
