

export const mapBoxApiKey = async (): Promise<string | undefined> => {

    const apiKey = process.env.MAPBOX_ACCESS_TOKEN;

    if(!apiKey) return undefined

    return apiKey;
};