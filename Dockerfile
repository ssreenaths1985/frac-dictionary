FROM node:14.0.0
#ARG NODE_ENV=production

#RUN apt update && apt install -y zip

RUN apt update && apt install -y yarn
RUN apt -y install python3-pip
RUN pip3 install awscli

WORKDIR /app
COPY . .


RUN yarn install
RUN yarn global add babel-cli
RUN yarn global add @babel/preset-env
#RUN yarn global add serve
#RUN yarn build:staging

EXPOSE 3040

CMD [ "yarn", "run", "production" ]

