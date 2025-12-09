// This script generates SQL INSERT statements that can be run via MCP tool
// to import checkpoint data

interface CheckpointRecord {
  county: string;
  city: string;
  location: string;
  time: string;
}

const csvData: CheckpointRecord[] = [
  {"county":"Mahoning","city":"Boardman","location":"Heads up! An OVI checkpoint is planned near 1032 Boardman Canfield Road in Boardman, announced by the Mahoning County OVI Task Force and the Ohio State Highway Patrol.","time":"Friday, December 5, 2025 | 10 PM to 2 AM"},
  {"county":"Summit","city":"","location":"Local law enforcement is planning sobriety checkpoints the night before Thanksgiving.","time":"Wednesday, November 26, 2025 | Late Night"},
  {"county":"Butler","city":"Ross Township","location":"The Butler County OVI Task Force will implement an impaired driving checkpoint tonight at midnight on Ohio State Route 128, located in the 3300 block of Hamilton-Cleves Road adjacent to Ross High School.","time":"Wednesday, November 26, 2025 | 8 PM to 2 AM"},
  {"county":"Stark","city":"Louisville","location":"OVI Checkpoint near the 4400 block of Louisville Street NE in Louisville, Ohio (close to the downtown Louisville area and just a short drive from State Route 44).","time":"Friday, November 14, 2025 | 6 PM to 8:30 PM"},
  {"county":"Stark","city":"Osnaburg","location":"OVI Checkpoint in the 200 block of North Wood Street in East Canton, located in the Osnaburg area (right by the East Canton Village center and close to Route 172).","time":"Friday, November 14, 2025 | 8:30 PM to 11 PM"},
];

// Generate SQL for first 5 records as a test
console.log('Sample SQL INSERT statements for first 5 records:\n');

for (const record of csvData) {
  const city = record.city || 'Unknown';
  const title = `OVI Checkpoint - ${city !== 'Unknown' ? city + ', ' : ''}${record.county} County`;

  console.log(`INSERT INTO dui_checkpoints (
    title, location_county, location_city, location_address, description,
    start_date, end_date, status, source_name, source_type, is_verified
  ) VALUES (
    '${title.replace(/'/g, "''")}',
    '${record.county}',
    ${city !== 'Unknown' ? `'${city.replace(/'/g, "''")}'` : 'NULL'},
    '${record.county} County, Ohio',
    '${record.location.replace(/'/g, "''")}',
    '2025-12-05 22:00:00-05',
    '2025-12-06 02:00:00-05',
    'upcoming',
    'CSV Import',
    'manual',
    true
  );\n`);
}

console.log('\nGenerate full import batch? (Y/n)');
