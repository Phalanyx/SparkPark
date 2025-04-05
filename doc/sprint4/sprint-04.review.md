# **BIG-OH**

## Iteration 04 - Review & Retrospect

* When: April 5, 2025
* Where: ONLINE

---

## Process - Reflection

In our final sprint, we focused on delivering the MVP and polishing the application across all layers. We prioritized completing user-facing features and back-end infrastructure needed for a fully functional parking experience.

Key focuses included:
- Implementing the **auto-suggestion** system based on user preferences.
- Finalizing the **user preference system**, both in frontend UI and backend.
- Completing **booking workflows** including backend logic and frontend interface.
- Improving and unifying the **visual design** of the app.
- Finalizing app branding and high-fidelity prototypes in Figma.
- Adding **Stripe** payment support and integrating CI/CD deployment improvements.

Despite the scope and complexity, the team executed effectively and reached a stable MVP milestone. Most critical features were completed and refined for demo readiness.

---

### What Went Well

- **Clear role distribution throughout the sprint**  
  Each member focused on their area (frontend, backend, design, etc.), which helped us avoid duplicated work and reduced communication overhead.

- **Parallel feature development and use of feature branches**  
  We managed to work on complex features like bookings, preferences, and UI in parallel with minimal conflicts due to structured Git branching and separation of concerns.

- **CI/CD and Expo Build Process Stability**  
  Final CI/CD integrations (thanks to Albert) helped streamline testing and building for release, saving time in the final stages.

- **Design Finalization and Figma Sync**  
  The app received a final design polish and alignment with our Figma prototype, improving UX and consistency (credit to Dianna).

---

### What Could Have Gone Better

- **Underestimated Integration Effort in Final Sprint**  
  Integrating bookings, payments, preferences, and autosuggestions toward the end led to high pressure and reduced testing time for some features.

---

### 🔧 Planned Improvements (For Future Work)

- Introduce **environment setup automation scripts** or Docker to ease project onboarding.
- More automated tests and tighter CI pipelines to catch issues earlier during development.
- Time buffer between feature development and testing, especially for user flows like payments or suggestions.

---

## Product - Review

### ✅ Completed Tasks & Features

- **Auto-Suggestion System**:
  Based on user preferences, auto-suggest the most relevant parking spots near their location.

- **Preference System**:
  Users can now set and update parking preferences including size, price, and features (e.g. EV charging).

- **Booking Functionality**:
  Backend and frontend now support creating and viewing bookings.

- **UI Overhaul**:
  Major visual improvements across map view, listing form, profile, and calendar components for availability.

- **Stripe Integration**:
  Payment support implemented and integrated into booking workflow.

- **CI/CD Improvements**:
  Deployment workflows enhanced for faster builds and easier testing.

---

### ❌ Features Planned but Not Included

- **Chat between Listing Owner and Renter**:  
  Useful but considered non-MVP for the course timeline.

- **User Ratings System**:  
  Out of scope for Sprint 4, possibly included in post-MVP development.

---

## Meeting Highlights

- The final demo walkthrough was rehearsed multiple times to ensure all core features are shown clearly.
- Each member presented their module and was responsible for test/demo validation.
- Everyone gained hands-on experience with the entire stack and cross-functional collaboration.

---

## Final Thoughts

Spark Park reached MVP status with a rich feature set. Through iteration and teamwork, we built a scalable and polished application combining:
- A mobile-friendly Expo frontend
- A flexible backend with intelligent querying
- Firebase authentication and secure image storage
- Real-time user interactions and bookings

Our next steps would include expanding monetization, adding chat, and supporting long-term scaling—but the foundation is complete.