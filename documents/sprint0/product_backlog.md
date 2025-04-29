# Product Backlog

## User Stories

### 1. Live Map
As a **parking customer** \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; I want to *have a live map of available parking spots.* \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; So that *I can find a parking spot suiting my needs.*

#### Acceptance Criteria
Given *the user is connected to the internet and has allowed the app to access its location,* \
When *the user is in the "find parking spot" tab,* \
Then *available, close-by parking spots should be displayed with symbols on an interactive map.*
### 2. Live Navigation
As a **short-term parker** \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; I want to *have live navigation to my selected parking spot.* \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; So that *I can quickly and easily find my parking spot.*

#### Acceptance Criteria
Given *a user has booked a parking spot,* \
When *they click on the navigation button on the listing,* \
Then *a navigation map showing directions to the prking spot (using a navigation API).*

### 3. Picture of Parking Spot
As a **parking customer** \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; I want to *see a picture of the parking spot on the platform.* \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; So that *I know I am parking at the right spot.*

#### Acceptance Criteria
Given *a user is looking for a parking spot on the "find parking spot tab",* \
When *they select a parking spot on the map,* \
Then *there is a picture of the parking spot visible in the details.*

Given *a landlord wants to add a parking spot to the platform,* \
When *they are adding their spot in the "add parking spot" tab,* \
Then *they are required to upload a picture of the spot.*

### 4. Parking Spot Auto-Recommendation
As a **short-term parker** \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; I want to *have an auto-suggestion of a "good" parking spot.* \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; So that *I can find a spot quickly and without much effort.* 

#### Acceptance Criteria
Given *a registered customer on the "find parking spot" tab,* \
When *they click the "auto find" button,* \
Then *a "good" parking spot will be automatically selected based on distance, price and preferences of the user.*

### 5. Visible Pricing
As a **parking customer** \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; I want to *see the pricing for the parking spot beforehand.* \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; So that *I can choose a spot I can afford.*

#### Acceptance Criteria
Given *a user is looking for a parking spot on the platform,* \
When *they look at the "find parking spot" tab,* \
Then *there should be hourly prices displayed for each parking spot.*

### 6. Flexible Parking Duration
As a **short-term parker** \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; I want to *have flexibility in my parking duration.* \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; So that *can be spontaneous in my activities.*

#### Acceptance Criteria
Given *a user wants to rent a parking spot,* \
When *they are on the "find parking spot" tab* \
Then *there is an option to select "pay-as-you-go" if the landlord has setup their parking spot for this functionality.*

Given *a landlord who has/adds a listing on the platform,* \
When *they edit/add a listing,* \
Then *there is the option to enable the pay-as-you-go functionality for this parking spot, which in turn disables reservations and longterm rentals.*

### 7. Control over Availability
As a **parking space owner** \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; I want to *have control over time and date my parking spot is available.* \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; So that *I can use the spot whenever I need to.*

#### Acceptance Criteria
Given *a landlord has a listing on the platform,* \
When *they visit the details of their listing,* \
Then *the availability of the spot can be set in a calendar.*

### 8. Mobile Accessebility
As a **parking customer** \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; I want to *be able to access the platform from my phone.* \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; So that *I can find parking spots on the go.*

#### Acceptance Criteria
Given *a user is accesing the platform on their phone,* \
When *they use the platform,* \
Then *UI should be easily navigatable and readable on phones.*

### 9. Contacting Users
As a **parking space owner** \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; I want to *be able to contact the customer in a timely manner.* \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; So that *I can reach him in an emergency.*

#### Acceptance Criteria
Given *a registered (including phone number) customer wants to book a parking spot,* \
When *the user completes a booking,* \
Then *the users contact information should be displayed in the tab for managing your listings.*

### 10. Size Information
As a **parking customer** \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; I want to *see the size of the parking spot beforehand.* \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; So that *I can choose a spot that has enough space for my car.*

#### Acceptance Criteria
Given *a user wants to book a parking spot,* \
When *they click on a parking spot on the map,* \
Then *it should display details of this parking spot including size.*

### 11. Automatic Size Matching
As a **parking customer** \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; I want *only parking spots to be auto-recommended in which my car fits.* \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; So that *I don't have to worry about my car not fitting once I arrive.*

