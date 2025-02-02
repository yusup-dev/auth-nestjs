FROM node:20-alpine as builder

ENV NODE_ENV=build

USER node
WORKDIR /home/node

COPY --chown=node:node . . 

RUN npm ci 

RUN npx prisma generate \
    && npm run build \
    && ls -l ./dist \
    && npm prune --omit=dev

FROM node:20-alpine

ENV NODE_ENV=production

USER node
WORKDIR /home/node

COPY --from=builder --chown=node:node /home/node/package*.json ./ 
COPY --from=builder --chown=node:node /home/node/node_modules/ ./node_modules/
COPY --from=builder --chown=node:node /home/node/dist/ ./dist/

CMD ["node", "dist/src/main.js"]
