# Use a lightweight Node base image
FROM node:20-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy package management files first for better caching
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy the rest of your application code
COPY . .

# Expose the application port (e.g., 3000)
EXPOSE 3000

# Use 'node' user instead of root for security
USER node

# Start the application
CMD ["node", "index.js"]