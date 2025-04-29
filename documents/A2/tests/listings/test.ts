import { isochrone } from "../dummyData";
import { verifyIsochrone } from "../../src/geolocation";

describe("verifyIsochrone", () => {
    it("should return true for valid isochrone data", () => {
        const result = verifyIsochrone(isochrone);
        expect(result).toBe(true);
    });

    it("should return false for invalid isochrone data", () => {
        const invalidIsochrone = { ...isochrone, invalidKey: "invalidValue" };
        const result = verifyIsochrone(invalidIsochrone);
        expect(result).toBe(false);
    });

    it("should return false for empty isochrone data", () => {
        const result = verifyIsochrone([]);
        expect(result).toBe(false);
    });
});

