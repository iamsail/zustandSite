#!/bin/bash

# Description: Script to determine if Vercel should build the project based on the branch name.
# Vercel ignoreCommand contract:
# - Exit code 1: Proceed with build
# - Exit code 0: Cancel build

echo "Current branch: $VERCEL_GIT_COMMIT_REF"

if [[ "$VERCEL_GIT_COMMIT_REF" == "main" || "$VERCEL_GIT_COMMIT_REF" == "dev" ]]; then
  # Proceed with the build for main and dev branches
  echo "✅ - Build allowed for branch: $VERCEL_GIT_COMMIT_REF"
  exit 1
else
  # Cancel build for all other branches (including feature/*)
  echo "🛑 - Build cancelled for branch: $VERCEL_GIT_COMMIT_REF"
  exit 0
fi
