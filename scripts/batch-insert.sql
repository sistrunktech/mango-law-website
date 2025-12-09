-- Batch insert of DUI checkpoint data from CSV
-- Generated on 2024-12-09

INSERT INTO dui_checkpoints (
  title, location_county, location_city, location_address, description, raw_location_text,
  start_date, end_date, latitude, longitude, status, source_name, source_type, is_verified
) VALUES
-- Record 1: Mahoning County - Boardman (Dec 5, 2025)
('OVI Checkpoint - Boardman, Mahoning County', 'Mahoning', 'Boardman', '1032 Boardman Canfield Road, Boardman, OH', 'An OVI checkpoint is planned near 1032 Boardman Canfield Road in Boardman.', 'Heads up! An OVI checkpoint is planned near 1032 Boardman Canfield Road in Boardman, announced by the Mahoning County OVI Task Force and the Ohio State Highway Patrol.', '2025-12-06 03:00:00+00', '2025-12-06 07:00:00+00', 41.025205, -80.692182, 'upcoming', 'CSV Import', 'manual', true),

-- Record 2: Summit County - Late Night (Nov 26, 2025)
('OVI Checkpoint - Summit County', 'Summit', NULL, 'Summit County, Ohio', 'Local law enforcement is planning sobriety checkpoints the night before Thanksgiving.', 'Local law enforcement is planning sobriety checkpoints the night before Thanksgiving.', '2025-11-27 03:00:00+00', '2025-11-27 07:00:00+00', 41.08088, -81.51757, 'upcoming', 'CSV Import', 'manual', true),

-- Record 3: Butler County - Ross Township (Nov 26, 2025)
('OVI Checkpoint - Ross Township, Butler County', 'Butler', 'Ross Township', 'Hamilton-Cleves Road, Ross Township, OH', 'The Butler County OVI Task Force will implement an impaired driving checkpoint on Ohio State Route 128.', 'The Butler County OVI Task Force will implement an impaired driving checkpoint tonight at midnight on Ohio State Route 128, located in the 3300 block of Hamilton-Cleves Road adjacent to Ross High School.', '2025-11-27 01:00:00+00', '2025-11-27 07:00:00+00', 39.282, -84.726, 'upcoming', 'CSV Import', 'manual', true),

-- Record 4: Stark County - Louisville (Nov 14, 2025)
('OVI Checkpoint - Louisville, Stark County', 'Stark', 'Louisville', '4400 block of Louisville Street NE, Louisville, OH', 'OVI Checkpoint near the 4400 block of Louisville Street NE in Louisville.', 'OVI Checkpoint near the 4400 block of Louisville Street NE in Louisville, Ohio (close to the downtown Louisville area and just a short drive from State Route 44).', '2025-11-14 23:00:00+00', '2025-11-15 01:30:00+00', 40.837, -81.2595, 'upcoming', 'CSV Import', 'manual', true),

-- Record 5: Stark County - Osnaburg (Nov 14, 2025)
('OVI Checkpoint - Osnaburg, Stark County', 'Stark', 'Osnaburg', '200 block of North Wood Street, East Canton, OH', 'OVI Checkpoint in the 200 block of North Wood Street in East Canton.', 'OVI Checkpoint in the 200 block of North Wood Street in East Canton, located in the Osnaburg area (right by the East Canton Village center and close to Route 172).', '2025-11-15 01:30:00+00', '2025-11-15 04:00:00+00', 40.787, -81.283, 'upcoming', 'CSV Import', 'manual', true);

-- Check count
SELECT COUNT(*) as new_records_added FROM dui_checkpoints WHERE source_name = 'CSV Import';
