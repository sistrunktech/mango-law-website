import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseKey = process.env.SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
const mapboxToken = process.env.VITE_MAPBOX_PUBLIC_TOKEN || process.env.MAPBOX_PUBLIC_TOKEN;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials!');
  console.error('SUPABASE_URL:', supabaseUrl);
  console.error('SERVICE_ROLE_KEY:', supabaseKey ? 'present' : 'missing');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

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
  {"county":"Mahoning","city":"Youngstown","location":"The OVI Task Force and Ohio State Highway Patrol will conduct a sobriety checkpoint near 483 N Canfield Niles Road. Officers will be monitoring the area closely to reduce impaired driving and promote road safety.","time":"Friday, November 7, 2025 | 10 PM to 2 AM"},
  {"county":"Hamilton","city":"Blue Ash","location":"An OVI checkpoint will be held in the 5100 block of Pfeiffer Road, Blue Ash, by the OVI Task Force and Ohio State Highway Patrol. Officers will be checking for impaired drivers to keep the community safe.","time":"Friday, November 7, 2025 | 8 PM to 10 PM"},
  {"county":"Belmont","city":"Bridgeport","location":"OVI Checkpoint on state Route 7 and Aetna Street in Belmont County.","time":"Friday, October 31, 2025 | 10 PM to 1 AM"},
  {"county":"Franklin","city":"Columbus","location":"OVI checkpoint set up at S High St & Dolby Dr in Columbus, OH 43207.","time":"Friday, October 24, 2025 | 8 PM to 12:30 AM"},
  {"county":"Hamilton","city":"Sharonville","location":"Another OVI checkpoint in the 11900 block of Lebanon Rd (US-42) in Sharonville.","time":"Friday, October 24, 2025 | 8:30 PM to 10:30 PM"},
  {"county":"Scioto","city":"Washington Township","location":"OVI checkpoint also active on State Route 73 and Dry Run Rd in Scioto County.","time":"Friday, October 24, 2025 | 4 PM to 6 PM"},
  {"county":"Mahoning","city":"Youngstown","location":"Glenwood Ave & Playhouse Ln Youngstown, OH 44511, USA","time":"Saturday, October 18, 2025 | 12:30 AM to 3 AM"},
  {"county":"Mahoning","city":"Youngstown","location":"Market St & Hilton Ave Youngstown, OH 44507, USA","time":"Friday, October 17, 2025 | 10 PM to 2 AM"},
  {"county":"Stark","city":"Alliance","location":"An OVI checkpoint has been set up in the 600 block of S. Union Avenue, Alliance, near Glamorgan Street and E. Milton Street. Drivers in the downtown Alliance area should expect traffic delays and drive carefully.","time":"Friday, October 17, 2025 | 6 PM to 8:30 PM"},
  {"county":"Stark","city":"Alliance","location":"Police have also placed another OVI checkpoint in the 2200 block of W. State Street, Alliance, close to Western Reserve Road and Alliance Community Hospital. Motorists traveling west of Main Street are advised to use extra caution tonight.","time":"Friday, October 17, 2025 | 8:30 PM to 11 PM"},
  {"county":"Franklin","city":"Columbus","location":"An OVI checkpoint will be conducted on East Broad Street, east of Rosehill Road, Columbus, Ohio.","time":"Friday, October 10, 2025 | 8 PM to 1 AM"},
  {"county":"Franklin","city":"Columbus","location":"Another OVI checkpoint will take place on East Main Street, east of McNaughten Road, Columbus, Ohio.","time":"Friday, October 10, 2025 | 8 PM to 1 AM"},
  {"county":"Hamilton","city":"Norwood","location":"An OVI checkpoint will be set up in the 2000 block of Ross Avenue in Norwood, near the intersection of Ross Avenue and Section Avenue, close to Norwood Plaza and Xavier University.","time":"Friday, October 3, 2025 | 8 PM to 10 PM"},
  {"county":"Cuyahoga","city":"Brook Park","location":"An OVI checkpoint is scheduled on Brookpark Road, with law enforcement monitoring for impaired driving.","time":"Tuesday, September 23, 2025 | 7 PM to 11 PM"},
  {"county":"Cuyahoga","city":"Solon","location":"Sobriety checkpoint in the vicinity of Harper Road.","time":"Friday, September 19, 2025"},
  {"county":"Sandusky","city":"Fremont","location":"Rawson Avenue between North Street and the US 6 Fremont Bypass.","time":"Friday, September 19, 2025 | 8 PM to 10 PM"},
  {"county":"Butler","city":"Oxford","location":"OVI Checkpoint location is in the City of Oxford on S. Locust St. in the 500 Block.","time":"Friday, September 19, 2025 | 7 PM to 10 PM"},
  {"county":"Hamilton","city":"Mariemont","location":"OVI Checkpoint in the 6900 block of Wooster Pike (US-50) in Mariemont.","time":"Friday, September 19, 2025 | 8 PM to 10 PM"},
  {"county":"Hocking","city":"Logan","location":"OVI Checkpoint in West Hunter Street between Betty and Riff avenues.","time":"Friday, September 19, 2025 | 6 PM to 11 PM"},
  {"county":"Cuyahoga","city":"Cleveland","location":"OVI Block near Kinsman Rd & E 132nd St Cleveland.","time":"Wednesday, September 17, 2025 | 6 PM to 11 PM"},
  {"county":"Stark","city":"Canton","location":"OVI checkpoint at 1701 Mahoning Road NE Canton, OH 44705, USA.","time":"Saturday, September 13, 2025, From 7 PM to 11 PM"},
  {"county":"Muskingum","city":"Zanesville","location":"Drivers in Zanesville should be aware—an OVI checkpoint is planned for West Main Street, with both the Zanesville Police Department and the Muskingum County Sheriff's Office helping out.","time":"Friday, September 12, 2025, From 7 PM to 10 PM"},
  {"county":"Butler","city":"West Chester","location":"OVI Checkpoint in the southbound lane on Ohio 747/Princeton-Glendale Road at Premier Way in West Chester Twp.","time":"Friday, September 12, 2025, From 7:15 PM to 10 PM"},
  {"county":"Cuyahoga","city":"Parma","location":"OVI Checkpoint in the 5900 block of State Road.","time":"Friday, September 12, 2025, From 7 PM to 12 AM"},
  {"county":"Warren","city":"Franklin","location":"OVI checkpoint on state Route 73 in Warren County.","time":"Friday, September 12, 2025, From 9 PM to 11 PM"},
  {"county":"Hamilton","city":"Colerain Township","location":"OVI Block in the 3600 block of Blue Rock Rd. in Colerain Township.","time":"Friday, August 29, 2025 | 8:00 PM – 11:00 PM"},
  {"county":"Ross","city":"Chillicothe","location":"OVI Checkpoint scheduled tonight on Western Avenue in Chillicothe.","time":"Friday, August 29, 2025 | 7:00 PM – 9:00 PM"},
  {"county":"Butler","city":"Hamilton","location":"OVI Checkpoint at 2210 S. Erie Blvd. (SR 4). The northbound lane will be checked.","time":"Friday, August 22, 2025 From 10 PM to 2 AM"},
  {"county":"Fairfield","city":"Lancaster","location":"OVI Checkpoint in Lancaster: East Main Street near Graceland Drive.","time":"Friday, August 22, 2025 From 8 PM to 12 AM"},
  {"county":"Huron","city":"Norwalk","location":"OVI Checkpoint in Norwalk: Milan Avenue near the intersection with Lais Road.","time":"Friday, August 22, 2025 From 7 PM to 9 PM"},
  {"county":"Lucas","city":"Toledo","location":"OVI Checkpoint at 2854 N Holland Sylvania Road, Toledo, OH 43615 – law enforcement will be conducting an OVI sobriety checkpoint at this location to monitor drivers for signs of impairment. Officers will be screening vehicles traveling along N Holland Sylvania Road, a busy corridor in Toledo with heavy evening traffic.","time":"Friday, August 22, 2025 From 8 PM to 2 AM"},
  {"county":"Lucas","city":"Toledo","location":"OVI Checkpoint at 5650 Central Avenue, Toledo, OH 43615 – another OVI checkpoint will be set up along Central Avenue at this address. This stretch of roadway is a high-traffic area, making it an effective location for enforcement aimed at keeping impaired drivers off the road.","time":"Friday, August 22, 2025 From 8 PM to 2 AM"},
  {"county":"Knox","city":"Mount Vernon","location":"OVI Checkpoint on State Route 13/South Main Street.","time":"Friday, August 15, 2025 – 8 PM to 10 PM"},
  {"county":"Hamilton","city":"Blue Ash","location":"OVI Checkpoint in 10300 block of Kenwood Rd. (near Pfeiffer Rd.).","time":"Friday, August 15, 2025 – 7:30 PM to 9:30 PM"},
  {"county":"Hamilton","city":"Blue Ash","location":"OVI Checkpoint in 5100 block of Pfeiffer Rd. (near Hickory Point Dr.).","time":"Friday, August 15, 2025 – 10:00 PM to 12:00 AM"},
  {"county":"Butler","city":"Fairfield","location":"OVI Checkpoint on State Route 4 near Muhlhauser Rd.","time":"Friday, August 15, 2025 – 9:00 PM to 11:00 PM"},
  {"county":"Stark","city":"Nimishillen","location":"OVI Checkpoint in the 5700 block of Louisville Street NE in Nimishillen Township.","time":"Friday, August 15, 2025 – 6:00 PM to 8:30 PM"},
  {"county":"Belmont","city":"Bridgeport","location":"OVI Checkpoint at State Route 7 at Aetna Street in Belmont County.","time":"Friday, August 15, 2025 – 10:00 PM to 2:00 AM"},
  {"county":"Montgomery","city":"Dayton","location":"OVI Checkpoint at 2600 block of Harshman Road Dayton, OH 45424.","time":"Friday, August 15, 2025 – 6:45 PM to 11:45 PM"},
  {"county":"Montgomery","city":"Dayton","location":"OVI Checkpoint at 600 block of Woodman Drive Riverside, OH 45431.","time":"Friday, August 15, 2025 – 6:45 PM to 11:45 PM"},
  {"county":"Ottawa","city":"Port Clinton","location":"OVI Checkpoint at Perry Street Port Clinton, OH 43452.","time":"Thursday, August 14, 2025 – 8 PM to 10 PM"},
  {"county":"Stark","city":"Nimishillen Township","location":"OVI Checkpoint in the 7300 block of Easton Street NE.","time":"August 9, 2025 – 6:00 PM to 8:30 PM"},
  {"county":"Stark","city":"Nimishillen Township","location":"OVI Checkpoint in the 7300 block of Ravenna Avenue NE.","time":"August 9, 2025 – 8:30 PM to 11 PM"},
  {"county":"Marion","city":"Marion","location":"OVI Checkpoint on Mount Vernon Avenue, east of Forest Lawn Drive in Marion.","time":"August 8, 2025 From 9 PM to 11 PM"},
  {"county":"Summit","city":"Check back for updates","location":"The exact time and locations of the checkpoints have not yet been released.","time":"Friday, August 8, 2025"},
  {"county":"Wayne","city":"Check back for updates","location":"The exact time and locations of the checkpoints have not yet been released.","time":"Friday, August 8, 2025"},
  {"county":"Darke","city":"Greenville","location":"OVI Checkpoint at State Route 571 in the city of Greenville.","time":"Friday, August 1, 2025 • 8 PM– 10 PM"},
  {"county":"Mahoning","city":"Boardman","location":"OVI Checkpoint at State Route 7 and saturation patrols are monitoring the surrounding area as well.","time":"Saturday, July 26, 2025 — 10:00 PM to 2:00 AM"},
  {"county":"Stark","city":"Sugarcreek","location":"OVI Checkpoint in Sugarcreek.","time":"Saturday, July 26, 2025"},
  {"county":"Trumbull","city":"Champion Township","location":"OVI Checkpoint at Mahoning Avenue.","time":"July 24, 2025 — 6:00 PM to 10:00 PM"},
  {"county":"Logan","city":"Bellefontaine","location":"OVI Checkpoint on South Main Street in Bellefontaine.","time":"Saturday, July 19, 2025 From 8 PM to 10 PM"},
  {"county":"Hancock","city":"Findlay","location":"A DUI checkpoint was active on Tiffin Avenue in Findlay, monitoring traffic from nearby Hancock County neighborhoods.","time":"Friday, July 18, 2025 From 8 PM to 12 AM"},
  {"county":"Hamilton","city":"Woodlawn","location":"Police set up an OVI checkpoint near Wyoming in the 9900 block of Springfield Pike, Woodlawn, OH 45215.","time":"Friday, July 18, 2025 From 7 PM to 10 PM"},
  {"county":"Brown","city":"Mount Orab","location":"An OVI sobriety stop was placed just south of State Route 32 along US 68 in Mount Orab, close to other areas in Brown County.","time":"Friday, July 18, 2025 From 9 PM to 11 PM"},
  {"county":"Franklin","city":"Grove City","location":"OVI Checkpoint on US-62 & Parlin Dr Grove City, OH 43123.","time":"Friday, July 18, 2025 From 8 PM to 1 AM"}
];

