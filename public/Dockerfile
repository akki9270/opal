# pull official base image
FROM node:14.16.0-alpine3.10

# set working directory
WORKDIR /home/usr/app

# add `/app/node_modules/.bin` to $PATH
# ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
# COPY package-lock.json ./
RUN npm install
RUN npm install react-scripts@4.0.2 -g

# add app
COPY . ./

EXPOSE 3000
# start app
CMD ["npm", "start"]