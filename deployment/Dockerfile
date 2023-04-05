FROM node:latest
RUN apt-get update && apt-get install bash
ENV PATH /var/www/html/node_modules/.bin:/var/www/html/:$PATH
WORKDIR /var/www/html/