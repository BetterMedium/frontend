FROM node:18-alpine AS base

FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package*.json ./
RUN yarn

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1

RUN yarn build

FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Set environment variables from Docker ENV
ARG NEXT_PUBLIC_WC_PROJECT_ID
ARG NEXT_PUBLIC_CDP_API_KEY

ENV NEXT_PUBLIC_WC_PROJECT_ID=${NEXT_PUBLIC_WC_PROJECT_ID}
ENV NEXT_PUBLIC_CDP_API_KEY=${NEXT_PUBLIC_CDP_API_KEY}

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["npm", "start"]
