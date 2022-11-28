ARG IMAGE=node:16.18.0-alpine

### STAGE Restore ###
FROM $IMAGE as base

ENV APPDIR /usr/app

RUN mkdir -p ${APPDIR}

WORKDIR ${APPDIR}

COPY package*.json ./

RUN npm ci

COPY . .

### STAGE Commands ###
FROM base as command

ENTRYPOINT ["npm"]

### STAGE Build ###
FROM base as build

RUN npm run build

### STAGE Artefact ###
FROM $IMAGE

ARG NODE_ENV=production
ARG VERSION="develop"

ENV NODE_ENV=${NODE_ENV}
ENV VERSION=${VERSION}
ENV DD_VERSION=${VERSION}

ENV APPDIR /usr/app

RUN mkdir -p ${APPDIR} && chown node:node ${APPDIR}

WORKDIR ${APPDIR}

USER node

COPY --from=build --chown=node:node ${APPDIR}/package*.json ./

RUN npm ci --only=production

COPY --from=build --chown=node:node ${APPDIR}/dist ./dist

ENTRYPOINT ["npm"]
CMD ["run", "start:prod"]
