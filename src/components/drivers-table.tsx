import { DriversTableListItem } from "./drivers-table-list-item"
import { Table, TableHead, TableHeader, TableBody, TableRow } from "./ui/table"


export const DriversTable = ({ drivers }) => {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>#</TableHead>
                    <TableHead>Driver ID</TableHead>
                    <TableHead>First Name</TableHead>
                    <TableHead>Last Name</TableHead>
                    <TableHead>License Plate</TableHead>
                    <TableHead>Driver Status</TableHead>
                    <TableHead>Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    drivers.map((driver, index: number) => (
                        <TableRow>
                            <DriversTableListItem driver={driver} index={index} />
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
    )
}