FROM timbru31/java-node

WORKDIR /service

RUN npm install @openapitools/openapi-generator-cli -g

COPY src src
COPY tools tools
COPY package.json package-lock.json tsconfig.json serverless.yaml tsoa.json /service/.

RUN npm i

EXPOSE 3000

CMD npm run dev:server