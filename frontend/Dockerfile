# Use a lightweight Node image
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Expose Vite's default port
EXPOSE 5173

# Run Vite, specifying --host so it's accessible outside the Docker container
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]