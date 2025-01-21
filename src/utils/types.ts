// Represents a bike's location and status
export interface AssetLocation {
    driverid: number; // Unique ID of the driver
    drivername: string; // Name of the driver
    licenseplate: string; // Bike registration number
    tripstatus: string; // Trip status (e.g., Trip, Online, Offline)
    triptimestamp: string; // Timestamp of trip status start
    vehiclespeed: number; // Speed of the bike
    heading: number; // Compass direction of the bike
    lat: number; // Latitude of the bike
    lon: number; // Longitude of the bike
    gpstimestamp: string; // GPS tracker timestamp
    battery: number; // Battery percentage
    odometer: number; // Odometer reading
}

// Represents a driver's information and status
export interface DriverStatus {
    driverid: number; // Unique ID of the driver
    firstname: string; // Driver's first name
    lastname: string; // Driver's last name
    licenseplate: string; // Assigned bike's license plate
    driverstatus: string; // Fleet status (e.g., Active, Inactive)
}

// Props for the MapDisplay component
export interface MapDisplayProps {
    assetLocations: AssetLocation[]; // Array of bike locations and statuses
    onSelectBike?: (bike: AssetLocation) => void; // Callback when a bike is selected
}

// Props for the DriverTable component
export interface DriverTableProps {
    drivers: DriverStatus[]; // Array of driver data
    onDriverSelect?: (driver: DriverStatus) => void; // Callback when a driver is selected
    onDriverUpdate?: (updatedDriver: DriverStatus) => void; // Callback for updating driver information
}

// Represents filtering criteria for the map
export interface MapFilter {
    tripstatus?: string; // Filter by trip status (e.g., Trip, Online, Offline)
    vehiclespeedRange?: [number, number]; // Speed range filter (e.g., [0, 100])
}

// Represents filtering criteria for drivers
export interface DriverFilter {
    firstname?: string; // Filter by first name
    lastname?: string; // Filter by last name
    licenseplate?: string; // Filter by license plate
    driverstatus?: string; // Filter by driver status
}
