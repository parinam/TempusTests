#
#Tempus tests Dockerfile
#

FROM alpine:3.4

WORKDIR /home/tempus
ADD . /home/tempus/
ENV NODE_PATH=/home/tempus/node_modules


#install node and nightwatch
RUN apk --no-cache --update add  bash \
        # Install nodejs
        nodejs-lts \
        # Clean up obsolete files:
        && rm -rf \
        /tmp/* \
        /root/.npm

RUN npm install nightwatch
EXPOSE 4444

CMD ./node_modules/nightwatch/bin/nightwatch -e default,chrome --retries 2