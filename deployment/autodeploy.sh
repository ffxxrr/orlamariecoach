#!/bin/sh
# Runs on apps3 from cron. Pulls the latest production image and recreates
# the app container only when the image has changed. Install with:
#   */5 * * * * flock -n /tmp/orlamariecoach-autodeploy.lock /opt/deployment/orlamariecoach/autodeploy.sh >> /opt/deployment/orlamariecoach/autodeploy.log 2>&1
set -eu

IMAGE=ghcr.io/ffxxrr/orlamariecoach:latest
cd /opt/deployment/orlamariecoach

before=$(docker image inspect -f '{{.Id}}' "$IMAGE" 2>/dev/null || true)
docker compose pull -q orlamariecoach-app
after=$(docker image inspect -f '{{.Id}}' "$IMAGE")

if [ "$before" != "$after" ]; then
  version=$(docker image inspect -f '{{index .Config.Labels "org.opencontainers.image.version"}}' "$IMAGE")
  docker compose up -d orlamariecoach-app
  # Only prune this project's old images; the server is shared.
  docker image prune -f --filter "label=org.opencontainers.image.source=https://github.com/ffxxrr/orlamariecoach" >/dev/null
  echo "$(date -Iseconds) deployed ${version:-unknown} ($after)"
fi
