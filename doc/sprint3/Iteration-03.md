# BIG-OH

> _Note:_ This document is meant to be written during (or shortly after) your initial planning meeting.     
> It does not really make sense for you to edit this document much (if at all) while working on the project - Instead, at the end of the planning phase, you can refer back to this document and decide which parts of your plan you are happy with and which parts you would like to change.


## Iteration 02

* Start date: Feb 15
* End date: Mar 7 

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


1. Filter component to have custom search/filtering
   Artifact: 
   Purpose: Enable custom searching for specific user needs and preferences.
   Description:
   Filter by pricing, distance/address, and other details of listings.
   Use MongoDB for storing listing data (title, description, location, etc.).
   Deliverables:
   Functional filter search component in app.
   Why It Matters: Allows users search for preferred listings among available options.


2. Map Listings Markers Component
   Artifact: React Native component using a mapping library.
   Purpose: Display details with the listings on an interactive map for users to explore.
   Description:
   Use React Native Maps or similar library to render markers for each listing.
   Fetch listing data from Express backend via REST API.
   Availability, pricing, and other details are available to the user upon clicking the markers.
   Deliverables:
   Functional map component with markers and listing details on tap.
   Why It Matters: Provides users with a visual way to browse listings, enhancing user engagement.


3. Image Upload Feature
   Artifact: React Native image upload component.
   Purpose: Let users upload images for their listings.
   Description:
   Use react-native-image-picker to select images.
   Implement image upload to Express backend and store using cloud storage (e.g., AWS S3).
   Deliverables:
   Component for image selection and upload.
   Why It Matters: Enhances listing quality by allowing visual content.
the listing forms, uploading image, as well as converting the given address to coords

4. Listing Uploading Form Component
   Artifact: React Native screens for uploading a new listing and backend functionality.
   Purpose: Add details about a new listing and upload images for hosts to submit.
   Description:
   Add entry to backend with new listing details (address into coordinates, description, availability information, etc.).
   Store images, description, location, and contact info.
   Deliverables:
   Listing detail screen with all relevant information.
   Why It Matters: Provides users with all the details they need to interact with a listing.
   
5. High-fidelity prototype of app
   Artifact: High-fidelity prototype of app flow.
   Purpose: Visualize end-to-end user experience to be implemented.
   Description:
   Create an official design for visual frontend components for the app’s authentication, map listings, CRUD, and profile flows.
   Deliverables:
   Prototype shared with the team.
   Why It Matters: Helps provide exact design appearance and flow of frontend components to be implemented.

   This plan ensures all core features are implemented this sprint, with clear deliverables and artifacts to guide development.
