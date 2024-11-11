# Start with the official Node.js base image
FROM node:20.18

# Label the image
LABEL authors="WaleedSaleh"

# Set working directory in the container
WORKDIR /app

# Install app dependencies by copying package.json and package-lock.json
COPY package*.json ./
RUN npm install

# Install TypeORM globally
RUN npm install -g typeorm

# Copy the rest of the application
COPY . .

# Build the application
RUN npm run build

# Make the entrypoint script executable
RUN chmod +x entrypoint.sh

# Copy and set permissions for the entrypoint script

# Declare the application's port
ARG APP_PORT=3000
EXPOSE ${APP_PORT}

#ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
# Command to start the application
CMD ["npm", "run", "serve"]
