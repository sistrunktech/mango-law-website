import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { MapPin, Navigation } from 'lucide-react';
import type { DUICheckpoint } from '../data/checkpoints';

type Props = {
  checkpoints: DUICheckpoint[];
  selectedCheckpoint?: DUICheckpoint | null;
  onCheckpointSelect?: (checkpoint: DUICheckpoint) => void;
};

export default function CheckpointMap({ checkpoints, selectedCheckpoint, onCheckpointSelect }: Props) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<mapboxgl.Marker[]>([]);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [mapError, setMapError] = useState<string | null>(null);

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    const token = import.meta.env.VITE_MAPBOX_PUBLIC_TOKEN || import.meta.env.MAPBOX_PUBLIC_TOKEN;
    const styleUrl = import.meta.env.VITE_MAPBOX_STYLE_URL || import.meta.env.MAPBOX_STYLE_URL;

    if (!token) {
      setMapError('Mapbox token not configured');
      setIsLoading(false);
      return;
    }

    try {
      mapboxgl.accessToken = token;

      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: styleUrl || 'mapbox://styles/mapbox/streets-v12',
        center: [-82.9988, 39.9612], // Columbus, OH
        zoom: 8,
      });

      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
      map.current.addControl(new mapboxgl.ScaleControl(), 'bottom-right');

      map.current.on('load', () => {
        setIsLoading(false);
      });

      map.current.on('error', (e) => {
        console.error('Mapbox error:', e);
        setMapError('Failed to load map');
        setIsLoading(false);
      });
    } catch (error) {
      console.error('Map initialization error:', error);
      setMapError('Failed to initialize map');
      setIsLoading(false);
    }

    return () => {
      markers.current.forEach((marker) => marker.remove());
      markers.current = [];
      map.current?.remove();
      map.current = null;
    };
  }, []);

  // Update markers when checkpoints change
  useEffect(() => {
    if (!map.current || isLoading) return;

    // Remove existing markers
    markers.current.forEach((marker) => marker.remove());
    markers.current = [];

    const validCheckpoints = checkpoints.filter((c) => c.latitude && c.longitude);

    // Add new markers
    validCheckpoints.forEach((checkpoint) => {
      const statusColors = {
        upcoming: '#FF9500',
        active: '#FF3B30',
        completed: '#34C759',
        cancelled: '#8E8E93',
      };

      const color = statusColors[checkpoint.status] || statusColors.upcoming;
      const isSelected = selectedCheckpoint?.id === checkpoint.id;

      const el = document.createElement('div');
      const baseSize = isSelected ? 40 : 32;

      el.style.width = `${baseSize}px`;
      el.style.height = `${baseSize}px`;
      el.style.borderRadius = '50%';
      el.style.backgroundColor = color;
      el.style.border = isSelected ? '4px solid #FF6B18' : '3px solid white';
      el.style.boxShadow = '0 2px 8px rgba(0,0,0,0.3)';
      el.style.cursor = 'pointer';
      el.style.transition = 'width 0.2s, height 0.2s, margin 0.2s, box-shadow 0.2s';
      el.style.zIndex = isSelected ? '1000' : '1';

      el.addEventListener('mouseenter', () => {
        const hoverSize = baseSize + 8;
        const offset = -4;
        el.style.width = `${hoverSize}px`;
        el.style.height = `${hoverSize}px`;
        el.style.marginLeft = `${offset}px`;
        el.style.marginTop = `${offset}px`;
        el.style.boxShadow = '0 4px 12px rgba(0,0,0,0.4)';
      });

      el.addEventListener('mouseleave', () => {
        el.style.width = `${baseSize}px`;
        el.style.height = `${baseSize}px`;
        el.style.marginLeft = '0px';
        el.style.marginTop = '0px';
        el.style.boxShadow = '0 2px 8px rgba(0,0,0,0.3)';
      });

      const startDate = new Date(checkpoint.start_date);
      const endDate = new Date(checkpoint.end_date);

      const popup = new mapboxgl.Popup({ offset: 25, closeButton: true })
        .setHTML(`
          <div style="padding: 12px; min-width: 240px; max-width: 320px;">
            <h4 style="margin: 0 0 10px 0; font-weight: 600; font-size: 15px; color: #1a1a1a;">${checkpoint.title}</h4>
            <div style="border-top: 1px solid #e5e5e5; padding-top: 8px; margin-top: 8px;">
              <p style="margin: 0 0 6px 0; font-size: 13px; color: #666;">
                <strong>Location:</strong> ${checkpoint.location_address}
              </p>
              <p style="margin: 0 0 6px 0; font-size: 13px; color: #666;">
                <strong>City:</strong> ${checkpoint.location_city}, ${checkpoint.location_county} County
              </p>
              <p style="margin: 0 0 6px 0; font-size: 13px; color: #666;">
                <strong>Start:</strong> ${startDate.toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}
              </p>
              <p style="margin: 0 0 6px 0; font-size: 13px; color: #666;">
                <strong>End:</strong> ${endDate.toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}
              </p>
              <p style="margin: 0; font-size: 13px; color: #666;">
                <strong>Status:</strong> <span style="color: ${color}; font-weight: 600; text-transform: capitalize;">${checkpoint.status}</span>
              </p>
            </div>
            ${checkpoint.description ? `<p style="margin: 10px 0 0 0; padding-top: 8px; border-top: 1px solid #e5e5e5; font-size: 12px; color: #888; line-height: 1.4;">${checkpoint.description}</p>` : ''}
            ${checkpoint.source_name ? `<p style="margin: 8px 0 0 0; font-size: 11px; color: #aaa;">Source: ${checkpoint.source_name}</p>` : ''}
          </div>
        `);

      const marker = new mapboxgl.Marker(el)
        .setLngLat([checkpoint.longitude!, checkpoint.latitude!])
        .setPopup(popup)
        .addTo(map.current!);

      marker.getElement().addEventListener('click', () => {
        if (onCheckpointSelect) {
          onCheckpointSelect(checkpoint);
        }
      });

      markers.current.push(marker);
    });

    // Fit bounds to markers if checkpoints exist
    if (validCheckpoints.length > 0 && map.current) {
      const bounds = new mapboxgl.LngLatBounds();
      validCheckpoints.forEach((checkpoint) => {
        bounds.extend([checkpoint.longitude!, checkpoint.latitude!]);
      });

      map.current.fitBounds(bounds, {
        padding: { top: 60, bottom: 60, left: 60, right: 60 },
        maxZoom: 12,
        duration: 1000,
      });
    }
  }, [checkpoints, selectedCheckpoint, onCheckpointSelect, isLoading]);

  // Center on selected checkpoint
  useEffect(() => {
    if (!map.current || !selectedCheckpoint || !selectedCheckpoint.latitude || !selectedCheckpoint.longitude) return;

    map.current.flyTo({
      center: [selectedCheckpoint.longitude, selectedCheckpoint.latitude],
      zoom: 13,
      duration: 1500,
    });
  }, [selectedCheckpoint]);

  // Get user location
  const handleLocateUser = () => {
    if (!map.current) return;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords: [number, number] = [
            position.coords.longitude,
            position.coords.latitude,
          ];
          setUserLocation(coords);

          map.current?.flyTo({
            center: coords,
            zoom: 11,
            duration: 2000,
          });

          // Add user location marker
          const userMarker = document.createElement('div');
          userMarker.style.width = '20px';
          userMarker.style.height = '20px';
          userMarker.style.borderRadius = '50%';
          userMarker.style.backgroundColor = '#007AFF';
          userMarker.style.border = '3px solid white';
          userMarker.style.boxShadow = '0 0 0 rgba(0,122,255,0.4)';
          userMarker.style.animation = 'pulse 2s infinite';

          // Add pulse animation
          const style = document.createElement('style');
          style.textContent = `
            @keyframes pulse {
              0% { box-shadow: 0 0 0 0 rgba(0,122,255,0.7); }
              70% { box-shadow: 0 0 0 10px rgba(0,122,255,0); }
              100% { box-shadow: 0 0 0 0 rgba(0,122,255,0); }
            }
          `;
          document.head.appendChild(style);

          new mapboxgl.Marker(userMarker)
            .setLngLat(coords)
            .setPopup(
              new mapboxgl.Popup({ offset: 15 }).setHTML(
                '<div style="padding: 8px;"><p style="margin: 0; font-size: 13px; font-weight: 600;">Your Location</p></div>'
              )
            )
            .addTo(map.current!);
        },
        (error) => {
          console.error('Error getting location:', error);
          alert('Unable to get your location. Please enable location services in your browser.');
        }
      );
    } else {
      alert('Geolocation is not supported by your browser.');
    }
  };

  // Error state
  if (mapError) {
    return (
      <div className="relative h-full min-h-[500px] overflow-hidden rounded-2xl border border-brand-black/10 bg-brand-offWhite">
        <div className="flex h-full items-center justify-center p-8">
          <div className="text-center">
            <MapPin className="mx-auto mb-3 h-12 w-12 text-red-500/40" />
            <p className="text-lg font-semibold text-red-600">Map Error</p>
            <p className="text-sm text-brand-black/60">{mapError}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-full min-h-[500px]">
      <div ref={mapContainer} className="h-full w-full rounded-2xl overflow-hidden border border-brand-black/10" />

      {/* Loading overlay */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/90 rounded-2xl">
          <div className="text-center">
            <div className="mb-3 h-12 w-12 mx-auto animate-spin rounded-full border-4 border-brand-mango border-t-transparent"></div>
            <p className="text-sm font-semibold text-brand-black/60">Loading map...</p>
          </div>
        </div>
      )}

      {/* Location button */}
      {!isLoading && (
        <button
          onClick={handleLocateUser}
          className="absolute top-4 left-4 flex items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-brand-black shadow-lg transition-all hover:bg-brand-mango hover:shadow-xl hover:scale-105"
          title="Find my location"
        >
          <Navigation size={16} />
          <span className="hidden sm:inline">Find Me</span>
        </button>
      )}

      {/* Legend */}
      {!isLoading && (
        <div className="absolute bottom-4 left-4 rounded-lg bg-white p-4 shadow-lg">
          <h4 className="mb-3 text-xs font-bold uppercase tracking-wide text-brand-black/60">
            Checkpoint Status
          </h4>
          <div className="space-y-2.5 text-sm">
            <div className="flex items-center gap-2.5">
              <div className="h-4 w-4 rounded-full bg-[#FF3B30] border-2 border-white shadow-sm"></div>
              <span className="font-medium">Active Now</span>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="h-4 w-4 rounded-full bg-[#FF9500] border-2 border-white shadow-sm"></div>
              <span className="font-medium">Upcoming</span>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="h-4 w-4 rounded-full bg-[#34C759] border-2 border-white shadow-sm"></div>
              <span className="font-medium">Completed</span>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="h-4 w-4 rounded-full bg-[#8E8E93] border-2 border-white shadow-sm"></div>
              <span className="font-medium">Cancelled</span>
            </div>
          </div>
        </div>
      )}

      {/* Empty state */}
      {/* Truly empty - no checkpoints at all */}
      {!isLoading && checkpoints.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/95 rounded-2xl">
          <div className="text-center px-4">
            <MapPin className="mx-auto mb-3 h-12 w-12 text-brand-black/20" />
            <p className="text-lg font-semibold text-brand-black/70">No Checkpoints Found</p>
            <p className="mt-1 text-sm text-brand-black/50">Try adjusting your filters or check back later</p>
          </div>
        </div>
      )}

      {/* Checkpoints exist but none have coordinates yet */}
      {!isLoading && checkpoints.length > 0 && checkpoints.filter(c => c.latitude && c.longitude).length === 0 && (
        <div className="absolute top-4 left-4 right-4 z-10">
          <div className="rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 shadow-sm">
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-amber-600 shrink-0" />
              <p className="text-sm text-amber-800">
                <span className="font-semibold">{checkpoints.length} checkpoint{checkpoints.length !== 1 ? 's' : ''} found</span> — map locations are being processed. Check the list below.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
