# **Release Planning Meeting Document**

## **Release Plan**

### **Release Name:** Sprint 2 Release

---

## **Release Objectives**
Detailing the primary goals for the Sprint 2 release following SMART criteria.

### **Specific Goals**
- Implement a user authentication system (registration, login, and JWT-based authentication).
- Designing and Implementing database schema
  - User, Parking Spot, Booking schema
  - Ensure data persistence through MongoDB with Mongoose.
- Integrate an interactive map for locating and navigating to parking spots.
  
## Participants and work assignment: FILL IN THIS PART
- **Albert**:
- **Dianna**:
- **Emily**:
- **Jaehyeon**: 
- **Thorge**: Creating backend functionality for creating and fetching and searching Listings based on 
parameters
  
### **Metrics for Measurement**
- Successful user registration and login.
- Accuracy of the interactive map in showing available spots.
- User feedback on ease of use and feature completeness.

---

## **Release Scope** FILL THIS IN
### **Included Features**
1. **feat1** - 
2. **feat2** - 
3. **feat3**

### **Excluded Features**
- Adding and Managing Parking Spots (UI and API wise): will be included in later release
- Booking a Parking Spot: will be included in later release
- Payment Processing: will be included in later release
- Advanced Search Filters: will be included in later release
- Push Notifications: optional feature at this point

### **Bug Fixes**
FILL IN THIS PART

### **Non-Functional Requirements**
- **Performance:** API response time < 500ms.
- **Security:** Enforce HTTPS, secure password storage.
- **Usability:** Mobile-friendly UI with intuitive navigation.

### **Dependencies and Limitations**
- **Dependencies:** Google Maps API, MongoDB Atlas, Stripe (future dependency for payments).
- **Limitations:** Initial release may have limited functionality due to early stage of development and limited availability due to midterms.

---

## **Additional Thoughts on Considerations for Full Organizational Deployment**
Our thoughts on what could be important for full organizational development.

### **Detailed Instruction - Steps to Carry Out the Deployment**
- Prepare the production environment by ensuring all dependencies are installed.
- Backup the existing database before deploying changes.
- Deploy new codebase to the production server using CI/CD pipeline.
- Run database migrations to apply new schema changes.
- Restart necessary services and conduct a smoke test to verify functionality.

### **PIV (Post Implementation Verification) Instruction**
- Validate that user authentication works as expected.
- Test key user flows such as booking a parking spot and modifying listings.
- Check database integrity and ensure no data loss has occurred.
- Confirm external API integrations (Google Maps, payments) are functioning correctly.
- Gather feedback from test users and report any issues.

### **Post Deployment Monitoring**
- Monitor system logs for errors and unexpected behavior.
- Track API response times and user activity to detect performance bottlenecks.
- Use automated alerts to identify service downtime or database failures.
- Maintain a support channel for users to report any immediate issues.

### **Roll Back Strategy**
- Maintain version-controlled deployment for quick reversion to the previous stable release.
- If a major issue is detected, disable new features while keeping core functionalities active.
- Restore the previous database backup if data corruption occurs.
- Notify users and stakeholders in case of downtime or service degradation.

---

This document serves as a structured release plan for Sprint 2, ensuring clear goals, scope, and expectations for all team members.



