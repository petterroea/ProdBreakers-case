FROM node:lts

WORKDIR /srv/prodBreakers

ENTRYPOINT ["yarn", "start"]