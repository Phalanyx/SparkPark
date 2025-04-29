# BIG-OH

## Iteration 02 - Review & Retrospect

* When: March 7, 2025
* Where: ONLINE

## Process - Reflection

During this sprint we started to make the first real progress in the actual developing as the 
last sprint mostly focused on basic setup of project environment. Generally this sprint worked 
out well we managed to achieve most of our goals. Still we think there is room for improvements 
in terms of organization and the actual volume of tasks we get done. 




#### Decisions that turned out well
- Having frequent standups at fixed times. This gave everyone the chance to catch up with other 
  team members progress as well as the chance to discuss what to work on next and especially how 
  to do this. This was especially important in this sprint as the distribution of tasks let to 
  dependencies between different team members tasks.
- Using direct, private channels for specific questions or requests just concerning two people. 
  This confronted everyone only with the information important to them and kept the team channel 
  clean for the topics and questions concerning everyone. This made our communication more 
  efficient in general.
- Referring to the design documents for both UI and system design for implementing features. 
  This lead to a more consistent design of our application in the end and made it easier for 
  people to collaborate.


#### Decisions that did not turn out as well as we hoped
- We forgot to close the first sprint on our Jira. This had major implications for our Jira 
  tracking for the second sprint as we only figured that out towards the end of the sprint. This 
  messed up our burndown chart as well as some of our planning on Jira. 
- Using a lot of different technologies setup by different people. We have a lot of different 
  access tokens for auth, db, image upload etc. This was a bt messy as there was a lot of 
  communication needed for everyone to setup and sign in to all these services to get the 
  project running on their device.
- Merging of backend routing functionality. We split the work on backend functionality and had 
  to merge all these changes back to develop. We made a mistake in the merging which lead to a 
  lengthy debugging process.


#### Planned changes

We will setup the Jira for sprint03 in our initial meeting where we also plan the third sprint. 
This will ensure we have correct tracking of our progress and speed for the following sprints.

## Product - Review

#### Goals and/or tasks that were met/completed:
- Adding Listings from Frontend to Database 
- Retrieving Listings belonging to a User
- Retrieving User Info
- Fetching parking spots based on availability and size
- Geospatial search of Parking Spots
- uploading images to listing
#### Goals and/or tasks that were planned but not met/completed:
- User ratings in user profile. We did not get to focus on the user profiles yet as our focus 
  was on the listings first as this functionality is more important for our app.

## Meeting Highlights
- Being more careful when merging and also when working on the same files. We should try to 
  avoid work on the same files whenever possible and be more careful when resolving merge 
  conflicts to ensure smoother pull requests.
- Communicating especially one on one wherever possible speeds up response times and makes 
  development more efficient.
