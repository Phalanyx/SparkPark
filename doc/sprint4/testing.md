# Testing in Sprint 4

## Backend
In Sprint 4, we significantly expanded our testing strategy. Beyond our extensive Postman suite testing all backend routes with and without authentication tokens, we conducted automated **load and performance testing** using **Apache JMeter**.

We simulated both lightweight GET requests and complex routes such as autosuggestion to measure system responsiveness under stress. This helped verify backend stability with a fully populated database.

### Key Insights:
- Simple GET requests showed excellent throughput with no errors.
- Work-intensive routes (e.g., autosuggestion) had longer average response times, as expected, but remained stable.
- Backend showed good scalability for our MVP use case.

![jmeter](https://github.com/user-attachments/assets/fcce4c28-120d-4405-bf81-6e69114986ea)

## Security Testing
We validated our backend against **NoSQL injection** vulnerabilities by testing input sanitization and using safe Mongoose queries. We also ensured all sensitive endpoints are protected by **Firebase Authentication**, using server-side token verification.

### Security Highlights:
- No security issues found during injection testing.
- All protected routes require valid Bearer tokens.
- HTTPS is enforced where applicable.

## Frontend
We continued to test frontend performance using **Expo DevTools**, confirming responsiveness across key screens such as map view, listing creation, and booking workflows. UI performance remained smooth and resource-efficient.

![frontendTest](https://github.com/user-attachments/assets/84b3dac6-403d-49a7-9bec-58461bf21287)

## Integration Tests

### Tools Used
- **Jest**
- **Supertest**
- **Firebase Admin SDK**
- **MongoDB (Test DB)**
- **Expo Jest-Expo**

### New Test Cases Added
- Booking creation and retrieval.
- User preference creation and update.
- Autosuggestion route response correctness.

### Test Suite Improvements
- Better test coverage for corner cases and failure states.
- Enhanced authentication simulation using Firebase Admin SDK.
- Refactored tests for modularity and easier updates.

### How to Run Tests
```bash
npm install           # Install dependencies
npm test              # Run all tests
npm run test:backend  # Run backend tests only
npm run test:frontend # Run frontend tests only