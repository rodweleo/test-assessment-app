import { Driver } from "../utils/types"
import supabase from "../utils/supabase"

export const activateDriver = async (driver: Driver) => {
    const { data, error } = await supabase
        .from("driver_status")
        .update(
            { driverstatus: 'Active' }
        )
        .eq("driverid", driver.driverid)
        .select()

    return { data, error }
}