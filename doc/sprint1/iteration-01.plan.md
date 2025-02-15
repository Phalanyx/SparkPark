# BIG-OH

 > _Note:_ This document is meant to be written during (or shortly after) your initial planning meeting.     
 > It does not really make sense for you to edit this document much (if at all) while working on the project - Instead, at the end of the planning phase, you can refer back to this document and decide which parts of your plan you are happy with and which parts you would like to change.


## Iteration XX

 * Start date: Feb 1
 * End date: Feb 12

## Process

_This entire section is optional. Note that you will have to fill it out and more for the next 3 deliverables so it's good to start soon and get feedback._ 

#### Roles & responsibilities

Describe the different roles on the team and the responsibilities associated with each role.

Albert: Setting up Firebase Social Auth for client side (react native) and Firebase Admin SDK for backend.

Dianna: Designing the user interface for mobile and web app and implementing in frontend.

Emily: Set up image bucket / file storage for parking spots

Jaehyeon: 

Thorge: 

#### Events
Stand-Up Meetings
When and Where?
Days: Wednesdays, Fridays, and Sundays
Time: Night (specific time flexible, e.g., 8:00 PM or 10:00 PM)
Format: Online (Slack, Discord)
Purpose: 
Quick check-ins to discuss progress, blockers, and next steps.
Ensure alignment among team members.
Keep everyone accountable and informed without taking up too much time.

Other Potential Events
Coding Sessions/Code reviews
When and Where?
Scheduled as needed (e.g., weekends or evenings).
Online, using screen sharing
Purpose:
Collaborative work on specific tasks or features.
Pair programming or group problem-solving.
Accepting pull requests and organizing Github
Quick Weekly Sync Meeting
When and Where?
Weekly (e.g., Monday evenings).
Online.
Purpose: Review the week’s goals and priorities, address any high-level concerns or updates.


#### Artifacts

We will be using Jira and Discord to organize the team.

Tracking What Needs to Get Done
All tasks will be logged as issues in Jira.

Each issue will include:
  A clear title and description.
  Relevant labels, priorities, and due dates.
  Subtasks for breaking down complex tasks.
  The Backlog in Jira will serve as the single source of truth for all pending tasks.

Prioritizing Tasks
Tasks will be prioritized using Jira’s priority levels (e.g., High, Medium, Low).
The team will review and adjust priorities during stand-up meetings and weekly syncs.

Assigning Tasks to Team Members
Tasks will be assigned to team members directly in Jira.
During stand-ups or planning meetings, team members can volunteer for tasks or have them assigned based on availability and expertise.
Each task will have a clear assignee and due date to ensure accountability.

Visualizing Progress
The team will use Jira’s Scrum boards to visualize task progress.
Columns like "To Do," "In Progress," and "Done" will help the team see what’s being worked on and what’s completed.

Managing Deadlines
Deadlines will be set for each task and milestone in Jira.
The Jira Timeline or Gantt Chart view can be used to track deadlines and dependencies.
Notifications and reminders in Jira will help keep the team on track.



## Product

#### Goals and tasks

As a user (spot finder or spot lister) I want to be able to signup/login. So that I can save my information, and enter it only once.
As a parking customer I want to have a live map of available parking spots. So that I can find a parking spot suiting my needs.
As a parking customer I want to be guaranteed that landlords are legit. So that I am guaranteed to get a parking spot when I rent one on the platform.
As a parking customer I want to see a picture of the parking spot on the platform. So that I know I am parking at the right spot.
As a customer, I want to be able to save/favourite listings so I can view them at a convenient place for the future.


#### Artifacts

1. User Authentication Flow
Artifact: Authentication API endpoints and React Native screens.
Purpose: Securely handle user registration, login, and session management.
Description:
Express Backend: Implement Firebase Social Auth and Custom claim tokens.
React Native: Build screens for registration, login, and password recovery.
Deliverables:
API endpoints/Middleware
React Native screens for authentication flows.
Why It Matters: Ensures secure user access and session persistence across app usage.

2. Map Listings Component
Artifact: React Native component using a mapping library.
Purpose: Display listings on an interactive map for users to explore.
Description:
Use React Native Maps or similar library to render markers for each listing.
Fetch listing data from Express backend via REST API.
Deliverables:
Functional map component with markers and listing details on tap.
Why It Matters: Provides users with a visual way to browse listings, enhancing user engagement.

3. CRUD for Listings
Artifact: Express API for listing operations.
Purpose: Enable adding, updating, and deleting listings.
Description:
Create API endpoints (/listings, /listings/:id).
Use MongoDB for storing listing data (title, description, location, etc.).
Deliverables:
API documentation for CRUD operations.
Why It Matters: Allows users to manage their listings efficiently and ensures data consistency.

4. Image Upload Feature
Artifact: React Native image upload component.
Purpose: Let users upload images for their listings.
Description:
Use react-native-image-picker to select images.
Implement image upload to Express backend and store using cloud storage (e.g., AWS S3).
Deliverables:
Component for image selection and upload.
Why It Matters: Enhances listing quality by allowing visual content.

5. Listing Viewing Component
Artifact: React Native screen for listing details.
Purpose: Display detailed information about a listing.
Description:
Fetch listing data from Express backend.
Show images, description, location, and contact info.
Deliverables:
Listing detail screen with all relevant information.
Why It Matters: Provides users with all the details they need to interact with a listing.

6. Wireframe Mock-Up
Artifact: Wireframe prototype of app flow.
Purpose: Visualize end-to-end user experience.
Description:
Create a visual wireframe prototype showing authentication, map listings, CRUD, and profile flows.
Deliverables:
Prototype images shared with the team.
Why It Matters: Helps align the team on the app's flow and user experience.
This plan ensures all core features are implemented this sprint, with clear deliverables and artifacts to guide development.
