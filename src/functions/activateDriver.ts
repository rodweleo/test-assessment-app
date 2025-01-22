import supabase from "../utils/supabase"

export const activateDriver = async (driver) => {
    const { data, error } = await supabase
        .from("driver_status")
        .update(
            { driverstatus: 'Active' }
        )
        .eq("driverid", driver.driverid)
        .select()

    return { data, error }
}