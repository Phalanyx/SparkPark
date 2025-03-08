# **Release Planning Meeting Document**

## **Release Plan**

### **Release Name:** Sprint 2 Release

---

## **Release Objectives**
Detailing the primary goals for the Sprint 2 release following SMART criteria.

### **Specific Goals**
- Implementing functionality to add listings to backend from fronend (CRUD)
- Implementing Geospatial search in listings to retrieve them based on location
- Implementing parameter based search to retreive listings based on preferences
- implementing image upload
  
## Participants and work assignment:
- **Albert**: Added geospatial query integration and worked on Authentication middleware + routing for backend
- **Dianna**: Revising and converting design into Figma for interactive prototype and styling
- **Emily**: Creating backend API for frontend to Cloudflare routing
- **Jaehyeon**: Implementing the frontend for adding new listings and searching them
- **Thorge**: Creating backend functionality for creating and fetching and searching Listings based on 
parameters
  
### **Metrics for Measurement**
- Succesfull adding of Listings
- Correct retreiveing of Listings based on parameters like size and availability
- Correct geospatial search in listings
- User feedback on ease of use and feature completeness.

---

## **Release Scope** FILL THIS IN
### **Included Features**
1. **Parking Views** - Added markers and visible data about each marker regarding price of parking, measurements, etc.
2. **Geospatial Queries** - A user is now able to find all available parking spots near a point of interest, within an isochrone of 20 minutes walking distance.
3. **Added Listing uploads** - A user is now able to upload a parking spot that they would like to rent out.

### **Excluded Features**
- User profiles: not important to core functionality
- Booking a Parking Spot: will be included in later release
- Payment Processing: will be included in later release
- Push Notifications: optional feature at this point

### **Bug Fixes**
There where no bugs in the first release we discovered yet.

### **Non-Functional Requirements**
- **Performance:** API response time < 500ms.
- **Security:** Enforce HTTPS, secure password storage.
- **Usability:** Mobile-friendly UI with intuitive navigation.

### **Dependencies and Limitations**
Dependencies: Google Maps API, MongoDB Atlas, Cloudflare for image hosting.
Limitations: Initial release may have limited functionality due to early stage of development and midterms affecting development time.

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



