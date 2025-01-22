

// Represents a bike's location and status
export interface AssetLocation {
    driverid: number; // Unique ID of the driver
    drivername: string; // Name of the driver
    licenseplate: string; // Bike registration number
    tripstatus: "ONTRIP" | "ONLINE" | "OFFLINE"; // Trip status (e.g., Trip, Online, Offline)
    triptimestamp: string; // Timestamp of trip status start
    vehiclespeed: number; // Speed of the bike
    heading: number; // Compass direction of the bike
    lat: number; // Latitude of the bike
    lon: number; // Longitude of the bike
    gpstimestamp: string; // GPS tracker timestamp
    battery: number; // Battery percentage
    odometer: number; // Odometer reading
    isMoving: boolean
}

// Represents a driver's information and status
export interface Driver {
    driverid: number; // Unique ID of the driver
    firstname: string; // Driver's first name
    lastname: string; // Driver's last name
    licenseplate: string; // Assigned bike's license plate
    driverstatus: string; // Fleet status (e.g., Active, Inactive)
}

// Represents filtering criteria for drivers
export interface DriverFilter {
    firstname?: string; // Filter by first name
    lastname?: string; // Filter by last name
    licenseplate?: string; // Filter by license plate
    driverstatus?: string; // Filter by driver status
}

export type BikeFilter = {
    moving: boolean;
    parked: boolean;
    tripStatus: {
        ontrip: boolean;
        online: boolean;
        offline: boolean;
    };
}

export type SortableColumns = 'firstname' | 'lastname' | 'licenseplate' | 'driverstatus';
