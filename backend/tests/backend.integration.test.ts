// backend/tests/backend.integration.test.ts
import request from "supertest";
import app from "../app";  // Adjust if your backend is in a folder
import mongoose from "mongoose";
import { admin } from "../auth";

beforeAll(async () => {
    await mongoose.connect(process.env.TEST_DB_URI as string);
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe("Integration Tests for Backend API", () => {

    let authToken: string;

    beforeAll(async () => {
        const user = await admin.auth().createUser({
            email: "testuser@example.com",
            password: "password123",
            displayName: "Test User",
        });

        const customToken = await admin.auth().createCustomToken(user.uid);
        authToken = `Bearer ${customToken}`;
    });

    afterAll(async () => {
        await admin.auth().deleteUser(authToken);
    });

    test("Add a Listing", async () => {
        const response = await request(app)
            .post("/add-listing")
            .set("Authorization", authToken)
            .send({
                title: "Test Parking",
                description: "A secure garage spot",
                location: { type: "Point", coordinates: [-79.347015, 43.65107] },
                size: { length: 5, width: 2.5 },
                pricePerHour: 5,
                availability: [{
                    date: "2025-03-20",
                    availableFrom: "09:00",
                    availableUntil: "18:00"
                }]
            });

        expect(response.status).toBe(201);
    });

    test("Add Preferences", async () => {
        const response = await request(app)
            .post("/preferences/add")
            .set("Authorization", authToken)
            .send({
                preferredSpotSize: { length: 5, width: 2.5 },
                maxPricePerHour: 10,
                preferredSearchRadius: 2
            });

        expect(response.status).toBe(201);
    });

    test("Get Best Parking Spot", async () => {
        const response = await request(app)
            .get("/best-parking-spot")
            .set("Authorization", authToken)
            .query({
                latitude: "43.65107",
                longitude: "-79.347015",
                date: "2025-03-20",
                time: "10:00"
            });

        expect(response.status).toBe(200);
    });
});