import { FeatureCollection } from "./isochroneTypes";

export async function getIsochrones(lat: number, lon: number) {

    const resp = await fetch(
        `${process.env.ISOCHRONE_URL}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${process.env.OPEN_ROUTE_KEY}`,
            },
            body: JSON.stringify({

                locations: [[lon, lat]],
                range: [150] // range in time
            }),
        }
    );    
    const data:FeatureCollection = await resp.json();
    if (!data || !data.features) {
        return [];
    }
    
    return data.features[0].geometry.coordinates;
}




