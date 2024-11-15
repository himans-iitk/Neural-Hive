#==================================================
# Build Layer
FROM node:18.15-slim as build

WORKDIR /app

COPY package*.json ./

COPY pnpm-lock.yaml ./

RUN corepack enable

RUN corepack prepare pnpm@8.5.1 --activate

RUN pnpm run ci

COPY . ./

RUN pnpm run build

#==================================================
# Package install Layer
FROM node:18.15-slim as node_modules

WORKDIR /app

COPY package*.json ./

COPY pnpm-lock.yaml ./

RUN corepack enable

RUN corepack prepare pnpm@8.5.1 --activate

RUN pnpm run ci

#==================================================
# Run Layer
FROM node:18.15-slim

WORKDIR /app

ENV NODE_ENV=production

COPY --from=build /app/dist /app/dist
COPY --from=node_modules /app/node_modules /app/node_modules

CMD ["node", "dist/main"]
