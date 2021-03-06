FROM node:8.2.1

MAINTAINER Oleg Shalygin <oshalygin@gmail.com>

ARG version

LABEL version=$version
LABEL description="Merchant dashboard built on NodeJs, React, Redux, Express"

ENV PORT=8080

COPY . /wwwroot
WORKDIR /wwwroot
EXPOSE $PORT

RUN npm install
RUN npm run build

ENTRYPOINT  ["npm", "run", "production"]
