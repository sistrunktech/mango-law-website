// Primary public call/text line. This is Nick's cell and the default number shown across the site.
export const PRIMARY_PHONE_DISPLAY = '(740) 602-2155';
export const PRIMARY_PHONE_TEL = '7406022155';

// Deprecated compatibility aliases. New code should import PRIMARY_PHONE_* for
// the default public call/text line and SECONDARY_OFFICE_PHONE_* for the office line.
export const GENERAL_OFFICE_PHONE_DISPLAY = PRIMARY_PHONE_DISPLAY;
export const GENERAL_OFFICE_PHONE_TEL = PRIMARY_PHONE_TEL;

// Back-compat aliases for older call sites that still import OFFICE_PHONE_*.
export const OFFICE_PHONE_DISPLAY = PRIMARY_PHONE_DISPLAY;
export const OFFICE_PHONE_TEL = PRIMARY_PHONE_TEL;

// Back-compat aliases for Nick's direct cell, which is now the primary public call/text line.
export const NICK_DIRECT_PHONE_DISPLAY = PRIMARY_PHONE_DISPLAY;
export const NICK_DIRECT_PHONE_TEL = PRIMARY_PHONE_TEL;

// Secondary office line. Show only where a second line is intentionally labeled.
export const SECONDARY_OFFICE_PHONE_DISPLAY = '(740) 417-6191';
export const SECONDARY_OFFICE_PHONE_TEL = '7404176191';
export const OFFICE_EMAIL = 'office@mango.law';
export const OFFICE_ADDRESS_STREET = '43 S Franklin St';
export const OFFICE_ADDRESS_CITY_STATE_ZIP = 'Delaware, OH 43015';
export const OFFICE_ADDRESS_FULL = '43 S Franklin St, Delaware, OH 43015';
