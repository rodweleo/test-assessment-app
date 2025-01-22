import React from 'react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Battery, Clock, Gauge, User, FileText } from 'lucide-react';
import { AssetLocation } from '../utils/types';
import { Badge } from './ui/badge';
import { MdElectricBike } from "react-icons/md";

interface BikePopupProps {
    bike: AssetLocation;
}

const BikePopupCard: React.FC<BikePopupProps> = ({ bike }) => {

    const getBatteryIcon = (percentage: number) => {
        if (percentage >= 70) return <Battery className="text-green-500" />;
        if (percentage >= 30) return <Battery className="text-yellow-500" />;
        return <Battery className="text-red-500" />;
    };

    return (
        <Card className="w-[300px] bg-white/95 backdrop-blur-sm shadow-lg border-none">
            <CardHeader className="p-4 pb-2">
                <div className="w-full h-32 rounded-md overflow-hidden mb-2">
                    <img
                        src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"
                        alt="Bike"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <User className="w-5 h-5 text-primary" />
                    <h3 className="font-semibold text-lg">{bike.drivername}</h3>
                </div>
            </CardHeader>
            <CardContent className="p-4 pt-2 space-y-2">
                <div className="grid grid-cols-[20px_1fr] items-center gap-2">
                    <MdElectricBike className="w-4 h-4 text-muted-foreground" />
                    <p className="text-sm">{bike.licenseplate}</p>
                </div>

                <div className="grid grid-cols-[20px_1fr] items-center gap-2">
                    <FileText className="w-4 h-4 text-muted-foreground" />
                    <Badge className={`w-fit inline-flex items-center rounded-full px-2 py-1 font-medium
              ${bike.tripstatus === 'ONLINE' ? 'bg-green-100 text-green-700 hover:bg-green-200' :
                            bike.tripstatus === 'ONTRIP' ? 'bg-blue-100 text-blue-700 hover:bg-blue-200' :
                                'bg-red-100 text-red-700 hover:bg-red-200'}`}>
                        {bike.tripstatus}
                    </Badge>

                </div>
                <div className="grid grid-cols-[20px_1fr] items-center gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <p className="text-sm">{new Date(bike.triptimestamp).toLocaleString()}</p>
                </div>
                <div className="grid grid-cols-[20px_1fr] items-center gap-2">
                    <Gauge className="w-4 h-4 text-muted-foreground" />
                    <p className="text-sm">{bike.vehiclespeed} km/h</p>
                </div>
                <div className="flex items-center gap-2">
                    {getBatteryIcon(bike.battery)}
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                            className={` h-2.5 rounded-full ${bike.battery >= 70 ? 'bg-green-500' :
                                bike.battery >= 30 ? 'bg-yellow-500' : 'bg-red-500'
                                }`}
                            style={{ width: `${bike.battery}%` }}
                        ></div>
                    </div>
                    <span>{bike.battery}%</span>
                </div>
            </CardContent>
        </Card>
    );
};
export default BikePopupCard;