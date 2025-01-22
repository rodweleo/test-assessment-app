import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { DriversTable } from "../../components/drivers-table"
import { useDrivers } from "../../hooks/useDrivers"
import { useState } from "react";
import { Input } from "../../components/ui/input";

export default function DriversPage() {
    const { data, error } = useDrivers()
    const [searchTerm, setSearchTerm] = useState('');

    const filteredDrivers = data ? data.drivers ? data.drivers.filter(driver => {
        const searchString = searchTerm.toLowerCase();
        return (
            driver.firstname.toLowerCase().includes(searchString) ||
            driver.lastname.toLowerCase().includes(searchString) ||
            driver.licenseplate.toLowerCase().includes(searchString) ||
            driver.driverstatus.toLowerCase() === searchString
        );
    }) : [] : [];


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
                    <div className="flex gap-4 mb-4">
                        <Input
                            placeholder="Search by name or license plate..."
                            className="max-w-sm"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <DriversTable drivers={filteredDrivers} />
                </CardContent>
            </Card>
        </div>
    )
}