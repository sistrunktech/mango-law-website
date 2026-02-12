import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const repoRoot = process.cwd();
const structuredDataPath = join(repoRoot, 'src/lib/structured-data.ts');
const contactInfoPath = join(repoRoot, 'src/lib/contactInfo.ts');

const errors = [];

function assert(condition, message) {
  if (!condition) errors.push(message);
}

function readUtf8(path) {
  return readFileSync(path, 'utf8');
}

assert(existsSync(structuredDataPath), `Missing file: ${structuredDataPath}`);
assert(existsSync(contactInfoPath), `Missing file: ${contactInfoPath}`);

if (errors.length) {
  for (const error of errors) console.error(`[check:structured-data] ${error}`);
  process.exit(1);
}

const structured = readUtf8(structuredDataPath);
const contactInfo = readUtf8(contactInfoPath);

const primaryPhoneMatch = contactInfo.match(/export const PRIMARY_PHONE_TEL = '(\d{10})';/);
const canonicalPhoneDigits = primaryPhoneMatch?.[1] || null;

assert(Boolean(primaryPhoneMatch), 'Unable to resolve PRIMARY_PHONE_TEL from src/lib/contactInfo.ts.');
assert(/export const OFFICE_PHONE_TEL = PRIMARY_PHONE_TEL;/.test(contactInfo), 'OFFICE_PHONE_TEL must alias PRIMARY_PHONE_TEL.');

assert(!/INSERT_[A-Z0-9_]+/g.test(structured), 'Placeholder token detected in structured data source.');
assert(/['"]@type['"]:\s*['"]LegalService['"]/.test(structured), 'LegalService node is required.');
assert(/telephone:\s*`\+1\$\{OFFICE_PHONE_TEL\}`/.test(structured), 'LegalService telephone must bind to OFFICE_PHONE_TEL constant.');
assert(/streetAddress:\s*OFFICE_ADDRESS_STREET/.test(structured), 'LegalService streetAddress must bind to OFFICE_ADDRESS_STREET constant.');
assert(!/\battorney\s*:/.test(structured), 'Disallowed legacy property "attorney" detected in structured data.');
assert(!/['"]@type['"]:\s*['"]Attorney['"]/.test(structured), 'Disallowed @type "Attorney" detected; use Person + hasOccupation.');

const requiredKeys = [
  'name:',
  'url:',
  'address:',
  'geo:',
  'areaServed:',
  'openingHoursSpecification:',
  'hasOfferCatalog:',
  'founder:',
];
for (const key of requiredKeys) {
  assert(structured.includes(key), `Missing required LegalService field marker: ${key}`);
}

for (const day of ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']) {
  assert(
    structured.includes(`'https://schema.org/${day}'`) || structured.includes(`\"https://schema.org/${day}\"`),
    `Opening hours must use Schema.org enum URL for ${day}.`,
  );
}

if (canonicalPhoneDigits) {
  const disallowedLegacyPhones = ['7402011444', '740-201-1444', '(740) 201-1444'];
  for (const value of disallowedLegacyPhones) {
    assert(!structured.includes(value), `Detected legacy phone value in structured data source: ${value}`);
  }
}

if (errors.length) {
  for (const error of errors) console.error(`[check:structured-data] ${error}`);
  process.exit(1);
}

console.log('[check:structured-data] PASS');
