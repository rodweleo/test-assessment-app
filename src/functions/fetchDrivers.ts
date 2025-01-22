import supabase from "../utils/supabase";

export const fetchDrivers = async () => {
    const { data: drivers, error } = await supabase
        .from('driver_status')
        .select('*');

    return { drivers, error }
}