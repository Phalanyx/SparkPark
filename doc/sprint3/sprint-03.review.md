# **BIG-OH**

## Iteration 03 - Review & Retrospect

* When: March 21, 2025
* Where: ONLINE

## Process - Reflection

During this sprint, we continued working towards implementing critical functionalities, including:
- The filtering/custom searching feature to enhance user experience when searching for listings based on preferences.
- Viewing listing details for a more intuitive user experience.
- Backend functionality to support user-specific auto-suggestions based on stored preferences.
- Improved frontend components to display listing details interactively on a map.

We aimed to improve the user experience by refining the design and visual components of our Expo iOS app. However, we encountered issues with project environment setups due to the use of multiple technologies. Overall, the sprint was productive, but there are areas where efficiency can be improved by better managing task distribution and completion.

---

#### Decisions that turned out well
- Having frequent standups at fixed times:  
  This allowed everyone to catch up on each other's progress and discuss upcoming tasks, especially those with dependencies between different team members. These standups improved our alignment and reduced potential roadblocks.

- Using direct, private channels for specific communication:  
  Splitting project-related questions and discussions into direct messages when relevant kept the general communication channels clean and organized. This approach also allowed team members to focus on essential information without being overwhelmed by unrelated discussions.

- Referring to design documents:  
  Adhering to UI and system design documents made collaboration easier and ensured consistency across the application. This also simplified merging code and avoided conflicts between modules developed by different team members.

- Restructuring the project for modularity:  
  Breaking down the project into smaller, independent modules made it easier to work on individual components and minimized merge conflicts. This modular approach also facilitated testing and debugging of specific functionalities.

---

#### Decisions that did not turn out as well as we hoped
- Use of various technologies requiring separate access tokens:  
  The setup of authentication, databases, image uploads, etc., required different credentials. This complexity made the project environment setup cumbersome, requiring excessive communication to ensure every team member could run the project successfully.

---

#### Planned changes
- Standardize and simplify environment setup:  
  Moving forward, we plan to streamline the configuration process by providing clear documentation for setting up access tokens and making the process more uniform across the team. We may also consider using environment files (.env) to centralize configuration and reduce potential errors.
- Continue the current working structure:  
  The current process with fixed standups and modularized development is working well, so we plan to keep following this approach in the upcoming sprint.

---

## Product - Review

#### Goals and/or tasks that were met/completed:
- **Frontend:**
  - Filter Search Component (custom searching based on user preferences).
  - User Profile Page (base implementation).
  - Add Listing Page (with image upload functionality).
  - Displaying listing details and user-specific suggestions on the map.
- **Backend:**
  - Implemented user preferences with CRUD functionality.
  - Developed auto-suggestion functionality based on stored preferences.
- **Testing:**
  - Performance tests (using JMeter for load testing).
  - Integration tests (using Jest and Supertest).

#### Goals and/or tasks that were planned but not met/completed:
- **User Ratings:**
  - We did not manage to focus on user ratings in profiles due to prioritizing the filtering and listing features, which are critical to our app's primary selling point. Implementing this feature will be addressed in the next sprint.

---

## Meeting Highlights
- Effective communication and clear distribution of responsibilities contributed to our most efficient sprint yet.
- Modular development and regular standups proved invaluable in ensuring smooth integration and avoiding conflicts during the merge process.