#### Acceptance Criteria
Given *a user has his car size in his profile,* \
When *they select this car in the "find parking spot" tab,* \
Then *only parking spots that fit the car should be displayed on the map.*

### 12. Secure & Easy Payment
As a **parking customer** \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; I want to *pay securely and easily on the platform, while using standard payment methods.* \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; So that *I am protected against potential fraud and can pay without much effort.* 

#### Acceptance Criteria
Given *a use wants to rent a parking spot,* \
When *they are making their payment,* \
Then *the platform should handle the transaction as a middleman and not pay out the landlord immediately.*

Given *a user wants to book a parking spot,* \
When *they get to the "checkout",* \
Then *the payment should be handled by a common payment service.*

### 13. Live Information
As a **paking customer** \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; I want to *have live, real-time data about avalability of parking spots.* \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; So that *I am assured to be able to book a parking spot if I found it on the platform.* 

#### Acceptance Criteria
Given *a user wants to book a parking spot and is online,* \
When *they are on the "find parking spot" tab,* \
Then *the the map data should be regularly updated (every few seconds).*

### 14. Add Listing for Parking Spot
As a **parking space owner** \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; I want to *be to be guided through the process of adding a listing to the platform* \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; So that *I am able to create a good listing with all the necessary information without much effort.* 

#### Acceptance Criteria
Given *a landlord is in the "add listing" tab,* \
When *they fill out the form for adding a parking spot,* \
Then *there should be different steps (pages of the form) as well as good defaults and explanations for the different fields.*

### 15. Trustable Users
As a **user** \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; I want to *be guaranteed that other users are legit and trustworthy.* \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; So that *I can use the platform without having to worry about fraud.* 

#### Acceptance Criteria
Given *a landord has a parking space listed on the platform,* \
When *a user views a listing from this landlord,* \
Then *the rating of this landlord should be displayed on the lsiting.*

Given *a landord has a parking space listed on the platform,* \
When *a user views a listing from this landlord,* \
Then *the user should not be allowed to book if the rating of the landlord is below a certain threshold.*

Given *a user is registered on the platform,* \
When *they have a bad rating and or do not abide by the rules,* \
Then *their account should be temporarly disabled (removing all their listings) until verfied by a human.*



### 16. Guaranteed Payment
As a **parking space owner** \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; I want *the platform to handle the payment process.* \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; So that *I am protected against fraud.* 

#### Acceptance Criteria
Given *an parking space owner has a listing for his space on the platform,* \
When *a user rents this parking spot and proceeds to the payment,* \
Then *the user should pay using the platforms payment service and the platform should then pay the parking space owner.*

### 17. Compare Rents
As a **parking space owner** \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; I want to *be able to see rents for other (similar) parking spots.* \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; So that *I can choose my rent accordingly.* 

#### Acceptance Criteria
Given *the user is online and wants to register a parking spot,* \
When *he is in the "add parking spot" tab,* \
Then *there should prices of similar parking spots being shwon in a list and on a map.*

### 18. Favorite Parking Spots
As a **parking customer** \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; I want to *have a list of favorite or frequently used parking spots.* \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; So that *I have easy access to them whenever I want to use them again.* 

#### Acceptance Criteria
Given *the user has added parking spots to his favorites,* \
When *he clicks on the "favorites" tab,* \
Then *a list as well as a map with his favorite parking spots should be displayed.*

### 19. Availability Calendar
As a **parking customer** \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; I want to *see an overview of when the parking spot is available.* \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; So that *I can plan ahead.* 

#### Acceptance Criteria
Given *the user is online and browsing the "find parking spots" tab* \
When *the user inspects the details of a parking spot,* \
Then *the availibility of a parking spot should be displayed in a calendar.*

### 20. Custom Search
As a **parking customer** \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; I want to *modify the search parameters of the parking spot search.* \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; So that *I am only recommended parking spots that fit my needs.* 

#### Acceptance Criteria
Given *The user has specified custom search options and is online,* \
When *the user is in the "find parking spot" tab,*  \
Then *only parking spots meeting the custom search criteria should be displayed.*

### 21. Admin Control
As an **admin** \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; I want to *be able to look at user activities,* \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; So that *I can remove users that make the platform unsafe.* 

#### Acceptance Criteria
Given *a user is logged in as an admin,* \
When *they visit a user profile,* \
Then *there should advanced data about the users activity displayed as well as an option to remove/disable the account or listing of the user.*
