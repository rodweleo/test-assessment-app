
import supabase from "../utils/supabase"


export const fetchAssetLocations = async () => {

    const { data: asset_location, error } = await supabase
        .from('asset_location')
        .select('*');

    return { asset_location, error }
}