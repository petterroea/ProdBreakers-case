FROM node:lts

WORKDIR /srv/prodBreakers-stream

RUN cd /tmp && wget https://johnvansickle.com/ffmpeg/releases/ffmpeg-release-amd64-static.tar.xz && tar -xvf ffmpeg-release-amd64-static.tar.xz && mv ffmpeg-4.3.1-amd64-static /opt/ffmpeg

ENV NODE_ENV development

ENTRYPOINT ["bash", "-c", "yarn && yarn dev"]