# Changelog

## 2025-12-04

### Infrastructure & Backend
- Initialize Mango Law website scaffold (React/Vite/TS, Tailwind brand tokens, routing, components, contact form stub).
- Add CI workflow (build) and PR template.
- Expand `.env.example` with deployment-related variables and chat/email keys.

### Database Schema
- Deploy `contact_leads` table with RLS policies (service_role INSERT/SELECT only).
- Deploy `chat_leads` table with conversation context support and RLS policies.
- Deploy `rate_limit_requests` table for API rate limiting with automatic cleanup.
- Add performance indexes on email, created_at, and rate limiting lookup.

### Edge Functions
- Deploy `submit-contact` function with comprehensive validation, honeypot protection, and email notifications.
- Deploy `chat-intake` function with similar features for chat widget integration.

### Security Enhancements
- **Rate Limiting**: Database-backed rate limiting (10 req/min for contact, 20 req/min for chat) with HTTP 429 responses.
- **Security Headers**: All Edge Function responses include CSP, HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy.
- **Structured Logging**: JSON-formatted logs with timestamp, level, endpoint, IP, user agent, status, duration, and error details.
- **Input Validation**: Email/phone format validation, required field checks, spam protection via honeypot.
- **CORS Protection**: Origin validation against ORIGIN_ALLOWLIST with proper preflight handling.

### Documentation
- Update `docs/OPERATIONS.md` with detailed security features and deployment status.
- Document rate limiting configuration and security header implementation.
