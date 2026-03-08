FROM node:22-slim

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

HEALTHCHECK --interval=30s --timeout=10s --start-period=15s \
  CMD node -e "require('http').get('http://localhost:'+process.env.PORT+'/', r => r.statusCode===200?process.exit(0):process.exit(1)).on('error',()=>process.exit(1))"

CMD ["node", "scripts/start.mjs"]
