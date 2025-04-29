# CI/CD Workflow Documentation 🚀

This document explains the Continuous Integration and Continuous Deployment workflows for our project.

## Overview 📋

Our project uses GitHub Actions to automate building, testing, and deploying both the backend and frontend components. We have three main workflow files:

1. Backend CI (Continuous Integration) 🔄
2. Backend CD (Continuous Deployment) 🚀
3. Frontend CI (Expo iOS Prebuild) 📱

## Backend CI Workflow 🔄

The backend CI workflow runs on every push and pull request to any branch. This workflow makes sure that the backend can build without errors and that the unit tests pass.

### Steps:
1. **Setup** 🛠️
   - Uses Ubuntu latest
   - Sets up Node.js 22.x
   - Configures npm caching

2. **Build & Test** ⚙️
   - Installs dependencies using `npm i`
   - Builds the backend application using `npm run build`
   - Runs backend unit tests using `npm test`



## Backend CD Workflow 🚀

The backend CD workflow runs on pull requests to the main branch.

### Steps:
1. **Build Phase** 🏗️
   - Logs into Docker Hub
   - Installs dependencies
   - Builds the backend
   - Builds and publishes Docker image

2. **Deploy Phase** 📦
   - Runs on EC2 instance
   - Pulls the latest Docker image
   - Sets up environment variables
   - Deploys the container


## Environment Variables 🔐

The following environment variables are required for deployment, which are stored in GitHub Secrets and Variables:
- `PORT`
- `MONGO_DB_STRING`
- `GEOCODE_URL`
- `OPEN_ROUTE_KEY`
- `ISOCHRONE_URL`
- `CLOUDFLARE_ACCOUNT_ID`
- `CLOUDFLARE_ACCESS_KEY`
- `CLOUDFLARE_SECRET_KEY`
- `CLOUDFLARE_BUCKET_NAME`
- `FIREBASE_ID`
- `FIREBASE_KEY`

## Docker Configuration 🐳

The backend is containerized using Docker:
- Image name: `${{ secrets.DOCKER_USERNAME }}/c01:latest`
- Container name: `c01`
- Port mapping: Dynamic based on environment variable

3. **Test Phase** ✅
   - Runs integration tests against the deployed backend via Postman
   - Verifies API endpoints

4. **Cleanup Phase** 🧹
   - Stops and removes the container if the tests fail
   - Removes the Docker image if the tests fail
   - Otherwise, the container and image are kept and are deployed


## Frontend CI Workflow 📱

The frontend CI workflow runs on pushes to any branch.

### Steps:
1. **Setup** 🛠️
   - Uses macOS latest
   - Sets up Node.js 18
   - Configures npm caching

2. **Build** ⚙️
   - Installs dependencies
   - Runs Expo prebuild for iOS
   - Uploads build artifacts

## Notes 📝

- All workflows use GitHub Actions
- Backend deployment uses self-hosted runners
- Frontend builds are specifically for iOS platform
- Docker images are stored in Docker Hub
- Environment variables are managed through GitHub Secrets and Variables
