# Use a lightweight Node image
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package files first to leverage Docker layer caching
COPY package*.json ./

# Install dependencies
RUN npm install

# The source code will be mounted via docker-compose volumes, 
# but we copy it here as a fallback/standard practice.
COPY . .

# Expose the API port
EXPOSE 5000

# Run the development script
CMD ["npm", "run", "dev"]