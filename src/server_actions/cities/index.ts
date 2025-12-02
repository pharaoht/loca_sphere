"use server";
import citiesApi from "@/api/cities/cities.api";
import { cookies } from "next/headers";

export async function saGetCities(queryString: string){

    const data = await citiesApi.httpGetCities(queryString);

    return data
}

export async function serverApi({ url = '', method = "GET", body = {}, headers = {}, query = {} }) {
    const cookieStore = await cookies(); 
    const allCookies = cookieStore.getAll();

    console.log(allCookies, '***')
    const cookieHeader = allCookies
        .map((c) => `${c.name}=${c.value}`)
        .join("; ");


    const res = await fetch(url, {
        method,
        headers: {
            "Content-Type": "application/json",
            Cookie: cookieHeader,
            credentials: 'include',
            ...headers,
        },
        body: method !== "GET" && body ? JSON.stringify(body) : undefined,
        cache: "no-store",
    });

    const text = await res.text();
    let json;
    try {
        json = JSON.parse(text);
    } catch {
        json = text;
    }

    console.log(json)
    return json;
}
