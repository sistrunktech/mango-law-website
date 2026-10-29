# Official checkpoint source adapter

The initial supported publisher is the [Franklin County Sheriff's Office Public Affairs page](https://sheriff.franklincountyohio.gov/About-Us/Public-Affairs-Media-Relations). The exact HTTPS hostname and release path are registered in `official-announcements.ts`; other publishers remain discovery/review candidates. This is county coverage, not a complete Ohio source inventory.

Read-only source verification on October 29, 2026:

- Official index: HTTP 200, 98,058 bytes; three checkpoint article links found in the current first page.
- [October 2 release](https://sheriff.franklincountyohio.gov/About-Us/Public-Affairs-Media-Relations/2026/10-02-Sobriety-Checkpoint-tonight-10-02-2026-in-Jackson-Township): HTTP 200, 58,096 bytes; SHA-256 `29a05901b6c5779ec0c2652689b44a26ee7fba6092d529856157e1c15e5f8e9d`. The original HTML replay produced two distinct Jackson Township locations with an explicit overnight window. This is historical source proof, not a new production map event.
- OSHP's indexed statewide checkpoint releases returned 404 on direct read; no parser or successful-source claim is based on search-cache text.

The adapter requires the actual Granicus article template, a checkpoint title, task-force identity, one absolute event date, a consistent publisher date/year, one explicit checkpoint time window, an explicit township and numbered locations. Missing/conflicting details, unnumbered prose, rescheduling and ambiguous/nonexistent daylight-saving times stay pending. It never fills a date or time from the current clock. Cancellation is accepted only with the same complete event facts. Publisher ordinals give separate stable source fragments for corrections and multiple simultaneous checkpoints.

`fetchOfficialCheckpointIndex()` returns bounded official article URLs and index-fetch evidence. `fetchOfficialCheckpointNotice(url)` returns `{ events, publicationDate, evidence, pendingReason }`. Successful direct fetches retain a SHA-256 and fetch time; a failed HTTP/body/size/timeout check has no successful-fetch evidence. Requests reject redirects, cap HTML at 512 KiB and use a ten-second abort deadline. Each normalized event's factual `rawText` carries the evidence reference without unrelated safe-driving boilerplate. A date-only publisher date stays in `publicationDate`/evidence text; `announcementDate` is null because the database field expects a timestamp.

Integration must preserve pending source failures without overwriting previously verified public facts, upsert by full source fragment, and update linked checkpoint facts/cancellations by stable source identity. Do not collapse distinct source ordinals on county/time alone. Store `evidence.fetchedAt` as `last_checked_at` only after an actual article fetch. Record index health, article-fetch health and publication outcomes separately. Add the test import to the existing test runner when integrating this stack; deployment and scheduled-to-public verification remain separate acceptance steps.

Verification:

```sh
TS_NODE_TRANSPILE_ONLY=1 node --loader ts-node/esm test/checkpointOfficialAnnouncements.test.ts
deno check --no-lock supabase/functions/checkpoint-scraper/official-announcements.ts
```

The test also accepts `MANGO_OFFICIAL_NOTICE_FIXTURE` and `MANGO_OFFICIAL_INDEX_FIXTURE` for replaying locally retained publisher HTML without committing full source pages. No production record, source registry outside the repo, credential, schedule or deployment was changed by this adapter preparation.
