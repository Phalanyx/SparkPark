# **Release Planning Meeting Document**

## **Release Plan**

### **Release Name:** Sprint 4 Release (Final MVP)

---

## **Release Objectives**
Detailing the primary goals for the Sprint 4 release following SMART criteria.

### **Specific Goals**
- Implement full auto-suggestion functionality based on user preferences
- Add and edit preferences in frontend
- Display and manage bookings in frontend and backend
- Final UI polish and feature completeness for MVP
- Integrate Stripe for payment functionality

## Participants and Work Assignment
- **Albert:** Backend bookings system, Stripe payment integration, CI/CD pipeline improvements
- **Dianna:** Final UI design, app logo, updated Figma prototype
- **Emily:** Authentication and security assurance (no changes in Sprint 4)
- **Jaehyeon:** Frontend UI for bookings, listing detail views
- **Thorge:** Backend functionality and frontend UI for auto-suggestion, preference integration

### **Metrics for Measurement**
- Accuracy of auto-suggestion results based on user preferences
- Successful submission and retrieval of bookings
- User feedback on usability and design polish
- System stability under demo conditions

---

## **Release Scope**

### **Included Features**
1. **Auto-Suggestion** - Suggests listings matching user preferences in real-time.
2. **User Preferences** - Users can now add and edit preference data in frontend.
3. **Booking System** - Users can see their bookings and manage them via the app.
4. **Stripe Payments** - Stripe integration for payment processing.
5. **UI Overhaul** - Final design iteration, mobile-optimized and polished experience.

### **Excluded Features**
- Chat between listing owner and renter (not MVP, out of scope for semester project)
- User rating system (not MVP, out of scope for semester project)

### **Bug Fixes**
- N/A — final sprint was focused on feature completion and polish.

### **Non-Functional Requirements**
- **Performance:** Autosuggestion response time < 1s.
- **Security:** Enforce HTTPS, protect all API routes, Firebase Auth.
- **Usability:** Mobile-first experience, intuitive and consistent UI/UX.

### **Dependencies and Limitations**
Dependencies: Google Maps API, MongoDB Atlas, Firebase Auth, Firebase Storage, Stripe.
Limitations: No support for real-time messaging or advanced moderation in MVP.

---

## **Additional Thoughts on Considerations for Full Organizational Deployment**

### **Detailed Instruction - Steps to Carry Out the Deployment**
- Final build pushed to GitHub main branch triggers CI/CD pipeline
- Production MongoDB backups created
- Firebase rules reviewed and finalized
- Stripe keys configured securely in environment
- All services deployed via EAS (frontend) and backend hosting service

### **PIV (Post Implementation Verification) Instruction**
- Verify Stripe payments succeed in production mode
- Test user preference flows and validate returned autosuggestions
- Verify bookings and availability are correctly synced
- Manual and automated testing of all core user flows

### **Post Deployment Monitoring**
- Use logs and analytics to monitor user activity and API errors
- Stripe and Firebase dashboards monitored for exceptions
- Conduct post-deployment smoke tests
- Keep Discord channel open for bug triage during demo week

### **Roll Back Strategy**
- Keep previous stable build tagged and ready in GitHub
- Firebase database snapshots stored for recovery
- Disable autosuggestion endpoint if critical issues arise
- Communicate transparently with stakeholders if issues occur

---

This document serves as a structured release plan for Sprint 4, highlighting the final MVP delivery and feature set to ensure a successful demo and project conclusion.
