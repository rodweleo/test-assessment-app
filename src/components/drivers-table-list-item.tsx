import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "./ui/dropdown-menu"
import { Badge } from "./ui/badge"
import { TableCell } from "./ui/table"
import { MoreVertical, MapPin } from "lucide-react"
import { Button } from "./ui/button"
import { useMutation } from "@tanstack/react-query"
import { deactivateDriver } from "../functions/deactivateDriver"
import toast from "react-hot-toast"
import { activateDriver } from "../functions/activateDriver"
import { useNavigate } from "react-router-dom"

export const DriversTableListItem = ({ driver, index }: {
    driver: any,
    index: number
}) => {

    const navigate = useNavigate()

    const TOAST_ID = 'deactivate-driver-toast'
    const deactivateMutation = useMutation({
        mutationFn: (driver) => {
            return deactivateDriver(driver)
        },
        onMutate: () => {
            toast.loading("Deactivating driver...", { id: TOAST_ID })
        },
        onSuccess: () => {
            toast.success("Driver deactivated!", { id: TOAST_ID })
        },
        onError: () => {
            toast.error("An error occurred while deactivating the driver.", { id: TOAST_ID })
        }
    })

    const activateMutation = useMutation({
        mutationFn: (driver) => {
            return activateDriver(driver)
        },
        onMutate: () => {
            toast.loading("Activating driver...", { id: TOAST_ID })
        },
        onSuccess: () => {
            toast.success("Driver activated!", { id: TOAST_ID })
        },
        onError: () => {
            toast.error("An error occurred while activating the driver.", { id: TOAST_ID })
        }
    })





    function getDriverStatus(status: string) {
        switch (status.toLowerCase()) {
            case "active":
                return "bg-green-500 text-white hover:bg-green-400"
            case "inactive":
                return "bg-red-500 text-white hover:bg-red-400"
            default:
                return "bg-slate-500 text-white hover:bg-slate-400"
        }
    }

    const viewOnMap = () => {

    };

    return (
        <>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{driver.driverid}</TableCell>
            <TableCell>{driver.firstname}</TableCell>
            <TableCell>{driver.lastname}</TableCell>
            <TableCell>{driver.licenseplate}</TableCell>
            <TableCell><Badge className={getDriverStatus(driver.driverstatus)}>{driver.driverstatus}</Badge></TableCell>
            <TableCell>
                <DropdownMenu>
                    <DropdownMenuTrigger className="outline-none"><MoreVertical /></DropdownMenuTrigger>
                    <DropdownMenuContent className="flex flex-col w-full">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem><Button variant="secondary" className="w-full" onClick={() => viewOnMap()}> <MapPin /> VIEW ON MAP</Button></DropdownMenuItem>
                        <DropdownMenuItem>
                            {
                                driver.driverstatus.toLowerCase() === "active" ? <Button variant="destructive"
                                    onClick={() => {
                                        deactivateMutation.mutate({ ...driver })
                                    }}
                                >DEACTIVATE DRIVER</Button>
                                    :
                                    <Button className="bg-green-500 hover:bg-green-400"
                                        onClick={() => {
                                            activateMutation.mutate({ ...driver })
                                        }}
                                    >ACTIVATE DRIVER</Button>
                            }
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </TableCell>
        </>
    )
}