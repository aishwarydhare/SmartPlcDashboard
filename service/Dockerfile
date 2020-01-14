FROM node:10
WORKDIR /usr/src/app
COPY package.json package.json
RUN npm install
RUN mkdir log_uploads
COPY app.js app.js
COPY elasticsearch-helpers.js elasticsearch-helpers.js
COPY secrets.json secrets.json
CMD node app.js
