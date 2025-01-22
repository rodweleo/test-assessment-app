import supabase from "../utils/supabase"

export const deactivateDriver = async (driver) => {
    const { data, error } = await supabase
        .from("driver_status")
        .update(
            { driverstatus: 'Inactive' }
        )
        .eq("driverid", driver.driverid)
        .select()

    return { data, error }
}