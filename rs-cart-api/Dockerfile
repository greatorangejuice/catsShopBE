FROM node:14-alpine AS base
#RUN curl -sfL https://install.goreleaser.com/github.com/tj/node-prune.sh | bash -s -- -b /usr/local/bin
WORKDIR /app
COPY package*.json ./
#RUN npm install
RUN  npm ci && npm cache clean --force
# BUILD
WORKDIR /app
COPY . .
RUN npm run build
RUN npm prune --production
# run node prune
#RUN /usr/local/bin/node-prune

# remove unused dependencies
RUN rm -rf node_modules/rxjs/src/
RUN rm -rf node_modules/rxjs/bundles/
RUN rm -rf node_modules/rxjs/_esm5/
RUN rm -rf node_modules/rxjs/_esm2015/
RUN rm -rf node_modules/swagger-ui-dist/*.map
RUN rm -rf node_modules/couchbase/src/
# Application
FROM node:14-alpine as application

COPY --from=base /app/package*.json ./
COPY --from=base /app/node_modules ./node_modules
#RUN npm install --only=production
#RUN npm install pm2 -g
COPY --from=base /app/dist ./dist

USER node
ENV PORT=8080
EXPOSE 8080

CMD ["node", "dist/main.js"]
