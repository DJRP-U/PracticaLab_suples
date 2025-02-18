# Use the official Node.js image as the base image
FROM node:20

# Define arguments that can be passed during the build
ARG NEXT_PUBLIC_API_HOST
ARG NEXT_PUBLIC_API_PORT

# Set the environment variable
ENV NEXT_PUBLIC_API_HOST=${NEXT_PUBLIC_API_HOST}
ENV NEXT_PUBLIC_API_PORT=${NEXT_PUBLIC_API_PORT}

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Create a .env file
RUN echo "NEXT_PUBLIC_API_HOST=${NEXT_PUBLIC_API_HOST}" > .env
RUN echo "NEXT_PUBLIC_API_PORT=${NEXT_PUBLIC_API_PORT}" >> .env

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Start the Next.js application
CMD ["npm", "start"]