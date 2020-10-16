FROM node:lts

WORKDIR /srv/prodBreakers-stream

ENV NODE_ENV development

ENTRYPOINT ["yarn", "dev"]