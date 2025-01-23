import { MdElectricBike } from "react-icons/md"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"

export const MapContainerKeyTable = () => {

    const bikeMovementCriteria = [
        {
            icon: <MdElectricBike color="green" size={40} />,
            description: "Bike is Moving & the Trip is Active"
        },
        {
            icon: <MdElectricBike color="blue" size={40} />,
            description: "Bike is Moving & available Online"
        },
        {
            icon: <MdElectricBike color="gray" size={40} />,
            description: "Bike is Moving but Offline."
        },
        {
            icon: <MdElectricBike color="orange" size={40} />,
            description: "Bike is Parked & trip is Active."
        },
        {
            icon: <MdElectricBike color="purple" size={40} />,
            description: "Bike is Parked & available Online."
        },
        {
            icon: <MdElectricBike color="red" size={40} />,
            description: "Bike is Parked and Offline."
        }
    ]

    return (
        <Card>
            <CardHeader>
                <CardTitle>Map Key Store</CardTitle>
                <CardDescription>Find detailed explanations of map bike icons</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Icon</TableHead>
                            <TableHead>Description</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            bikeMovementCriteria.map((criteria, index: number) => (
                                <TableRow key={index}>
                                    <TableCell>{criteria.icon}</TableCell>
                                    <TableCell>{criteria.description}</TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}