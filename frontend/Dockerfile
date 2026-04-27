FROM oven/bun:1.1.38-alpine AS base

# Build-time variables (set in Koyeb as Build environment variables)
ARG NEXT_PUBLIC_URL
ARG NEXT_PUBLIC_SUPABASE_URL
ARG NEXT_PUBLIC_SERVICE_KEY
ARG NEXT_PUBLIC_VALIDATION_KEY

# Make them available to the Next.js build process
ENV NEXT_PUBLIC_URL=$NEXT_PUBLIC_URL \
    NEXT_PUBLIC_SUPABASE_URL=$NEXT_PUBLIC_SUPABASE_URL \
    NEXT_PUBLIC_SERVICE_KEY=$NEXT_PUBLIC_SERVICE_KEY \
    NEXT_PUBLIC_VALIDATION_KEY=$NEXT_PUBLIC_VALIDATION_KEY

WORKDIR /app

FROM base as deps
COPY package.json bun.lock* ./
RUN bun install --frozen-lockfile --production

FROM base as build
COPY package.json bun.lock* ./
RUN bun install --frozen-lockfile
COPY . .
COPY .env* ./
RUN bun run build

FROM base as final
ENV NODE_ENV=production
ENV PORT=243
USER node
COPY package.json ./
COPY --from=deps /app/node_modules ./node_modules
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
EXPOSE 243
CMD ["bun", "start", "--port", "243"]
