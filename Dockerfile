FROM node:22-bookworm-slim AS build

WORKDIR /app
ENV CI=true

RUN corepack enable

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

COPY app ./app
COPY public ./public
COPY scripts ./scripts
COPY next.config.mjs ./

RUN pnpm build
RUN pnpm prune --prod

FROM node:22-bookworm-slim AS runtime

WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

COPY --from=build --chown=node:node /app/node_modules ./node_modules
COPY --from=build --chown=node:node /app/dist ./dist
COPY --chown=node:node package.json ./
COPY --chown=node:node server ./server

USER node
EXPOSE 3000

CMD ["node", "server/coolify.mjs"]
