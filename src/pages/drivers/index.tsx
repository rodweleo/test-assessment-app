import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { DriversTable } from "../../components/drivers-table"
import { useDrivers } from "../../hooks/useDrivers"
import { Driver } from "../../utils/types";

export default function DriversPage() {
    const { data, error } = useDrivers()

    const fetchedDrivers = data ? data.drivers as Driver[] : [];


    return (
        <div>
            {
                error ? <div>{error.message}</div> : null
            }

            <Card>
                <CardHeader>
                    <CardTitle>Drivers</CardTitle>
                    <CardDescription>Find below the list of registered drivers</CardDescription>
                </CardHeader>
                <CardContent>
                    <DriversTable drivers={fetchedDrivers} />
                </CardContent>
            </Card>
        </div>
    )
}