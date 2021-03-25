FROM node:12.21.0-alpine3.12

# Create app directory
#WORKDIR /Users/mac/Documents/DemoProjects/clear_docker_v1
WORKDIR /home/usr/app

# Install Utilities
RUN apk add --no-cache git

RUN apk add --no-cache bash

#make the logfile directory
RUN mkdir log

ENV LOG_FOLDER /home/usr/app/log


# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
RUN pwd
# Install bower packages
#COPY bower.json ./
#COPY .bowerrc ./

#RUN NPM install ./
# RUN npm config set unsafe-perm true
RUN npm install
RUN npm install -g nodemon
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

ENV PORT=8000 
EXPOSE 8000
#ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.5.1/wait /wait
#RUN chmod +x /wait

CMD [ "nodemon", "app.js"]
