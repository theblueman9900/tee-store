# Use Node.js base image
FROM node:18.18-alpine AS base

# Install pnpm globally in the base image
RUN npm install -g pnpm

# Builder stage
FROM base AS builder

WORKDIR /home/node/app

# Copy only the files required for dependency installation
COPY package.json pnpm-lock.yaml ./

# Install dependencies and build the project
RUN pnpm install
COPY . .

RUN pnpm build

# Runtime stage
FROM base AS runtime

ENV NODE_ENV=production

WORKDIR /home/node/app

# Copy only the necessary files for production
COPY package.json pnpm-lock.yaml ./

# Install production dependencies
RUN pnpm install --prod

# Copy the built application from the builder stage
COPY --from=builder /home/node/app/.next ./.next
COPY --from=builder /home/node/app/public ./public
COPY --from=builder /home/node/app/next.config.js ./next.config.js

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["pnpm", "start"]

