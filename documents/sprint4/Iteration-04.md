# **BIG-OH**

> _Note:_ This document is meant to be written during (or shortly after) your initial planning meeting.     
> It does not really make sense for you to edit this document much (if at all) while working on the project - Instead, at the end of the planning phase, you can refer back to this document and decide which parts of your plan you are happy with and which parts you would like to change.


## Iteration 04

* Start date: Mar 22
* End date: Apr 4

## Process

#### Roles & Responsibilities

- **Albert:** Backend logic for bookings, Stripe payment integration, CI/CD.
- **Dianna:** Finalized app branding, visual polish, and updated Figma design.
- **Emily:** Security review, authentication workflows.
- **Jaehyeon:** Frontend UI for bookings, user listings, general UI refinements.
- **Thorge:** Backend for auto-suggestion, frontend UI for preferences and suggestion interaction.

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

Our main goal in this sprint is to finalize the MVP, connect frontend to booking and preference features, and polish the user experience.

- **As a user, I want to be able to...**
    - Receive tailored auto-suggestions for parking spots.
    - Edit and save my parking preferences.
    - Book a parking spot.
    - View current and past bookings.
    - View and interact with polished UI components.

---

## Artifacts

1. **Auto-Suggestion Feature**
    - Purpose: Recommend optimal parking spots based on preferences and current location/time.
    - Description: Uses geospatial queries and preference filtering.
    - Deliverables: Backend route with frontend integration and UI logic.
    - Why It Matters: Simplifies the parking search process and improves user satisfaction.

2. **Preferences UI and Backend**
    - Purpose: Enable users to save preference criteria (e.g., EV charging, covered, pricing).
    - Description: Connected with MongoDB and user-auth.
    - Deliverables: Preference form, saving and updating logic.
    - Why It Matters: Personalized suggestions and better matching.

3. **Booking Functionality**
    - Purpose: Allow users to book spots, view reservations.
    - Description: End-to-end booking flow with backend logic and Stripe integration.
    - Deliverables: Book spot, see active bookings, manage.
    - Why It Matters: Core MVP functionality.

4. **UI/UX Improvements**
    - Purpose: Make the app feel polished and intuitive.
    - Description: Final adjustments based on Figma mockups.
    - Deliverables: Consistent visual design across all screens.
    - Why It Matters: Improves usability and first impressions.

5. **Stripe Payment Integration**
    - Purpose: Enable users to pay for bookings.
    - Description: Secure payment processing through Stripe API.
    - Deliverables: Frontend integration and backend handling.
    - Why It Matters: Prepares the product for real-world monetization.

6. **CI/CD and Deployment Pipeline**
    - Purpose: Automate deployment and testing.
    - Description: CI/CD configured for Expo and backend with tests.
    - Deliverables: Working automated deployment process.
    - Why It Matters: Ensures code stability and eases maintenance.

---

This plan sets the foundation for a feature-complete MVP release by the end of Sprint 4.