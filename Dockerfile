# Step 1: Build the React app
FROM node:18 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Step 2: Serve the built app with `serve`
FROM node:18
WORKDIR /app

# Install `serve` to serve static content
RUN npm install -g serve

# Copy built files
COPY --from=build /app/dist /app/dist

# Expose Cloud Run expected port
EXPOSE 8080

# Serve the app on port 8080
CMD ["serve", "-s", "dist", "-l", "8080"]

