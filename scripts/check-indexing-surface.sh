#!/usr/bin/env bash
set -euo pipefail

BASE_URL="${1:-https://mango.law}"
CANONICAL_ORIGIN="${CANONICAL_ORIGIN:-https://mango.law}"
DATE_UTC="$(date -u +"%Y-%m-%dT%H:%M:%SZ")"

echo "Indexing surface check"
echo "base_url=${BASE_URL}"
echo "canonical_origin=${CANONICAL_ORIGIN}"
echo "checked_at_utc=${DATE_UTC}"
echo

status_code() {
  local url="$1"
  curl -sS -o /dev/null -w '%{http_code}' "${url}"
}

assert_status() {
  local path="$1"
  local expected="$2"
  local url="${BASE_URL}${path}"
  local actual

  actual="$(status_code "${url}")"
  echo "status ${actual} ${url}"

  if [[ "${actual}" != "${expected}" ]]; then
    echo "Expected ${url} to return ${expected}; got ${actual}." >&2
    exit 1
  fi
}

assert_body_contains() {
  local path="$1"
  local pattern="$2"
  local url="${BASE_URL}${path}"
  local body

  body="$(curl -fsSL "${url}")"

  if ! rg -q "${pattern}" <<< "${body}"; then
    echo "Expected ${url} body to contain pattern: ${pattern}" >&2
    exit 1
  fi

  echo "body ok ${url} :: ${pattern}"
}

assert_canonical() {
  local path="$1"
  local expected="${CANONICAL_ORIGIN}${path}"
  if [[ "${path}" == "/" ]]; then
    expected="${CANONICAL_ORIGIN}"
  fi

  local body
  body="$(curl -fsSL "${BASE_URL}${path}" | tr -d '\n' | sed 's/></>\n</g')"

  if ! rg -q "<link rel=\"canonical\" href=\"${expected}\"" <<< "${body}"; then
    echo "Expected ${BASE_URL}${path} to include canonical ${expected}." >&2
    exit 1
  fi

  if ! rg -q "<meta property=\"og:url\" content=\"${expected}\"" <<< "${body}"; then
    echo "Expected ${BASE_URL}${path} to include og:url ${expected}." >&2
    exit 1
  fi

  echo "canonical ok ${BASE_URL}${path}"
}

assert_redirect() {
  local source_path="$1"
  local expected_path="$2"
  local url="${BASE_URL}${source_path}"
  local headers

  headers="$(curl -sSI "${url}" | tr -d '\r')"

  echo "===== Redirect assertion ${url}"
  echo "${headers}" | sed -n '1,12p'
  echo

  if ! echo "${headers}" | rg -q '^HTTP/[0-9.]+ 30[178]'; then
    echo "Expected ${url} to return a permanent redirect status." >&2
    exit 1
  fi

  if ! echo "${headers}" | rg -qi "^location: .*${expected_path}$"; then
    echo "Expected ${url} to include Location ending in ${expected_path}." >&2
    exit 1
  fi
}

assert_status "/" "200"
assert_status "/robots.txt" "200"
assert_status "/sitemap.xml" "200"
assert_status "/llms.txt" "200"

assert_status "/resources/dui-checkpoints" "200"
assert_status "/ovi-checkpoints-ohio" "200"
assert_status "/ovi-dui-defense-delaware-oh" "200"
assert_status "/criminal-defense-delaware-oh" "200"
assert_status "/practice-areas" "200"
assert_status "/contact" "200"
assert_status "/blog" "200"
assert_status "/blog/understanding-ovi-dui-charges-ohio" "200"
assert_status "/blog/ohio-ovi-driving-privileges-als" "200"
assert_status "/blog/drug-possession-charge-ohio-what-to-do-next" "200"
assert_status "/blog/no-contact-bond-terms-domestic-violence-ohio" "200"
assert_status "/blog/cdl-out-of-state-driver-ovi-ohio" "200"
assert_status "/blog/summons-vs-arrest-delaware-county-ohio" "200"

assert_redirect "/delaware-ohio-ovi-lawyer" "/ovi-dui-defense-delaware-oh"

assert_status "/non-existent-404-check-20260211" "404"

echo "===== Canonical checks"
for p in / /locations /privacy /terms /blog /resources/dui-checkpoints /ovi-dui-defense-delaware-oh; do
  assert_canonical "${p}"
done

echo "===== robots.txt checks"
assert_body_contains "/robots.txt" '^Allow: /$'
assert_body_contains "/robots.txt" '^Disallow: /admin'
assert_body_contains "/robots.txt" '^Sitemap: https://mango\.law/sitemap\.xml$'

echo "===== sitemap signal checks"
assert_body_contains "/sitemap.xml" '<loc>https://mango\.law/resources/dui-checkpoints</loc>'
assert_body_contains "/sitemap.xml" '<loc>https://mango\.law/llms\.txt</loc>'
assert_body_contains "/sitemap.xml" '<loc>https://mango\.law/ovi-dui-defense-delaware-oh</loc>'
assert_body_contains "/sitemap.xml" '<loc>https://mango\.law/motion-to-suppress-ovi-ohio</loc>'
assert_body_contains "/sitemap.xml" '<loc>https://mango\.law/domestic-violence-lawyer-delaware-oh</loc>'
assert_body_contains "/sitemap.xml" '<loc>https://mango\.law/blog/no-contact-bond-terms-domestic-violence-ohio</loc>'
assert_body_contains "/sitemap.xml" '<loc>https://mango\.law/blog/cdl-out-of-state-driver-ovi-ohio</loc>'
assert_body_contains "/sitemap.xml" '<loc>https://mango\.law/blog/summons-vs-arrest-delaware-county-ohio</loc>'

echo "===== llms.txt checks"
assert_body_contains "/llms.txt" '^# Mango Law LLC$'
assert_body_contains "/llms.txt" 'https://mango\.law/resources/dui-checkpoints'
assert_body_contains "/llms.txt" '## AI and LLM Use Policy'

echo
echo "Indexing surface check passed."
