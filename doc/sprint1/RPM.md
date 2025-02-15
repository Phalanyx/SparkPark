# **Release Planning Meeting Document**

## **Release Plan**

### **Release Name:** Sprint 1 Release

---

## **Release Objectives**
Detailing the primary goals for the Sprint 1 release following SMART criteria.

### **Specific Goals**
- Implement a user authentication system (registration, login, and JWT-based authentication).
- Designing and Implementing database schema
  - User, Parking Spot, Booking schema
  - Ensure data persistence through MongoDB with Mongoose.
- Integrate an interactive map for locating and navigating to parking spots.

### **Metrics for Measurement**
- Successful user registration and login.
- Accuracy of the interactive map in showing available spots.
- User feedback on ease of use and feature completeness.

---

## **Release Scope**
### **Included Features**
1. **Authentication** - Implements secure JWT-based authentication.
2. **Interactive Map** - Displays available parking spots and integrates Google Maps API.
3. **Database Setup**

### **Excluded Features**
- Adding and Managing Parking Spots (UI and API wise): will be included in later release
- Booking a Parking Spot: will be included in later release
- Payment Processing: will be included in later release
- Advanced Search Filters: will be included in later release
- Push Notifications: optional feature at this point

### **Bug Fixes**
None, as there was no previous release.

### **Non-Functional Requirements**
- **Performance:** API response time < 500ms.
- **Security:** Enforce HTTPS, secure password storage.
- **Usability:** Mobile-friendly UI with intuitive navigation.

### **Dependencies and Limitations**
- **Dependencies:** Google Maps API, MongoDB Atlas, Stripe (future dependency for payments).
- **Limitations:** Initial release may have limited functionality due to early stage of development and limited availability due to midterms.

---

This document serves as a structured release plan for Sprint 1, ensuring clear goals, scope, and expectations for all team members.