// Helper to extract address from location text
function extractAddress(location: string, city: string, county: string): string {
  // Try to extract specific addresses or intersections
  const addressPatterns = [
    /(\d+\s+[NSEW]?\s*[\w\s]+(?:Road|Rd|Street|St|Avenue|Ave|Boulevard|Blvd|Pike|Highway|Hwy|Route|Drive|Dr|Lane|Ln))/i,
    /([\w\s]+(?:Road|Rd|Street|St|Avenue|Ave|Boulevard|Blvd|Pike))\s*(?:&|and)\s*([\w\s]+(?:Road|Rd|Street|St|Avenue|Ave))/i,
    /on\s+([\w\s]+(?:Road|Rd|Street|St|Avenue|Ave|Boulevard|Blvd|Pike|Highway|Route))/i,
    /near\s+(\d+\s+[NSEW]?\s*[\w\s]+(?:Road|Rd|Street|St|Avenue|Ave))/i,
  ];

  for (const pattern of addressPatterns) {
    const match = location.match(pattern);
    if (match) {
      return match[1].trim();
    }
  }

  // Fallback: use city and county
  if (city && city !== 'Check back for updates') {
    return `${city}, ${county} County, Ohio`;
  }

  return `${county} County, Ohio`;
}

// Geocode using Mapbox
async function geocodeAddress(address: string): Promise<{ lat: number; lng: number } | null> {
  if (!mapboxToken) {
    console.warn('No Mapbox token found, skipping geocoding');
    return null;
  }

  try {
    const encodedAddress = encodeURIComponent(address);
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedAddress}.json?access_token=${mapboxToken}&country=us&proximity=-82.9988,39.9612&limit=1`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.features && data.features.length > 0) {
      const [lng, lat] = data.features[0].center;
      console.log(`  ✓ Geocoded: ${address} -> ${lat}, ${lng}`);
      return { lat, lng };
    }

    console.warn(`  ✗ No results for: ${address}`);
    return null;
  } catch (error) {
    console.error(`  ✗ Geocoding error for ${address}:`, error);
    return null;
  }
}

// Parse date/time strings
function parseDateTime(timeStr: string, county: string, city: string): { start: string; end: string } {
  const year = 2025; // All dates are in 2025

  // Handle various formats
  const patterns = [
    // "Friday, December 5, 2025 | 10 PM to 2 AM"
    /(\w+),\s+(\w+)\s+(\d+),\s+(\d+)\s+\|\s+(\d+(?:\:\d+)?)\s*(AM|PM)\s+to\s+(\d+(?:\:\d+)?)\s*(AM|PM)/i,
    // "Friday, August 29, 2025 | 8:00 PM – 11:00 PM" (with special dash)
    /(\w+),\s+(\w+)\s+(\d+),\s+(\d+)\s+\|\s+(\d+(?:\:\d+)?)\s*(AM|PM)\s*[–—-]\s*(\d+(?:\:\d+)?)\s*(AM|PM)/i,
    // "Saturday, September 13, 2025, From 7 PM to 11 PM" (with comma before From)
    /(\w+),\s+(\w+)\s+(\d+),\s+(\d+),\s+From\s+(\d+(?:\:\d+)?)\s*(AM|PM)\s+to\s+(\d+(?:\:\d+)?)\s*(AM|PM)/i,
    // "Friday, August 22, 2025 From 10 PM to 2 AM"
    /(\w+),\s+(\w+)\s+(\d+),\s+(\d+)\s+From\s+(\d+(?:\:\d+)?)\s*(AM|PM)\s+to\s+(\d+(?:\:\d+)?)\s*(AM|PM)/i,
    // "August 9, 2025 – 6:00 PM to 8:30 PM"
    /(\w+)\s+(\d+),\s+(\d+)\s+[–—-]\s+(\d+(?:\:\d+)?)\s*(AM|PM)\s+to\s+(\d+(?:\:\d+)?)\s*(AM|PM)/i,
    // "August 8, 2025 From 9 PM to 11 PM"
    /(\w+)\s+(\d+),\s+(\d+)\s+From\s+(\d+(?:\:\d+)?)\s*(AM|PM)\s+to\s+(\d+(?:\:\d+)?)\s*(AM|PM)/i,
    // "Friday, August 1, 2025 • 8 PM– 10 PM" (with bullet and no space before dash)
    /(\w+),\s+(\w+)\s+(\d+),\s+(\d+)\s+[•·]\s+(\d+(?:\:\d+)?)\s*(AM|PM)[–—-]\s*(\d+(?:\:\d+)?)\s*(AM|PM)/i,
    // "Wednesday, November 26, 2025 | Late Night" (no time)
    /(\w+),\s+(\w+)\s+(\d+),\s+(\d+)\s+\|\s+Late Night/i,
    // "Friday, September 19, 2025" (no time)
    /(\w+),\s+(\w+)\s+(\d+),\s+(\d+)$/i,
    // "Saturday, July 26, 2025" (no time, with day name)
    /(\w+),\s+(\w+)\s+(\d+),\s+(\d+)$/i,
  ];

  const monthMap: Record<string, number> = {
    january: 0, february: 1, march: 2, april: 3, may: 4, june: 5,
    july: 6, august: 7, september: 8, october: 9, november: 10, december: 11
  };

  for (const pattern of patterns) {
    const match = timeStr.match(pattern);
    if (match) {
      let month: number;
      let day: number;
      let startHour: number;
      let startMin = 0;
      let endHour: number;
      let endMin = 0;

      // Check if this is a "Late Night" pattern
      if (timeStr.includes('Late Night')) {
        month = monthMap[match[2].toLowerCase()];
        day = parseInt(match[3]);
        startHour = 22; // 10 PM default for "Late Night"
        endHour = 2; // 2 AM default for "Late Night"
      } else if (match.length === 9) {
        // Full format with day name: "Friday, December 5, 2025 | 10 PM to 2 AM"
        month = monthMap[match[2].toLowerCase()];
        day = parseInt(match[3]);
        const startTime = match[5];
        const startPeriod = match[6];
        const endTime = match[7];
        const endPeriod = match[8];

        if (startTime.includes(':')) {
          const [h, m] = startTime.split(':');
          startHour = parseInt(h);
          startMin = parseInt(m);
        } else {
          startHour = parseInt(startTime);
        }
        if (startPeriod.toUpperCase() === 'PM' && startHour !== 12) startHour += 12;
        if (startPeriod.toUpperCase() === 'AM' && startHour === 12) startHour = 0;

        if (endTime.includes(':')) {
          const [h, m] = endTime.split(':');
          endHour = parseInt(h);
          endMin = parseInt(m);
        } else {
          endHour = parseInt(endTime);
        }
        if (endPeriod.toUpperCase() === 'PM' && endHour !== 12) endHour += 12;
        if (endPeriod.toUpperCase() === 'AM' && endHour === 12) endHour = 0;
      } else if (match.length === 8) {
        // No day name: "August 8, 2025 From 9 PM to 11 PM"
        month = monthMap[match[1].toLowerCase()];
        day = parseInt(match[2]);
        const startTime = match[4];
        const startPeriod = match[5];
        const endTime = match[6];
        const endPeriod = match[7];

        if (startTime.includes(':')) {
          const [h, m] = startTime.split(':');
          startHour = parseInt(h);
          startMin = parseInt(m);
        } else {
          startHour = parseInt(startTime);
        }
        if (startPeriod.toUpperCase() === 'PM' && startHour !== 12) startHour += 12;
        if (startPeriod.toUpperCase() === 'AM' && startHour === 12) startHour = 0;

        if (endTime.includes(':')) {
          const [h, m] = endTime.split(':');
          endHour = parseInt(h);
          endMin = parseInt(m);
        } else {
          endHour = parseInt(endTime);
        }
        if (endPeriod.toUpperCase() === 'PM' && endHour !== 12) endHour += 12;
        if (endPeriod.toUpperCase() === 'AM' && endHour === 12) endHour = 0;
      } else if (match.length === 5) {
        // Date only, no time
        month = monthMap[match[2].toLowerCase()];
        day = parseInt(match[3]);
        startHour = 20; // Default to 8 PM
        endHour = 23; // Default to 11 PM
      } else {
        continue;
      }

      const startDate = new Date(year, month, day, startHour, startMin);
      let endDate = new Date(year, month, day, endHour, endMin);

      // If end time is earlier than start time, it's the next day
      if (endDate <= startDate) {
        endDate = new Date(year, month, day + 1, endHour, endMin);
      }

      return {
        start: startDate.toISOString(),
        end: endDate.toISOString()
      };
    }
  }

  // Fallback: create a default date
  console.warn(`Could not parse date: ${timeStr}`);
  const defaultStart = new Date(2025, 0, 1, 20, 0);
  const defaultEnd = new Date(2025, 0, 1, 23, 0);
  return {
    start: defaultStart.toISOString(),
    end: defaultEnd.toISOString()
  };
}

async function importCheckpoints() {
  console.log('Starting checkpoint import...\n');

  let successCount = 0;
  let failCount = 0;
  const results = [];

  for (const record of csvData) {
    try {
      console.log(`Processing: ${record.county} County - ${record.city || 'Unknown City'}`);

      // Extract address
      const address = extractAddress(record.location, record.city, record.county);
      console.log(`  Address: ${address}`);

      // Geocode
      const coords = await geocodeAddress(address);

      // Parse dates
      const { start, end } = parseDateTime(record.time, record.county, record.city);

      // Generate title
      const cityPart = record.city && record.city !== 'Check back for updates' ? `${record.city}, ` : '';
      const title = `OVI Checkpoint - ${cityPart}${record.county} County`;

      // Determine status
      const now = new Date();
      const startDate = new Date(start);
      const endDate = new Date(end);
      let status = 'upcoming';
      if (now > endDate) {
        status = 'completed';
      } else if (now >= startDate && now <= endDate) {
        status = 'active';
      }

      // Insert into database
      const { data, error } = await supabase
        .from('dui_checkpoints')
        .insert({
          title,
          location_county: record.county,
          location_city: record.city || null,
          location_address: address,
          description: record.location,
          raw_location_text: record.location,
          start_date: start,
          end_date: end,
          latitude: coords?.lat || null,
          longitude: coords?.lng || null,
          status,
          source_name: 'CSV Import',
          source_type: 'manual',
          source_url: null,
          is_verified: true
        })
        .select()
        .single();

      if (error) {
        console.error(`  ✗ Database error:`, error);
        failCount++;
      } else {
        console.log(`  ✓ Imported successfully (ID: ${data.id})`);
        successCount++;
        results.push(data);
      }

      // Rate limit for geocoding API
      await new Promise(resolve => setTimeout(resolve, 200));

    } catch (error) {
      console.error(`  ✗ Error processing record:`, error);
      failCount++;
    }

    console.log('');
  }

  console.log('\n=================================');
  console.log('Import Summary');
  console.log('=================================');
  console.log(`Total records: ${csvData.length}`);
  console.log(`Successfully imported: ${successCount}`);
  console.log(`Failed: ${failCount}`);
  console.log('=================================\n');
}

// Run the import
importCheckpoints().catch(console.error);
