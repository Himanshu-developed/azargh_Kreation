# Base image
FROM node:18

# Create app directory
WORKDIR /app
RUN apt-get update && apt-get install -y netcat
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./


# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

# Creates a "dist" folder with the production build
RUN npm run build

# Start the server using the production build
CMD [ "node", "dist/src/main.js" ]
