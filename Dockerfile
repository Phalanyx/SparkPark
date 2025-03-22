# Use the official Node.js image from Docker Hub
FROM node:20-alpine


WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory


COPY backend/package*.json ./

# Install the dependencies defined in package.json
RUN npm install

# Copy the rest of the application code into the container
COPY backend ./

# Expose the port the app will run on (default 3000 for Node.js app)
EXPOSE 4000

# Command to run the application
CMD ["npm", "run", "start"]
