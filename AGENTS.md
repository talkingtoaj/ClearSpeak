# ClearSpeak

Deploy stage: 2 (Auto-deploy)

A push to main runs the Cloud Build trigger `clearspeak-deploy` (global, `cloudbuild.yaml`): tests, build, push to Artifact Registry (`us-central1-docker.pkg.dev/lifebalance-nuxt/clearspeak/clearspeak`), a no-traffic `candidate` revision, then traffic and `scripts/smoke.sh`. The service runs as `clearspeak-run`.

Rollback: `gcloud run revisions list --service clearspeak --region us-central1`, then `gcloud run services update-traffic clearspeak --region us-central1 --to-revisions REV=100`. The next push to main moves traffic forward again.
