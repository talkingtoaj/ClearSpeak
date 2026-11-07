# Pinned patch version: a rebuild never changes Node under us. Bump it on purpose.
FROM node:22.23.4-slim

# Create non-root user for security
RUN addgroup --system appgroup && adduser --system --ingroup appgroup appuser

WORKDIR /app

# Copy all app files
COPY package.json ./
COPY scripts/ ./scripts/
COPY src/ ./src/
COPY icons/ ./icons/
COPY index.html ./
COPY styles.css ./

RUN chown -R appuser:appgroup /app

USER appuser

ENV PORT=8080
EXPOSE 8080

# No HEALTHCHECK: Cloud Run ignores it. The startup probe on /health is set in cloudbuild.yaml.

CMD ["node", "scripts/start.mjs"]
