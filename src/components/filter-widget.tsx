import React from 'react';
import { Card } from './ui/card';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';
import { BikeFilter } from '../utils/types';

interface FilterWidgetProps {
    filters: BikeFilter;
    setFilters: React.Dispatch<React.SetStateAction<BikeFilter>>;
}

const FilterWidget = ({ filters, setFilters }: FilterWidgetProps) => {
    const updateFilter = (key: keyof BikeFilter, value: boolean) => {
        setFilters(prev => ({
            ...prev,
            [key]: value
        }));
    };

    const updateTripStatus = (key: keyof BikeFilter['tripStatus'], value: boolean) => {
        setFilters(prev => ({
            ...prev,
            tripStatus: {
                ...prev.tripStatus,
                [key]: value
            }
        }));
    };

    return (
        <Card className="p-4">
            <h2 className="text-lg font-semibold mb-4">Filter Bikes</h2>

            <div className="space-y-4">
                <div className="space-y-2">
                    <h3 className="text-sm font-medium">Bike Status</h3>
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="moving"
                            checked={filters.moving}
                            onCheckedChange={(checked) => updateFilter('moving', checked as boolean)}
                        />
                        <Label htmlFor="moving">Moving</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="parked"
                            checked={filters.parked}
                            onCheckedChange={(checked) => updateFilter('parked', checked as boolean)}
                        />
                        <Label htmlFor="parked">Parked</Label>
                    </div>
                </div>

                <div className="space-y-2">
                    <h3 className="text-sm font-medium">Trip Status</h3>
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="trip"
                            checked={filters.tripStatus.ontrip}
                            onCheckedChange={(checked) => updateTripStatus('ontrip', checked as boolean)}
                        />
                        <Label htmlFor="trip">On Trip</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="online"
                            checked={filters.tripStatus.online}
                            onCheckedChange={(checked) => updateTripStatus('online', checked as boolean)}
                        />
                        <Label htmlFor="online">Online</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="offline"
                            checked={filters.tripStatus.offline}
                            onCheckedChange={(checked) => updateTripStatus('offline', checked as boolean)}
                        />
                        <Label htmlFor="offline">Offline</Label>
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default FilterWidget;