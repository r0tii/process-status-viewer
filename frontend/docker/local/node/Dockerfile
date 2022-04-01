ARG NODE_VERSION=14
ARG DEBIAN_VERSION=bullseye-slim

FROM node:${NODE_VERSION}-${DEBIAN_VERSION}

ARG APP_HOME=/app

WORKDIR ${APP_HOME}

# Install project dependencies
COPY ./frontend/package*.json ./

RUN npm install


