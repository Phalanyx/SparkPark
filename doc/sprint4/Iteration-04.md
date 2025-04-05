# **BIG-OH**

> _Note:_ This document is meant to be written during (or shortly after) your initial planning meeting.     
> It does not really make sense for you to edit this document much (if at all) while working on the project - Instead, at the end of the planning phase, you can refer back to this document and decide which parts of your plan you are happy with and which parts you would like to change.


## Iteration 03

* Start date: Mar 8
* End date: Mar 21

## Process

#### Roles & Responsibilities

- **Albert:** Testing, CI/CD integration.
- **Dianna:** Finalizing design for frontend and app logo.
- **Emily:** Ensuring security against SQL injection, authentication requirements.
- **Jaehyeon:** Frontend implementation for user profiles, custom filtering in the app.
- **Thorge:** Backend functionality, JMeter testing, implementing preference-based auto-suggestions.

---

## Events

### Stand-Up Meetings
- **When and Where:**
   - Days: Wednesdays, Fridays, and Sundays.
   - Time: Flexible (8:00 PM or 10:00 PM).
   - Format: Online (Slack, Discord).
- **Purpose:**
   - Quick check-ins to discuss progress, blockers, and next steps.
   - Ensure alignment among team members.
   - Keep everyone accountable and informed without taking up too much time.

### Coding Sessions / Code Reviews
- **When and Where:** Scheduled as needed (e.g., weekends or evenings).
- **Format:** Online, using screen sharing.
- **Purpose:**
   - Collaborative work on specific tasks or features.
   - Pair programming or group problem-solving.
   - Accepting pull requests and organizing GitHub.

### Weekly Sync Meetings
- **When and Where:** Weekly (e.g., Monday evenings).
- **Purpose:**
   - Review weekly goals and priorities.
   - Address high-level concerns or updates.

---

## Artifacts

We are using **Jira and Discord** to organize the team.

### Tracking What Needs to Get Done
- All tasks will be logged as issues in Jira.
- Each issue will include:
   - A clear title and description.
   - Relevant labels, priorities, and due dates.
   - Subtasks for breaking down complex tasks.
- The Jira backlog will serve as the single source of truth for all pending tasks.

### Prioritizing Tasks
- Tasks will be prioritized using Jira’s priority levels (e.g., High, Medium, Low).
- The team will review and adjust priorities during stand-up meetings and weekly syncs.

### Assigning Tasks to Team Members
- Tasks will be assigned to team members directly in Jira.
- During meetings, members can volunteer for tasks or have them assigned based on availability and expertise.
- Each task will have a clear assignee and due date for accountability.

### Visualizing Progress
- Using Jira’s Scrum boards to visualize task progress.
- Columns like **To Do, In Progress, Done** will help track development.

### Managing Deadlines
- Deadlines are set for each task and milestone in Jira.
- Jira Timeline or Gantt Chart view is used to track deadlines and dependencies.
- Notifications and reminders keep the team on track.

---

## Product

### Goals and Tasks

Our main goal in this sprint is to improve the frontend, implement backend routes, and provide support for user preferences and auto-suggestions of parking spots.

- **As a user, I want to be able to...**
   - See all my listings.
   - Find a fitting parking spot based on search criteria and auto-suggestions.
   - Upload images to my listings.
   - See my user profile information.
   - Receive auto-suggestions of parking spots based on my preferences.

---

## Artifacts

1. **Filter & Search System**
   - Purpose: Allow custom searching based on user preferences (pricing, location, availability, etc.).
   - Description: Backend supports preference-based searching with `$geoNear` aggregation.
   - Deliverables: Fully functional filtering and auto-suggestion mechanism.
   - Why It Matters: Improves user experience by providing relevant parking spot suggestions.

2. **Map Listings Markers Component**
   - Purpose: Display listing details on an interactive map.
   - Description: Uses React Native Maps to render markers from backend data.
   - Deliverables: Functional map component displaying listings with clickable markers.
   - Why It Matters: Enhances visual navigation and user interaction with listings.

3. **Image Upload Feature**
   - Purpose: Allow users to upload images for their listings.
   - Description: Uses `react-native-image-picker` and stores images in Firebase Storage.
   - Deliverables: Component for image selection and uploading.
   - Why It Matters: Visual content enhances listing quality.

4. **Listing Uploading Form Component**
   - Purpose: Enable users to create new listings with details.
   - Description: Supports creating entries with address conversion, availability information, and images.
   - Deliverables: Fully functional listing creation screen with backend integration.
   - Why It Matters: Provides users the ability to contribute listings to the platform.

5. **User Preferences System**
   - Purpose: Store and retrieve user preferences for auto-recommendations.
   - Description: Preference data is saved in MongoDB and used to enhance backend recommendation queries.
   - Deliverables: API routes for adding, retrieving, and deleting preferences.
   - Why It Matters: Makes the app’s recommendation system effective and user-specific.

6. **High-fidelity Prototype of App**
   - Purpose: Visualize end-to-end user experience.
   - Description: Provides the flow for frontend components related to authentication, listings, and preferences.
   - Deliverables: Prototype shared with the team.
   - Why It Matters: Ensures consistent UI/UX design throughout development.

---

This updated plan reflects our progress and goals for Sprint 3, ensuring our app provides robust backend functionality and a clean, responsive frontend experience.

