# BIG-OH

> _Note:_ This document is meant to be written during (or shortly after) your initial planning meeting.     
> It does not really make sense for you to edit this document much (if at all) while working on the project - Instead, at the end of the planning phase, you can refer back to this document and decide which parts of your plan you are happy with and which parts you would like to change.


## Iteration 03

* Start date: Feb 8
* End date: Mar 21 

## Process

_This entire section is optional. Note that you will have to fill it out and more for the next 3 deliverables so it's good to start soon and get feedback._

#### Roles & responsibilities

Albert: Adding Geospatial search functionalits, provide info about auth.

Dianna: Revising and converting design into Figma for interactive prototype and styling (Head of Design)

Emily: Creating backend API for frontend to Cloudflare routing

Jaehyeon: Frontend for adding and displaying listings. (Provide Setup help)

Thorge: Creating backend functionality for creating and fetching and searching Listings based on 
parameters

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

Our main goal in this sprint is to implement functionality to create, post and fetch listings 
for parking spots as well as implementing geospatial search for parking spots. This should allow 
to add listings from the frontend and then search these listings based on parameters like 
availability, size and distance.

- As a user I want to be able to add a listing for my parking spot 
- As a user I want to see all my listings
- As a user I want to find a fitting parking spot based on search criteria
- As a user I want to be able to upload images to my listing
- As a user I want to be able to see my user info
- As a user I want to be able to see other users ratings


#### Artifacts


1. Map Listings Component
   Artifact: React Native component using a mapping library.
   Purpose: Display listings on an interactive map for users to explore.
   Description:
   Use React Native Maps or similar library to render markers for each listing.
   Fetch listing data from Express backend via REST API.
   Deliverables:
   Functional map component with markers and listing details on tap.
   Why It Matters: Provides users with a visual way to browse listings, enhancing user engagement.

2. CRUD for Listings
   Artifact: Express API for listing operations.
   Purpose: Enable adding, updating, and deleting listings.
   Description:
   Create API endpoints (/listings, /listings/:id).
   Use MongoDB for storing listing data (title, description, location, etc.).
   Deliverables:
   API documentation for CRUD operations.
   Why It Matters: Allows users to manage their listings efficiently and ensures data consistency.

3. Image Upload Feature
   Artifact: React Native image upload component.
   Purpose: Let users upload images for their listings.
   Description:
   Use react-native-image-picker to select images.
   Implement image upload to Express backend and store using cloud storage (e.g., AWS S3).
   Deliverables:
   Component for image selection and upload.
   Why It Matters: Enhances listing quality by allowing visual content.

4. Listing Viewing Component
   Artifact: React Native screen for listing details.
   Purpose: Display detailed information about a listing.
   Description:
   Fetch listing data from Express backend.
   Show images, description, location, and contact info.
   Deliverables:
   Listing detail screen with all relevant information.
   Why It Matters: Provides users with all the details they need to interact with a listing.
5. 
5. Wireframe Mock-Up
   Artifact: Wireframe prototype of app flow.
   Purpose: Visualize end-to-end user experience.
   Description:
   Create a visual wireframe prototype showing authentication, map listings, CRUD, and profile flows.
   Deliverables:
   Prototype images shared with the team.
   Why It Matters: Helps align the team on the app's flow and user experience.
   This plan ensures all core features are implemented this sprint, with clear deliverables and artifacts to guide development.
