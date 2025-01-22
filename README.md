# Greenwheels Electric Mobility Solutions - Front-End Developer Tech Assessment

## Project Overview

This project demonstrates a ReactJS-based web application for managing and displaying data about electric bike fleets and their drivers. It integrates **Supabase** for backend services and **Mapbox** for map visualization. The application features two main pages:

1. **Map Display**: Visualizes bike locations and statuses on a map.
2. **Driver Information Display**: Provides a detailed table of driver information with advanced filtering and editing options.

## Features

### 1. Map Display

#### Bike Movement Criteria

A bike is considered "MOVING" when:

- The vehicle speed is greater than 0 km/h
- There has been a location change in the last 5 minutes

A bike **is** considered "PARKED" when:

- The vehicle speed is 0 km/h
- There has been no location change in the last 5 minutes

| State                  | Icon           | Color  | Description                       |
| ---------------------- | -------------- | ------ | --------------------------------- |
| Bike = MOVING, Trip    | MdElectricBike | green  | Bike is moving, trip is active.   |
| Bike = MOVING, Online  | MdElectricBike | blue   | Bike is moving, available online. |
| Bike = MOVING, Offline | MdElectricBike | gray   | Bike is moving but offline.       |
| Bike = PARKED, Trip    | MdElectricBike | orange | Bike is parked, trip is active.   |
| Bike = PARKED, Online  | MdElectricBike | purple | Bike is parked, available online. |
| Bike = PARKED, Offline | MdElectricBike | red    | Bike is parked and offline.       |

- **Interactive Features**:
  - Pop-ups with detailed bike information, including:
    - Driver Placeholder Image
    - Driver Name
    - Bike Registration Number
    - Trip Status
    - Trip Status Timestamp
    - Vehicle Speed
    - Battery Percentage
  - Filter widget for filtering bikes based on status and conditions.

### Driver Information Display

- **Driver Table**:
  - Displays driver data with fields:
    - Driver ID
    - Driver Name
    - License Plate
    - Driver Status
  - Features:
    - Search, sort, and filter by driver name, license plate, and status.
    - Edit functionality to:
      - Assign/change bikes to drivers.
      - Update driver statuses.
    - Redirect to the map page with the selected driver’s bike location zoomed in.

---

## Technology Stack

- **Frontend**: ReactJS
- **Backend**: Supabase (for data storage and management)
- **Mapping Library**: Mapbox

---

## Setup and Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/rodweleo/test-assessment-app.git
   cd test-assessment-app
   ```
2. **Install Dependencies**

```bash
npm install
```

3. **Environment Variables: Create a .env file in the root directory with the following variables:**

```bash
VITE_SUPABASE_URL=<your-supabase-url>
VITE_SUPABASE_ANON_KEY=<your-supabase-anon-key>
VITE_MAPBOX_ACCESS_TOKEN=<your-mapbox-token>
```

4. **Run the Application**

   #### In Development Mode

   ```bash
   npm run dev
   ```

   #### In Production Mode

   ```bash
   npm start
   ```

## Deployment

The application has been deployed for demonstration purposes. Access it here.

- ## API Reference
  - Supabase is used to fetch and manage data from the assetLocation.csv and driverStatus.csv files.
  - Mapbox is utilized for rendering the map and bike locations.
- ## File Structure

  ```bash
    src/
        ├── components/ # Reusable React components
        ├── pages/              # Page components (MapDisplay, DriverInfo)
        ├── services/           # API service functions
        ├── utils/              # Utility functions
        ├── App.ts              # Main app component
        └── main.ts            # Entry point

  ```

## Future Enhancements

- Real-time data synchronization for bike locations and statuses.
- Enhanced visualizations with heatmaps or clustering for dense bike locations.
- User authentication for secure access to driver and fleet data.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Author

Rodwell Leo

```bash
Let me know if you need any modifications or additional sections!
```
