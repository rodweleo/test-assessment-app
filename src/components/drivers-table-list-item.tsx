import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "./ui/dropdown-menu"
import { Badge } from "./ui/badge"
import { TableCell } from "./ui/table"
import { MoreVertical, MapPin } from "lucide-react"
import { Button } from "./ui/button"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deactivateDriver } from "../functions/deactivateDriver"
import toast from "react-hot-toast"
import { activateDriver } from "../functions/activateDriver"
import { useNavigate } from "react-router-dom"
import { Driver } from "../utils/types"
import { MdElectricBike } from "react-icons/md"
import useAssignBikeModal from "@/hooks/use-assign-bike-modal"
import { AssignBikeDialog } from "./assign-bike-dialog"

interface DriverTableListItemProps {
    driver: Driver,
    index: number
}

export const DriversTableListItem = ({ driver, index }: DriverTableListItemProps) => {

    const navigate = useNavigate()
    const { setOpen, setSelectedDriver } = useAssignBikeModal()
    const queryClient = useQueryClient()

    const TOAST_ID = 'deactivate-driver-toast'
    const deactivateMutation = useMutation({
        mutationFn: (driver: Driver) => {
            return deactivateDriver(driver)
        },
        onMutate: () => {
            toast.loading("Deactivating driver...", { id: TOAST_ID })
        },
        onSuccess: () => {
            toast.success("Driver deactivated!", { id: TOAST_ID })
            queryClient.invalidateQueries({ queryKey: ["bikes"] })
            queryClient.invalidateQueries({ queryKey: ["drivers"] })
        },
        onError: () => {
            toast.error("An error occurred while deactivating the driver.", { id: TOAST_ID })
        }
    })

    const activateMutation = useMutation({
        mutationFn: (driver: Driver) => {
            return activateDriver(driver)
        },
        onMutate: () => {
            toast.loading("Activating driver...", { id: TOAST_ID })
        },
        onSuccess: () => {
            toast.success("Driver activated!", { id: TOAST_ID })
            queryClient.invalidateQueries({ queryKey: ["bikes"] })
            queryClient.invalidateQueries({ queryKey: ["drivers"] })
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
        navigate(`/?bike=${driver.licenseplate}`)
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
                        <DropdownMenuItem><Button variant="outline" className="w-full flex items-center justify-between" onClick={() => viewOnMap()}> <MapPin /> VIEW ON MAP</Button></DropdownMenuItem>
                        <DropdownMenuItem>
                            <Button variant="outline" className="w-full flex items-center justify-between" onClick={() => {
                                setSelectedDriver(driver)
                                setOpen(true)
                            }}>
                                <MdElectricBike className="mr-2" /> {driver.licenseplate.length === 0 ? "ASSIGN BIKE" : "CHANGE BIKE"}
                            </Button>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            {
                                driver.driverstatus.toLowerCase() === "active" ? <Button variant="destructive"
                                    onClick={() => {
                                        deactivateMutation.mutate(driver)
                                    }}
                                >DEACTIVATE DRIVER</Button>
                                    :
                                    <Button className="bg-green-500 hover:bg-green-400"
                                        onClick={() => {
                                            activateMutation.mutate(driver)
                                        }}
                                    >ACTIVATE DRIVER</Button>
                            }
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </TableCell>
            <AssignBikeDialog />
        </>
    )
}