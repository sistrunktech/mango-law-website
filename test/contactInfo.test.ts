import assert from 'node:assert/strict';

import {
  GENERAL_OFFICE_PHONE_DISPLAY,
  GENERAL_OFFICE_PHONE_TEL,
  NICK_DIRECT_PHONE_DISPLAY,
  NICK_DIRECT_PHONE_TEL,
  OFFICE_PHONE_DISPLAY,
  OFFICE_PHONE_TEL,
  PRIMARY_PHONE_DISPLAY,
  PRIMARY_PHONE_TEL,
} from '../src/lib/contactInfo.ts';
import { buildClientConfirmationHtml } from '../supabase/functions/_shared/email/templates.ts';

assert.equal(PRIMARY_PHONE_DISPLAY, '(740) 417-6191');
assert.equal(PRIMARY_PHONE_TEL, '7404176191');
assert.equal(OFFICE_PHONE_DISPLAY, PRIMARY_PHONE_DISPLAY);
assert.equal(OFFICE_PHONE_TEL, PRIMARY_PHONE_TEL);
assert.equal(GENERAL_OFFICE_PHONE_DISPLAY, PRIMARY_PHONE_DISPLAY);
assert.equal(GENERAL_OFFICE_PHONE_TEL, PRIMARY_PHONE_TEL);
assert.equal(NICK_DIRECT_PHONE_DISPLAY, '(740) 602-2155');
assert.equal(NICK_DIRECT_PHONE_TEL, '7406022155');

const clientHtml = buildClientConfirmationHtml(
  'contact',
  {
    title: 'We received your message',
    greetingName: 'Tim',
    intro: 'Thanks for reaching out.',
    details: [{ label: 'Phone', value: '(614) 900-0604' }],
    includeHelpfulLinks: false,
  },
  { theme: 'light', season: 'spring', holiday: false, siteUrl: 'https://mango.law' },
);

assert.ok(clientHtml.includes('Call/Text (740) 417-6191'));
