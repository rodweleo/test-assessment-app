import { Driver } from "../utils/types";
import supabase from "../utils/supabase";

export const assignBikeToDriver = async (driver: Driver, bikeLicensePlate: string) => {

    //step 2.1 : get the current details of the bike the driver is being assigned
    const { data: bikeDetails, error: bikeDetailsError } = await supabase
        .from("asset_location")
        .select("*")
        .eq("licenseplate", bikeLicensePlate)
        .single()

    if (bikeDetailsError && !bikeDetails) {
        throw new Error(`Something went wrong while getting the current bike details. Error: ${bikeDetailsError.message}`)
    }

    //step 1: update the driver status table with the updated bike license plate
    const { data: driverStatusUpdate, error: driverStatusUpdateError } = await supabase
        .from("driver_status")
        .update({
            licenseplate: bikeLicensePlate
        })
        .eq("driverid", driver.driverid)
        .select("*")
        .single();

    if (driverStatusUpdateError && !driverStatusUpdate) {
        throw new Error(`Something went wrong while updating the driver status details with the newly assigned bike. Error: ${driverStatusUpdateError.message}`)
    }

    //remove the bike from the previous owner
    const { data: previousBikeOwnerUpdate, error: previousdBikeOwnerUpdateError } = await supabase
        .from("driver_status")
        .update({
            licenseplate: ""
        })
        .eq("driverid", bikeDetails.driverid)
        .select("*")
        .single();

    if (previousdBikeOwnerUpdateError && !previousBikeOwnerUpdate) {
        throw new Error(`Something went wrong while removing bike details from previous owner in driver status table. Error: ${previousdBikeOwnerUpdateError.message}`)
    }

    //step 2: update the asset location table with the updated bike license plate
    //step 2.1: after the details of the bike to be assigned are found, we update the asset location's driver detials with them
    const { data: assetLocationUpdate, error: assetLocationUpdateError } = await supabase
        .from("asset_location")
        .update({
            licenseplate: bikeLicensePlate,
            vehiclespeed: bikeDetails.vehiclespeed,
            isignitionon: bikeDetails.isignitionon,
            battery: bikeDetails.battery,
            odometer: bikeDetails.odometer
        })
        .eq("driverid", driver.driverid)
        .select("*")
        .single()

    if (assetLocationUpdateError && !assetLocationUpdate) {
        throw new Error(`Something went wrong while assigning bike. Error: ${assetLocationUpdateError.message}`)
    }

    //step 2.2: Remove the bike details from the previous bike owner
    const { data: resetPreviousOwnerAssetDetails, error: resetPreviousOwnerAssetDetialsError } = await supabase
        .from("asset_location")
        .update({
            licenseplate: "",
            vehiclespeed: 0,
            isignitionon: "FALSE",
            battery: 0,
            odometer: 0
        })
        .eq("driverid", bikeDetails.driverid)
        .select("*")
        .single()

    if (resetPreviousOwnerAssetDetialsError && !resetPreviousOwnerAssetDetails) {
        throw new Error(`Something went wrong while resetting the previous bike owner's asset location details. Error: ${resetPreviousOwnerAssetDetialsError.message}`)
    }



    return assetLocationUpdate;
}