FROM node:14-alpine

COPY clients ./clients

WORKDIR /runner

COPY src ./src
COPY package.json package-lock.json tsconfig.json .mocharc.js ./

RUN npm i

## Add the wait script to the image
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.10.0/wait /wait
RUN chmod +x /wait

CMD /wait && npm run test:blackbox:run