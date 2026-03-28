#!/usr/bin/env bash
set -euo pipefail

BASE_URL="${1:-https://mango.law}"
DATE_UTC="$(date -u +"%Y-%m-%dT%H:%M:%SZ")"

echo "Indexing surface check"
echo "base_url=${BASE_URL}"
echo "checked_at_utc=${DATE_UTC}"
echo

print_head() {
  local url="$1"
  echo "===== ${url}"
  curl -sSIL "${url}" | sed -n '1,12p'
  echo
}

print_head "${BASE_URL}/"
print_head "${BASE_URL}/robots.txt"
print_head "${BASE_URL}/sitemap.xml"

print_head "${BASE_URL}/resources/dui-checkpoints"
print_head "${BASE_URL}/ovi-checkpoints-ohio"
print_head "${BASE_URL}/ovi-dui-defense-delaware-oh"
print_head "${BASE_URL}/criminal-defense-delaware-oh"
print_head "${BASE_URL}/practice-areas"
print_head "${BASE_URL}/blog/understanding-ovi-dui-charges-ohio"
print_head "${BASE_URL}/blog/ohio-ovi-driving-privileges-als"
print_head "${BASE_URL}/blog/drug-possession-charge-ohio-what-to-do-next"

print_head "${BASE_URL}/non-existent-404-check-20260211"

echo "===== Canonical checks"
for p in / /locations /privacy /terms /blog; do
  echo "-- ${p}"
  curl -sS "${BASE_URL}${p}" \
    | tr -d '\n' \
    | sed 's/></>\n</g' \
    | rg -o '<link rel="canonical"[^>]*>|<meta property="og:url"[^>]*>' -n
  echo
done

echo "===== robots.txt body"
curl -sS "${BASE_URL}/robots.txt" | sed -n '1,120p'
echo

echo "===== sitemap signal checks"
curl -sS "${BASE_URL}/sitemap.xml" | rg -n 'https://mango.law' | head -n 10
curl -sS "${BASE_URL}/sitemap.xml" | rg -n 'domestic-violence-lawyer-delaware-oh'
