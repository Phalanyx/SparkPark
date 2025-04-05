# **System Design Document (Sprint 4 Final Update)**

## **1. Introduction**

This document outlines the final system design for Sprint 4, including all major components, architectural decisions, dependencies, and error-handling strategies. It reflects the finalized MVP of the Spark Park application.

---

## **2. System Overview**

### **Primary Features Delivered in Sprint 4:**

- Preference-Based Auto-Suggestions
- User Preferences Management (Create, Update, Delete)
- Bookings System (Frontend & Backend)
- Stripe Payment Integration
- Listing Management (Add, Edit, View)
    - Image Upload via Firebase
    - Availability Scheduling (Weekly)
- Interactive Map with Marker Details
- Refined and consistent mobile UI
- Finalized Figma-based branding and design

### **Goal:**
Deliver the MVP for a mobile-first parking platform that enables users to find parking spots matching their preferences and for private/commercial providers to list their own spaces.

---

## **3. System Interaction & Dependencies**

### **3.1 Operating Environment**

| Component                 | Technology Used                                                                           |
|--------------------------|--------------------------------------------------------------------------------------------|
| **Platform**              | iOS Mobile App (Expo/React Native)                                                        |
| **Backend**               | Node.js with Express.js                                                                   |
| **Frontend**              | React Native (Expo)                                                                       |
| **Database**              | MongoDB Atlas with Mongoose ORM                                                           |
| **Authentication**        | Firebase Authentication                                                                   |
| **Image Storage**         | Firebase Storage (Cloud Bucket)                                                           |
| **Payments**              | Stripe                                                                                    |
| **External APIs**         | Google Maps API (Geocoding & Navigation)                                                  |

### **3.2 Assumptions & Constraints**

- Users require internet access for all functionality.
- Stripe and Firebase services must be online.
- Geolocation must be enabled for certain features (e.g. auto-suggestion).
- Expo client required for iOS builds.

---

## **4. System Architecture**

### **4.1 Abstract View & Component Diagram**

![Software Architecture SparkPark-5](https://github.com/user-attachments/assets/3178d138-05e5-4627-b45e-b96539a9059d)


**Client (Mobile App)** → **Backend (API Server)** → **Database & External Services**

### **4.2 Components & Responsibilities**

| Component                   | Responsibilities                                                                 |
|----------------------------|----------------------------------------------------------------------------------|
| **Authentication Service**  | Firebase login & token management                                               |
| **Listing Management**      | Creating/editing listings, uploading images, setting availability                |
| **Preferences Management**  | User-defined preferences (size, features, price) for search customization        |
| **Recommendation System**   | Returns the best-fit parking based on user preferences using geospatial search  |
| **Booking System**          | Manages reservation creation, double-booking checks, and viewing bookings       |
| **Payments System**         | Stripe checkout session and payment confirmation                               |
| **Map Visualization**       | Dynamic rendering of markers, listing detail display                            |
| **Image Handling**          | Upload and fetch images from Firebase Storage                                   |

---

## **5. CRC Cards for Sprint 4**

![System Design Document-3](https://github.com/user-attachments/assets/b4c2504a-9869-47bb-bcb5-088f8f93b093)
![Leeres Board](https://github.com/user-attachments/assets/8b25add3-b4fe-4e06-8168-e8368c8d1bb9)

---

## **6. System Decomposition & Error Handling**

### **6.1 Error Handling Strategy**

| Error Scenario                         | Handling Strategy                                                   |
|----------------------------------------|----------------------------------------------------------------------|
| **Invalid Input (Frontend)**           | UI validation + API checks, feedback via error messages             |
| **Authentication Failure**             | Firebase handles retry attempts, client shows appropriate UI        |
| **Double Booking Attempt**             | Backend checks availability before confirming booking               |
| **Stripe Failure**                     | Catches session failure, user sees fallback page and retry option   |
| **Image Upload Failure**               | Caught at upload step, fallback to placeholder or retry             |
| **Network/Timeout Issues**             | Graceful fallback messages, loading spinners, and retry logic       |

### **6.2 Mapping System Architecture to Components**

| Layer            | Responsibilities                                                                 |
|------------------|----------------------------------------------------------------------------------|
| **Frontend**     | Search bar, listing form, map, preference input, booking screen, Stripe redirect |
| **Backend**      | Auth middleware, REST API endpoints, business logic, data processing              |
| **Database**     | MongoDB collections: `listings`, `preferences`, `bookings`, `users`               |
| **External APIs**| Firebase Auth, Firebase Storage, Stripe API, Google Maps API                     |

---

## **7. Next Steps / Post-MVP Considerations**

- Implement **user messaging/chat** between renter and owner
- Add **user ratings/reviews** for listings
- Enable **calendar-based booking view**
- Add **push notifications** for confirmed bookings and updates
- Transition to **cloud-hosted backend** with autoscaling for real deployment

---
