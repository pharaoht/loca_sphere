import citiesApi from "@/api/cities/cities.api";

export async function saGetCities(queryString: string){

    const data = await citiesApi.httpGetCities(queryString);

    return data
}

