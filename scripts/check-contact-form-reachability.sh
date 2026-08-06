#!/usr/bin/env bash
set -euo pipefail

FUNCTION_URL="${CONTACT_FORM_FUNCTION_URL:-https://rgucewewminsevbjgcad.supabase.co/functions/v1/submit-contact}"
REQUEST_ORIGIN="${CONTACT_FORM_ORIGIN:-https://mango.law}"
CHECK_DIR="$(mktemp -d)"
trap 'rm -rf "${CHECK_DIR}"' EXIT

if ! command -v curl >/dev/null 2>&1; then
  echo "curl is required for the contact-form reachability check." >&2
  exit 1
fi

options_status="$({
  curl -sS -o "${CHECK_DIR}/options-body" -w '%{http_code}' \
    -X OPTIONS "${FUNCTION_URL}" \
    -H "Origin: ${REQUEST_ORIGIN}" \
    -H 'Access-Control-Request-Method: POST' \
    -H 'Access-Control-Request-Headers: authorization,apikey,content-type,x-client-info'
} || true)"

if [[ "${options_status}" != "200" && "${options_status}" != "204" ]]; then
  echo "submit-contact CORS preflight failed with HTTP ${options_status}." >&2
  exit 1
fi

invalid_status="$({
  curl -sS -o "${CHECK_DIR}/invalid-body" -w '%{http_code}' \
    -X POST "${FUNCTION_URL}" \
    -H "Origin: ${REQUEST_ORIGIN}" \
    -H 'Content-Type: application/json' \
    --data '{}'
} || true)"
invalid_body="$(<"${CHECK_DIR}/invalid-body")"

if [[ "${invalid_status}" != "400" || "${invalid_body}" != *"Missing required fields"* ]]; then
  echo "submit-contact validation probe returned HTTP ${invalid_status}: ${invalid_body}" >&2
  exit 1
fi

echo "submit-contact reachability PASS"
echo "origin=${REQUEST_ORIGIN}"
echo "preflight_status=${options_status}"
echo "validation_status=${invalid_status}"
echo "No lead was created and no email was sent."
