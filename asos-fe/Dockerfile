# Step 1: Use official Node.js image for building and serving the app
FROM node:18-alpine AS dependencies

# Step 2: Set working directory
WORKDIR /app

# Step 3: Copy package.json and package-lock.json for dependency installation
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install --loglevel verbose

# Step 5: Copy the rest of the application files
COPY . .

# Step 6: Expose the port for the Angular development server (default is 4200)
EXPOSE 4200

# Step 7: Start Angular development server (ng serve) with external host binding
CMD ["npm", "run", "start", "--", "--host", "0.0.0.0"]
