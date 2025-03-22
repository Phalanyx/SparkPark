
import { getLatLon } from "../../src/geolocation";
import { UTSCGeoCode } from "../dummyData";

describe("getLatLon", () => {
    it("should return the correct latitude and longitude for a valid geocode", async () => {

        const expectedLatLon = { lat: UTSCGeoCode.features[0].geometry.coordinates[1], lon: UTSCGeoCode.features[0].geometry.coordinates[0] };

        const result = await getLatLon(UTSCGeoCode);

        expect(result).toEqual(expectedLatLon);
    });

    it("should throw an error for an invalid geocode", async () => {
        const invalidGeoCode = {}

        const expectedLatLon = { lat: null, lon: null };

        await expect(getLatLon(invalidGeoCode)).toEqual(expectedLatLon);
    });

});