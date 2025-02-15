# **System Design Document**

## **1. Introduction**

- **Project Name:** [Your Project Name]
- **Sprint:** Sprint 1
- **Purpose:** This document outlines the system design, including key components, architecture, dependencies, and error-handling strategies for Sprint 1.

---

## **2. System Overview**

- **Primary Features in Sprint 1:**
  - User Management
  - Parking Spot Management
  - Booking System
  - Authentication
  - Interactive Map
- **Goal:** Provide a flexible and scalable system for managing parking spot rentals, ensuring smooth user experience and secure transactions.

---

## **3. System Interaction & Dependencies**

### **3.1 Operating Environment**

| Component                 | Technology Used                                                   |
| ------------------------- | ----------------------------------------------------------------- |
| **Operating System**      | Linux (Deployment), Windows/macOS/Linux (Development)             |
| **Backend**               | Node.js with Express.js                                           |
| **Frontend**              | React.js                                                          |
| **Database**              | MongoDB with Mongoose ORM                                         |
| **Network Configuration** | HTTPS API, Cloud-based MongoDB Atlas                              |
| **External APIs**         | Google Maps API (Navigation & Location), Stripe/PayPal (Payments) |

### **3.2 Assumptions & Constraints**

- Users must have an internet connection to access services.
- External services (Google Maps, Payments) must be operational.
- Authentication relies on JWT (JSON Web Tokens) for security.

---

## **4. System Architecture**

### **4.1 Abstract View & Component Diagram**

```
+------------+        +-----------------+        +----------------+
|   User     | -----> |  Frontend (UI)  | -----> | Backend (API)  |
+------------+        +-----------------+        +----------------+
                           |     |            |           |
                           |     |            |           v
                           |     |            |     +--------------+
                           |     |            |---->| Authentication|
                           |     |            |     +--------------+
                           |     |            |           |
                           |     |            |           v
                           |     |            |     +--------------+
                           |     |            |---->|  Booking     |
                           |     |            |     +--------------+
                           |     |            |           |
                           |     |            |           v
                           |     |            |     +--------------+
                           |     |            |---->| Parking Spot |
                           |     |            |     +--------------+
                           |     |            |           |
                           |     |            |           v
                           |     v            |     +--------------+
                           |-> API Requests ->|---->| Interactive Map |
                                 (REST)       |     +--------------+
```

### **4.2 Components & Responsibilities**

| Component                   | Responsibilities                                 |
| --------------------------- | ------------------------------------------------ |
| **User Management**         | Handles authentication & user profile management |
| **Authentication Service**  | Manages user login & JWT tokens                  |
| **Parking Spot Management** | Stores and updates parking spots, availability   |
| **Booking System**          | Handles reservations, prevents double booking    |
| **Interactive Map**         | Displays available spots, navigation support     |

---

## **5. CRC Cards for Sprint 1**

### **5.1 User Management (User Class)**

- **Responsibilities:**
  - Register, log in, and manage user profile
  - Store user contact details and preferences
- **Collaborators:** Authentication, Booking, Payment

### **5.2 Parking Spot Management (ParkingSpot Class)**

- **Responsibilities:**
  - Store parking spot details (location, price, owner, availability)
  - Allow users to list and modify spots
- **Collaborators:** User, Booking, Interactive Map

### **5.3 Booking System (Booking Class)**

- **Responsibilities:**
  - Process reservations
  - Ensure availability and prevent double bookings
- **Collaborators:** User, ParkingSpot, Payment

### **5.4 Authentication Service (Auth Class)**

- **Responsibilities:**
  - Authenticate users securely (JWT-based)
  - Handle password resets
- **Collaborators:** User, Backend API

### **5.5 Interactive Map (MapView Class)**

- **Responsibilities:**
  - Display available parking spots on a map
  - Allow users to select and navigate to parking spots
- **Collaborators:** ParkingSpot, Booking, External APIs (Google Maps)

---

## **6. System Decomposition & Error Handling**

### **6.1 Error Handling Strategy**

| Error Scenario                         | Handling Strategy                                                   |
| -------------------------------------- | ------------------------------------------------------------------- |
| **Invalid User Input**                 | Validate fields before submission, return meaningful error messages |
| **Authentication Failure**             | Lock account after multiple failed login attempts, notify user      |
| **Double Booking Attempt**             | Check availability before confirming reservation, prevent conflicts |
| **API Failure (Google Maps, Payment)** | Implement retries, display fallback messages to users               |
| **Network Failure**                    | Cache essential data, show “Service Unavailable” message            |

### **6.2 Mapping System Architecture to Components**

- **Frontend (React.js)** → User authentication, map interaction, booking UI
- **Backend (Node.js/Express.js)** → API to handle authentication, reservations, payments
- **Database (MongoDB)** → Stores user, parking spot, and booking details

---

## **7. Conclusion**

This document outlines the system design for Sprint 1, focusing on core components and their interactions. Future iterations will expand functionality and refine the architecture based on feedback and testing.

---

## **8. Next Steps**

- Implement database schema for User, ParkingSpot, Booking, and Authentication.
- Develop API endpoints for parking spot listing, booking, and authentication.
- Integrate Google Maps API for real-time navigation.

---

### **End of Document**

