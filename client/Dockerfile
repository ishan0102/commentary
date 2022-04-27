FROM node:16.14.2-alpine

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install --silent

# Fix node_modules permissions
RUN mkdir -p node_modules/.cache && chmod -R 777 node_modules/.cache

# Copy app source code
COPY . .

# Expose port
EXPOSE 3000:3000

CMD [ "npm", "start" ]