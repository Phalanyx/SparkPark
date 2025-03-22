# Testing in sprint3

## Backend
 In the third sprint we extended our testing procedure. We added more tests to our postman 
 testing suite which test the functionality of all the backend routes. We now have a large
 testing suite that test the different components of our backend for the expected behaviour. We 
 included scripts to attach authentication tokens to the request wherever necessary to improve 
 the testing workflow. 
 
## Frontend
We tested the frontend for performance and reliability using the included expo dev-tools.
Performance of our app is good as of the third sprint. The app is responsive and does not use 
too many resources.

## Integration Tests

---

### **Tools Used**
- **Jest:** Test runner for executing the tests.
- **Supertest:** HTTP assertion library to test API endpoints.
- **Firebase Admin SDK:** For generating authentication tokens for testing.
- **MongoDB:** Test database for storing listings and preferences.
- **Expo Jest-Expo:** For testing the frontend React Native application.


### **Test Cases Covered**
1. Adding Listings (`/add-listing`)
2. Adding User Preferences (`/preferences/add`)
3. Fetching Best Parking Spot (`/best-parking-spot`)
4. Retrieving User Listings (`/user-listings`)
5. Deleting User Preferences (`/preferences/delete`)


### **Procedure**
- Backend tests are handled using **Jest and Supertest**.
- Frontend tests are handled using **Jest-Expo** for the Expo iOS app.
- Backend and Frontend tests are separated by using different configuration files:
 - `jest.backend.config.js` for backend tests.
 - `jest.expo.config.js` for frontend tests.
- Backend tests verify interaction with the database (MongoDB) and Firebase Authentication.
- Frontend tests ensure React Native components function correctly.
- Tests are run from the root directory via npm scripts.


### **Example Test Code (Backend)**
```typescript
import request from 'supertest';
import app from '../app';

it('should add a new listing successfully', async () => {
  const response = await request(app)
    .post('/add-listing')
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
```

---

### **How to Run Tests**
1. Install dependencies:
```bash
npm install
```
2. Run all tests (Frontend & Backend):
```bash
npm test
```
3. Run backend tests only:
```bash
npm run test:backend
```
4. Run frontend tests only:
```bash
npm run test:frontend
```

---

### **Verdict**
We can now test with every major merge if all our integration tests still work by running them 
as described above. This makes the integration of new features easier and speed up our development.
