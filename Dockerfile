FROM mcr.microsoft.com/playwright:v1.41.1-jammy

WORKDIR /tests

COPY . /tests/

RUN npm install

CMD [ "npm", "run", "all-test" ]