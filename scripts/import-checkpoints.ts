import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config();

const supabaseUrl =
  process.env.SUPABASE_URL ||
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  process.env.VITE_SUPABASE_URL;
const supabaseKey =
  process.env.SERVICE_ROLE_KEY ||
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.VITE_SUPABASE_ANON_KEY;

if (!process.env.SERVICE_ROLE_KEY) {
  console.warn('⚠️  Warning: SERVICE_ROLE_KEY not found, using ANON key. This may fail due to RLS policies.');
}

const supabase = createClient(supabaseUrl, supabaseKey);

const historicalCheckpoints = [
  {
    title: 'I-71 Northbound Checkpoint',
    location_address: 'I-71 Northbound at Exit 161 (Polaris Parkway)',
    location_city: 'Columbus',
    location_county: 'Franklin',
    latitude: 40.1487,
    longitude: -82.9874,
    start_date: '2024-11-15T21:00:00-05:00',
    end_date: '2024-11-16T02:00:00-05:00',
    status: 'completed',
    source_name: 'Columbus Division of Police',
    source_url: 'https://www.columbus.gov/police',
    is_verified: true
  },
  {
    title: 'High Street OSU Campus Checkpoint',
    location_address: 'High Street near OSU Campus',
    location_city: 'Columbus',
    location_county: 'Franklin',
    latitude: 40.0067,
    longitude: -83.0305,
    start_date: '2024-11-08T22:00:00-05:00',
    end_date: '2024-11-09T03:00:00-05:00',
    status: 'completed',
    source_name: 'Columbus Division of Police',
    is_verified: true
  },
  {
    title: 'Broad Street Checkpoint',
    location_address: 'Broad Street and Parsons Avenue',
    location_city: 'Columbus',
    location_county: 'Franklin',
    latitude: 39.9612,
    longitude: -82.9501,
    start_date: '2024-11-01T20:00:00-04:00',
    end_date: '2024-11-02T01:00:00-04:00',
    status: 'completed',
    source_name: 'Columbus Division of Police',
    is_verified: true
  },
  {
    title: 'I-270 Eastbound Checkpoint',
    location_address: 'I-270 Eastbound at Hamilton Road',
    location_city: 'Columbus',
    location_county: 'Franklin',
    latitude: 39.9887,
    longitude: -82.8712,
    start_date: '2024-10-25T21:00:00-04:00',
    end_date: '2024-10-26T02:00:00-04:00',
    status: 'completed',
    source_name: 'Columbus Division of Police',
    is_verified: true
  },
  {
    title: 'Morse Road Checkpoint',
    location_address: 'Morse Road and Cleveland Avenue',
    location_city: 'Columbus',
    location_county: 'Franklin',
    latitude: 40.0501,
    longitude: -82.9851,
    start_date: '2024-10-18T22:00:00-04:00',
    end_date: '2024-10-19T03:00:00-04:00',
    status: 'completed',
    source_name: 'Columbus Division of Police',
    is_verified: true
  },
  {
    title: 'SR-161 Checkpoint',
    location_address: 'SR-161 and I-71 Interchange',
    location_city: 'Columbus',
    location_county: 'Franklin',
    latitude: 40.1465,
    longitude: -82.9912,
    start_date: '2024-11-22T21:00:00-05:00',
    end_date: '2024-11-23T02:00:00-05:00',
    status: 'completed',
    source_name: 'Columbus Division of Police',
    is_verified: true
  },
  {
    title: 'Cincinnati Downtown Checkpoint',
    location_address: 'Main Street Downtown',
    location_city: 'Cincinnati',
    location_county: 'Hamilton',
    latitude: 39.1031,
    longitude: -84.5120,
    start_date: '2024-11-10T20:00:00-05:00',
    end_date: '2024-11-11T01:00:00-05:00',
    status: 'completed',
    source_name: 'Cincinnati Police Department',
    is_verified: true
  },
  {
    title: 'I-75 Southbound Checkpoint',
    location_address: 'I-75 Southbound at Mitchell Avenue',
    location_city: 'Cincinnati',
    location_county: 'Hamilton',
    latitude: 39.1623,
    longitude: -84.5378,
    start_date: '2024-11-03T22:00:00-05:00',
    end_date: '2024-11-04T03:00:00-05:00',
    status: 'completed',
    source_name: 'Cincinnati Police Department',
    is_verified: true
  },
  {
    title: 'Reading Road Checkpoint',
    location_address: 'Reading Road and Seymour Avenue',
    location_city: 'Cincinnati',
    location_county: 'Hamilton',
    latitude: 39.1534,
    longitude: -84.4401,
    start_date: '2024-10-27T21:00:00-04:00',
    end_date: '2024-10-28T02:00:00-04:00',
    status: 'completed',
    source_name: 'Cincinnati Police Department',
    is_verified: true
  },
  {
    title: 'Columbia Parkway Checkpoint',
    location_address: 'Columbia Parkway at Delta Avenue',
    location_city: 'Cincinnati',
    location_county: 'Hamilton',
    latitude: 39.1112,
    longitude: -84.4523,
    start_date: '2024-10-20T20:00:00-04:00',
    end_date: '2024-10-21T01:00:00-04:00',
    status: 'completed',
    source_name: 'Cincinnati Police Department',
    is_verified: true
  },
  {
    title: 'Cleveland Downtown Checkpoint',
    location_address: 'Market Street Downtown',
    location_city: 'Cleveland',
    location_county: 'Cuyahoga',
    latitude: 41.4993,
    longitude: -81.6944,
    start_date: '2024-11-12T21:00:00-05:00',
    end_date: '2024-11-13T02:00:00-05:00',
    status: 'completed',
    source_name: 'Cleveland Division of Police',
    is_verified: true
  },
  {
    title: 'I-90 Dead Man\'s Curve Checkpoint',
    location_address: 'I-90 Westbound at Dead Man\'s Curve',
    location_city: 'Cleveland',
    location_county: 'Cuyahoga',
    latitude: 41.5051,
    longitude: -81.6934,
    start_date: '2024-11-05T22:00:00-05:00',
    end_date: '2024-11-06T03:00:00-05:00',
    status: 'completed',
    source_name: 'Cleveland Division of Police',
    is_verified: true
  },
  {
    title: 'Euclid Avenue Checkpoint',
    location_address: 'Euclid Avenue and East 105th Street',
    location_city: 'Cleveland',
    location_county: 'Cuyahoga',
    latitude: 41.5045,
    longitude: -81.6001,
    start_date: '2024-10-29T21:00:00-04:00',
    end_date: '2024-10-30T02:00:00-04:00',
    status: 'completed',
    source_name: 'Cleveland Division of Police',
    is_verified: true
  },
  {
    title: 'Lorain Avenue Checkpoint',
    location_address: 'Lorain Avenue and West 117th Street',
    location_city: 'Cleveland',
    location_county: 'Cuyahoga',
    latitude: 41.4634,
    longitude: -81.7912,
    start_date: '2024-10-22T20:00:00-04:00',
    end_date: '2024-10-23T01:00:00-04:00',
    status: 'completed',
    source_name: 'Cleveland Division of Police',
    is_verified: true
  },
  {
    title: 'Toledo I-75 Checkpoint',
    location_address: 'I-75 at Findlay Street',
    location_city: 'Toledo',
    location_county: 'Lucas',
    latitude: 41.6528,
    longitude: -83.5379,
    start_date: '2024-11-18T21:00:00-05:00',
    end_date: '2024-11-19T02:00:00-05:00',
    status: 'completed',
    source_name: 'Toledo Police Department',
    is_verified: true
  },
  {
    title: 'Monroe Street Checkpoint',
    location_address: 'Monroe Street and Detroit Avenue',
    location_city: 'Toledo',
    location_county: 'Lucas',
    latitude: 41.6528,
    longitude: -83.5456,
    start_date: '2024-11-11T22:00:00-05:00',
    end_date: '2024-11-12T03:00:00-05:00',
    status: 'completed',
    source_name: 'Toledo Police Department',
    is_verified: true
  },
  {
    title: 'Summit Street Checkpoint',
    location_address: 'Summit Street and Central Avenue',
    location_city: 'Toledo',
    location_county: 'Lucas',
    latitude: 41.6545,
    longitude: -83.5312,
    start_date: '2024-10-28T21:00:00-04:00',
    end_date: '2024-10-29T02:00:00-04:00',
    status: 'completed',
    source_name: 'Toledo Police Department',
    is_verified: true
  },
  {
    title: 'Akron Downtown Checkpoint',
    location_address: 'Main Street and Second Street',
    location_city: 'Akron',
    location_county: 'Summit',
    latitude: 41.0814,
    longitude: -81.5190,
    start_date: '2024-11-20T20:00:00-05:00',
    end_date: '2024-11-21T01:00:00-05:00',
    status: 'completed',
    source_name: 'Akron Police Department',
    is_verified: true
  },
  {
    title: 'SR-8 Checkpoint',
    location_address: 'SR-8 at Exchange Street',
    location_city: 'Akron',
    location_county: 'Summit',
    latitude: 41.0834,
    longitude: -81.5201,
    start_date: '2024-11-13T21:00:00-05:00',
    end_date: '2024-11-14T02:00:00-05:00',
    status: 'completed',
    source_name: 'Akron Police Department',
    is_verified: true
  },
  {
    title: 'Market Street Checkpoint',
    location_address: 'Market Street and University Avenue',
    location_city: 'Akron',
    location_county: 'Summit',
    latitude: 41.0756,
    longitude: -81.5123,
    start_date: '2024-10-30T22:00:00-04:00',
    end_date: '2024-10-31T03:00:00-04:00',
    status: 'completed',
    source_name: 'Akron Police Department',
    is_verified: true
  },
  {
    title: 'Dayton Downtown Checkpoint',
    location_address: 'Main Street Downtown',
    location_city: 'Dayton',
    location_county: 'Montgomery',
    latitude: 39.7589,
    longitude: -84.1916,
    start_date: '2024-11-16T21:00:00-05:00',
    end_date: '2024-11-17T02:00:00-05:00',
    status: 'completed',
    source_name: 'Dayton Police Department',
    is_verified: true
  },
  {
    title: 'Dayton I-75 Checkpoint',
    location_address: 'I-75 at Third Street',
    location_city: 'Dayton',
    location_county: 'Montgomery',
    latitude: 39.7623,
    longitude: -84.1945,
    start_date: '2024-11-09T22:00:00-05:00',
    end_date: '2024-11-10T03:00:00-05:00',
    status: 'completed',
    source_name: 'Dayton Police Department',
    is_verified: true
  },
  {
    title: 'Salem Avenue Checkpoint',
    location_address: 'Salem Avenue and Gettysburg Avenue',
    location_city: 'Dayton',
    location_county: 'Montgomery',
    latitude: 39.7812,
    longitude: -84.1534,
    start_date: '2024-10-26T21:00:00-04:00',
    end_date: '2024-10-27T02:00:00-04:00',
    status: 'completed',
    source_name: 'Dayton Police Department',
    is_verified: true
  },
  {
    title: 'Canton Downtown Checkpoint',
    location_address: 'Tuscarawas Street Downtown',
    location_city: 'Canton',
    location_county: 'Stark',
    latitude: 40.7989,
    longitude: -81.3784,
    start_date: '2024-11-14T20:00:00-05:00',
    end_date: '2024-11-15T01:00:00-05:00',
    status: 'completed',
    source_name: 'Canton Police Department',
    is_verified: true
  },
  {
    title: 'Canton I-77 Checkpoint',
    location_address: 'I-77 at 30th Street',
    location_city: 'Canton',
    location_county: 'Stark',
    latitude: 40.8234,
    longitude: -81.3912,
    start_date: '2024-11-07T21:00:00-05:00',
    end_date: '2024-11-08T02:00:00-05:00',
    status: 'completed',
    source_name: 'Canton Police Department',
    is_verified: true
  },
  {
    title: 'Youngstown Center Street Checkpoint',
    location_address: 'Center Street and Franklin Avenue',
    location_city: 'Youngstown',
    location_county: 'Mahoning',
    latitude: 41.0995,
    longitude: -80.6495,
    start_date: '2024-11-21T21:00:00-05:00',
    end_date: '2024-11-22T02:00:00-05:00',
    status: 'completed',
    source_name: 'Youngstown Police Department',
    is_verified: true
  },
  {
    title: 'Youngstown Market Street Checkpoint',
    location_address: 'Market Street and Federal Street',
    location_city: 'Youngstown',
    location_county: 'Mahoning',
    latitude: 41.0978,
    longitude: -80.6523,
    start_date: '2024-11-06T22:00:00-05:00',
    end_date: '2024-11-07T03:00:00-05:00',
    status: 'completed',
    source_name: 'Youngstown Police Department',
    is_verified: true
  },
  {
    title: 'Springfield High Street Checkpoint',
    location_address: 'High Street and Main Street',
    location_city: 'Springfield',
    location_county: 'Clark',
    latitude: 39.9242,
    longitude: -83.8088,
    start_date: '2024-11-19T20:00:00-05:00',
    end_date: '2024-11-20T01:00:00-05:00',
    status: 'completed',
    source_name: 'Springfield Police Division',
    is_verified: true
  },
  {
    title: 'Springfield Limestone Street Checkpoint',
    location_address: 'Limestone Street and Columbia Street',
    location_city: 'Springfield',
    location_county: 'Clark',
    latitude: 39.9256,
    longitude: -83.8123,
    start_date: '2024-11-04T21:00:00-05:00',
    end_date: '2024-11-05T02:00:00-05:00',
    status: 'completed',
    source_name: 'Springfield Police Division',
    is_verified: true
  }
];

async function importCheckpoints() {
  console.log('Starting checkpoint import...\n');

  let successCount = 0;
  let errorCount = 0;

  for (const checkpoint of historicalCheckpoints) {
    try {
      const { data, error } = await supabase
        .from('dui_checkpoints')
        .insert([checkpoint])
        .select();

      if (error) {
        console.error(`❌ Error importing checkpoint at ${checkpoint.location_address}:`, error.message);
        errorCount++;
      } else {
        console.log(`✅ Imported: ${checkpoint.title} - ${checkpoint.location_city}`);
        successCount++;
      }
    } catch (err) {
      console.error(`❌ Exception importing checkpoint:`, err);
      errorCount++;
    }
  }

  console.log(`\n📊 Import Summary:`);
  console.log(`   ✅ Successful: ${successCount}`);
  console.log(`   ❌ Failed: ${errorCount}`);
  console.log(`   📦 Total: ${historicalCheckpoints.length}`);
}

importCheckpoints().catch(console.error);
