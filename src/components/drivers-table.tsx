
import { useState, useMemo } from "react"
import { DriversTableListItem } from "./drivers-table-list-item"
import { Table, TableHead, TableHeader, TableBody, TableRow } from "./ui/table"
import { Input } from "./ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Button } from "./ui/button"
import { ArrowUpDown } from "lucide-react"
import { Driver, SortableColumns } from "../utils/types"

interface DriversTableProps {
    drivers: Driver[]
}


export const DriversTable = ({ drivers }: DriversTableProps) => {
    const [searchTerm, setSearchTerm] = useState("")
    const [sortColumn, setSortColumn] = useState<SortableColumns>("firstname")
    const [sortDirection, setSortDirection] = useState("asc")

    const isSortableColumn = (value: string): value is SortableColumns => {
        return ['firstname', 'lastname', 'licenseplate', 'driverstatus'].includes(value);
    };

    const filteredAndSortedDrivers = useMemo(() => {
        return drivers
            .filter(
                (driver) =>
                    driver.firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    driver.lastname.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    driver.licenseplate.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    driver.driverstatus.toLowerCase().includes(searchTerm.toLowerCase()),
            )
            .sort((a, b) => {
                if (a[sortColumn] < b[sortColumn]) return sortDirection === "asc" ? -1 : 1
                if (a[sortColumn] > b[sortColumn]) return sortDirection === "asc" ? 1 : -1
                return 0
            })
    }, [drivers, searchTerm, sortColumn, sortDirection])

    const handleSort = (column: SortableColumns) => {
        if (column === sortColumn) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc")
        } else {
            setSortColumn(column)
            setSortDirection("asc")
        }
    }

    const handleValueChange = (value: string) => {
        if (isSortableColumn(value)) {
            setSortColumn(value);
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center space-x-2">
                <Input
                    type="search"
                    placeholder="Search drivers by name or license plate..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="max-w-sm"
                />
                <Select value={sortColumn} onValueChange={handleValueChange}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="firstname">First Name</SelectItem>
                        <SelectItem value="lastname">Last Name</SelectItem>
                        <SelectItem value="licenseplate">License Plate</SelectItem>
                        <SelectItem value="driverstatus">Driver Status</SelectItem>
                    </SelectContent>
                </Select>
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setSortDirection(sortDirection === "asc" ? "desc" : "asc")}
                >
                    <ArrowUpDown className={`h-4 w-4 ${sortDirection === "desc" ? "transform rotate-180" : ""}`} />
                </Button>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>#</TableHead>
                        <TableHead>Driver ID</TableHead>
                        <TableHead onClick={() => handleSort("firstname")} className="cursor-pointer">
                            First Name
                        </TableHead>
                        <TableHead onClick={() => handleSort("lastname")} className="cursor-pointer">
                            Last Name
                        </TableHead>
                        <TableHead onClick={() => handleSort("licenseplate")} className="cursor-pointer">
                            License Plate
                        </TableHead>
                        <TableHead onClick={() => handleSort("driverstatus")} className="cursor-pointer">
                            Driver Status
                        </TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredAndSortedDrivers.map((driver: Driver, index: number) => (
                        <TableRow key={driver.driverid}>
                            <DriversTableListItem driver={driver} index={index} />
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

