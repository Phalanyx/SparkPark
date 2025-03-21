import { Router } from "express";
import middleware from ".././auth/middleware";
import { getIsochrones } from "./isochrones";
import { getGeocode } from "./geocode";
import Listing from "../models/listing";

const router = Router();

router.use(middleware);

// given an address, convert to isochrone, observe all 
// parking spots within isochrone

router.post("/isochrones", async (req, res) => {
    try{
    const { address } = req.body;
    const geocode: any = await getGeocode(address);
    const { lat, lon } = getLatLon(geocode);
    if (!lat || !lon) {
        res.status(400).json({ error: "Invalid address" });
        return;
    }

    
    const isochrone = await getIsochrones(lat, lon);

    if (!verifyIsochrone(isochrone)) {
        res.status(400).json({ error: "Invalid isochrone" });
        return;
    }

    const points = await Listing.find({
        location: {
            $geoWithin: {
                $geometry: {
                    type: "Polygon",
                    coordinates: isochrone
                }
            },
        }
        
    })
    console.log({ points, lat, lon })
    res.status(200).json({ points : points, lat : lat, lon : lon});
}
catch(e){
    console.log(e)
    res.status(400).json({ error: e });
}



}
);

export function getLatLon(geocode: any){
    try {
        let lat = geocode.features[0].geometry.coordinates[1];
        let lon = geocode.features[0].geometry.coordinates[0];
        return { lat, lon };
    } catch (error) {
        return { lat: null, lon: null };
    }
}

export function verifyIsochrone(isochrone: any){
    return (
        Array.isArray(isochrone) &&
        isochrone.length > 0 &&
        isochrone.every(
            (polygon: any) =>
                Array.isArray(polygon) &&
                polygon.length > 0 &&
                polygon.every(
                    (coordinate: any) =>
                        Array.isArray(coordinate) &&
                        coordinate.length === 2 &&
                        typeof coordinate[0] === "number" &&
                        typeof coordinate[1] === "number"
                )
        )
    );
}


export default router;