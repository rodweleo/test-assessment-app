import supabase from "../utils/supabase"

export const fetchBikes = async () => {
    const { data: bikes, error } = await supabase
        .from("driver_status")
        .select("licenseplate")

    return {
        bikes,
        error
    }
}