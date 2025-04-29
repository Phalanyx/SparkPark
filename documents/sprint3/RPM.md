# **Release Planning Meeting Document**

## **Release Plan**

### **Release Name:** Sprint 3 Release

---

## **Release Objectives**
Detailing the primary goals for the Sprint 3 release following SMART criteria.

### **Specific Goals**
- Implementing functionality to view listings by filters
- Implementing listing forms with image upload 
- Implementing details shown for map markers
- implementing frontend UI
  
## Participants and work assignment:
- **Albert:** Testing, CI/CD integration.
- **Dianna:** Finalizing design for frontend and app logo.
- **Emily:** Ensuring security against SQL injection, authentication requirements.
- **Jaehyeon:** Frontend implementation for user profiles, custom filtering in the app.
- **Thorge:** Backend functionality, JMeter testing, implementing preference-based auto-suggestions.
parameters
  
### **Metrics for Measurement**
- Succesfull adding of Listings
- Correct retrieval of listings based on filters 
- Correct marker details
- User feedback on ease of use and feature completeness.

---

## **Release Scope** 
### **Included Features**
1. **Parking Filters** - Added the ability to filter listings based on parameters (filters, address)
2. **Profile page** - Added profile page
3. **Listing details** - A user is now able to click the marker and have details show


### **Excluded Features**
- User profile functionality: not important to core functionality
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

This document serves as a structured release plan for Sprint 3, ensuring clear goals, scope, and 
expectations for all team members.



