# 🚗 Driveway Rentals

Welcome to **Driveway Rentals**, the ultimate solution for connecting homeowners with unused driveway space to drivers seeking convenient and affordable parking. Say goodbye to the hassle of finding parking and start earning or saving today!

---

## 🔧 Technologies

- **Frontend**: Next.js
- **Backend**: Node.js + Express
- **Database**: MongoDB
- **Payment Gateway**: Stripe



## 💡 Motivation

The idea for Driveway Rentals was inspired by the need to address the challenges students face in finding affordable and convenient parking near their campuses.
With rising costs and limited parking spaces, many students struggle to manage their budgets while juggling their academic responsibilities. 
Driveway Rentals aims to provide an affordable and flexible parking solution by connecting students with local homeowners who have unused driveway space. 
This not only helps students save money but also fosters a sense of community and resource-sharing.

### Backend and Frontend Setup

**Backend Setup (Node + Express)**

   - Navigate to the backend directory, install dependencies, set environment variables, and start the backend server:
   ```bash
   cd backend/ && npm install && MONGO_URI=your-mongodb-uri STRIPE_SECRET_KEY=your-stripe-secret-key npm start
   ```
   
**Frontend Setup (Next.js)**

- Navigate to the frontend directory, install dependencies, set environment variables, and start the frontend development server:
  ```bash
  cd frontend/ && npm install && NEXT_PUBLIC_API_URL=http://localhost:5000 npm run dev



### Contribution Guidelines

We welcome contributions to Driveway Rentals! Please follow these guidelines to ensure a smooth collaboration process:

1. **Git Flow**:  
   We follow a simplified Git flow process for feature development. The `main` branch is reserved for production-ready code, and the `develop` branch is used for ongoing development.

2. **Branch Naming**:  
   Use the following naming convention for branches:  
   - `feature/<name>/<feature-name>` for new features (e.g., `feature/albert/search-functionality`).  
   - `bugfix/<name>/<issue-name>` for bug fixes (e.g., `bugfix/albert/login-error`).  
   - `hotfix/<name>/<critical-issue>` for urgent fixes (e.g., `hotfix/albert/payment-crash`).  

3. **Ticketing System**:  
   We use **Jira** to track tasks and bugs.

4. **Pull Requests**:  
   All changes must go through a pull request to ensure code quality and consistency.  
   - Submit your pull request to the `develop` branch.  
   - Include a clear description of the changes and reference the related GitHub issue (if applicable).  
   - Request a review from at least one team member.  



