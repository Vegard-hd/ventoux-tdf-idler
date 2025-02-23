# Use the official Node.js 22 Alpine image
FROM node:22-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Copy .env file
COPY .env .env

# Command to run the application
CMD ["node", "bin/www"]