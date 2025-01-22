# Bike Map Dashboard

## Project info

**URL**: https://lovable.dev/projects/5d98cf2e-77bd-4731-b58a-a727bc5f8d1a

## Bike Movement Criteria

A bike is considered "MOVING" when:

- The vehicle speed is greater than 0 km/h
- There has been a location change in the last 5 minutes

A bike is considered "PARKED" when:

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
