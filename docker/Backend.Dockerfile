FROM node:lts

WORKDIR /srv/prodBreakers

ENV NODE_ENV development

ENTRYPOINT ["yarn", "dev"]