FROM node:lts

WORKDIR /srv/prodBreakers

ENTRYPOINT ["bash", "-c", "yarn && yarn start"]