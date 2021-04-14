FROM node:14-slim

# Create and change to the app directory.
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure both package.json AND package-lock.json are copied.
# Copying this separately prevents re-running npm install on every code change.
COPY package*.json ./

RUN npm install -g serve

RUN npm install --only=production

# Copy local code to the container image.
COPY . ./

RUN npm run build:production
EXPOSE 8080

# Run the web service on container startup.
# CMD [ "npm", "start" ]
CMD ["serve", "-s", "-l", "8080", "./build"]