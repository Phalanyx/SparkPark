# **System Design Document**

## **1. Introduction**

This document outlines the system design, including key components, architecture, dependencies, and error-handling strategies for Sprint 1. This includes High-Level System Architecture as well as CRC cards. This document is as of sprint 1 one and subject to change in the future.

---

## **2. System Overview**

**Primary Features in Sprint 1:**
  - Backend Database Schemas
    - User Management
    - Parking Spot
    - Booking
  - Authentication
  - Interactive Map
    
**Goal:** Provide the basic schema for the database and implementation of user registration and login as well as an Interactive map showing the Parking Spots in the database.

---

## **3. System Interaction & Dependencies**

### **3.1 Operating Environment**

| Component                 | Technology Used                                                   |
| ------------------------- | ----------------------------------------------------------------- |
| **Platform**              | Mobile Application (IOS) and Website           |
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

![System Design Document-2](https://github.com/user-attachments/assets/5dce640f-2461-46b9-9f55-6438f5ef2679)

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

![System Design Document-3](https://github.com/user-attachments/assets/b4c2504a-9869-47bb-bcb5-088f8f93b093)

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

## **7. Next Steps**

- Implement database schema for User, ParkingSpot, Booking, and Authentication.
- Develop API endpoints for parking spot listing, booking, and authentication.
- Integrate Google Maps API for real-time navigation.

---

