# Use Node.js as base
FROM node:20 AS builder
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy all source code
COPY . .

# Build the Next.js app
RUN npm run build

# Use minimal image for running the app
FROM node:20
WORKDIR /app

# Copy built files
COPY --from=builder /app ./

# Expose the port Next.js runs on
EXPOSE 3000

# Start the Next.js server
CMD ["npm", "run", "start"]
