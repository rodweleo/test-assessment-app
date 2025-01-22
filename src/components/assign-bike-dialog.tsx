import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "./ui/dialog"
import { Button } from "./ui/button"
import { useQueryClient, useMutation } from "@tanstack/react-query"
import { assignBikeToDriver } from "../functions/assignBikeToDriver"
import toast from "react-hot-toast"
import useAssignBikeModal from "@/hooks/use-assign-bike-modal"
import { Driver } from "../utils/types"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "./ui/command"
import { useBikes } from "../hooks/use-bikes"
import { MdElectricBike } from "react-icons/md"
import { CheckCircle, Loader2 } from "lucide-react"


interface AssignBikeParams {
    driver: Driver;
    bikeLicensePlate: string;
}

export const AssignBikeDialog = () => {
    const { isOpen, setOpen, selectedDriver } = useAssignBikeModal()
    const [selectedBike, setSelectedBike] = useState('')
    const queryClient = useQueryClient()
    const { data, isLoading, error } = useBikes()

    const availableBikes = data ? data.bikes ? data.bikes : [] : []

    const assignBikeMutation = useMutation({
        mutationFn: (params: AssignBikeParams) =>
            assignBikeToDriver(params.driver, params.bikeLicensePlate),
        onSuccess: () => {
            toast.success(`Bike ${selectedBike} has been assigned to ${selectedDriver?.firstname.concat(` ${selectedDriver.lastname}`)}.`)
            queryClient.invalidateQueries({ queryKey: ["drivers"] })
            queryClient.invalidateQueries({ queryKey: ["bikes"] })
        },
        onError: () => {
            toast.error("Failed to assign bike. Please try again.")
        },
    })

    const handleAssign = () => {
        if (!selectedDriver) return;
        assignBikeMutation.mutate({
            driver: selectedDriver,
            bikeLicensePlate: selectedBike
        });
    }

    return (
        <Dialog
            open={isOpen}
            onOpenChange={(open) => {
                if (!isOpen) {
                    setOpen(open)
                } else {
                    setOpen(false)
                }
            }}
        >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Assign Bike to {selectedDriver?.firstname} {selectedDriver?.lastname}
                    </DialogTitle>
                </DialogHeader>
                <div>
                    <Command className="w-full">
                        <CommandInput placeholder="Type to search for a bike..." />
                        <CommandList>
                            <CommandEmpty>No bikes found.</CommandEmpty>

                            {isLoading ? <p>Fetching bikes...</p> : null}
                            {error ? <p>{error.message}</p> : null}

                            <CommandGroup heading="Available Bikes">
                                {
                                    availableBikes.filter((bike) => {
                                        return bike.licenseplate.length > 0
                                    }).map((bike) => (
                                        <CommandItem onSelect={() => setSelectedBike(bike.licenseplate)} className={`flex items-center w-full justify-between cursor-pointer ${selectedBike === (bike.licenseplate) ? 'bg-green-600 text-white' : null}`}>
                                            <div className="flex items-center gap-3">
                                                <MdElectricBike />
                                                <span>{bike.licenseplate}</span>
                                            </div>
                                            {
                                                selectedBike === (bike.licenseplate) ? <CheckCircle className={`${selectedBike === (bike.licenseplate) ? 'text-white' : null}`} /> : null
                                            }
                                        </CommandItem>
                                    ))
                                }
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </div>
                <DialogFooter>
                    <Button onClick={handleAssign} disabled={assignBikeMutation.isPending} className="bg-green-600 flex items-center">
                        {assignBikeMutation.isPending ? <Loader2 className=" animate-spin " /> : null}
                        {assignBikeMutation.isPending ? "Assigning bike..." : "Assign Bike"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog >
    )
}

