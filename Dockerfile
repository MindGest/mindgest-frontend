FROM node:18

LABEL MAINTAINER="Pedro Rodrigues <pedror@student.dei.uc.pt>"
LABEL VERSION="0.1.0"

RUN apt-get update -y
RUN apt-get install curl -y

WORKDIR /usr/src/mindgest

COPY ./package*.json ./ 

RUN npm install -g npm --silent
RUN npm install --silent

COPY . .

EXPOSE 4173

RUN npm run build
CMD npm run preview  -- --host



