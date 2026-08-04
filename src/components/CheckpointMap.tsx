'use client';

import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { MapPin, Navigation } from 'lucide-react';
import {
  checkpointHasCoordinates,
  getCheckpointAreaLabel,
  getCheckpointLocationGuidance,
  getCheckpointLocationPrecision,
  getCheckpointLocationPrecisionLabel,
  getDisplayStatus,
  isAggregatorSourceName,
  type DUICheckpoint,
} from '../data/checkpoints';
import { formatCalendarDate } from '../lib/formatting';
import { getMapboxPublicToken, getMapboxStyleUrl } from '../lib/mapbox';

type Props = {
  checkpoints: DUICheckpoint[];
  selectedCheckpoint?: DUICheckpoint | null;
  onCheckpointSelect?: (checkpoint: DUICheckpoint) => void;
  now?: Date;
};

const OHIO_BOUNDS = {
  minLatitude: 38.4032,
  maxLatitude: 41.9773,
  minLongitude: -84.8203,
  maxLongitude: -80.5189,
};

function isOhioCoordinate(latitude: number, longitude: number): boolean {
  return (
    latitude >= OHIO_BOUNDS.minLatitude &&
    latitude <= OHIO_BOUNDS.maxLatitude &&
    longitude >= OHIO_BOUNDS.minLongitude &&
    longitude <= OHIO_BOUNDS.maxLongitude
  );
}

function formatMapDateTime(value: string): string {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return 'Date unavailable';
  return parsed.toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' });
}

function getFallbackDate(checkpoint: DUICheckpoint): string {
  if (checkpoint.is_pending_announcement && checkpoint.pending_announcement_event_date) {
    return `Upcoming ${formatCalendarDate(checkpoint.pending_announcement_event_date)}`;
  }

  const startDate = checkpoint.start_date ? formatCalendarDate(checkpoint.start_date) : null;
  return startDate ? startDate : 'Date unavailable';
}

function escapePopupHtml(value: string | null | undefined): string {
  return String(value ?? '').replace(/[&<>"']/g, (char) => {
    switch (char) {
      case '&':
        return '&amp;';
      case '<':
        return '&lt;';
      case '>':
        return '&gt;';
      case '"':
        return '&quot;';
      case "'":
        return '&#39;';
      default:
        return char;
    }
  });
}

function getFatalMapboxLoadError(event: unknown): string | null {
  const candidate = event as { error?: { message?: unknown; status?: unknown }; message?: unknown; status?: unknown } | null;
  const message = String(candidate?.error?.message ?? candidate?.message ?? '').toLowerCase();
  const status = candidate?.error?.status ?? candidate?.status;
  if (status === 401 || status === 403 || /access token|invalid token|unauthorized|not authorized|forbidden/.test(message)) {
    return 'The interactive map is unavailable because its access configuration could not be verified.';
  }
  if ((status === 404 && /\bstyle\b/.test(message)) || /(?:invalid|malformed|unsupported|failed to parse).*style|style.*(?:invalid|malformed|unsupported)/.test(message)) {
    return 'The interactive map is unavailable because its map style configuration is invalid.';
  }
  return null;
}

const isValidMapboxStyleUrl = (styleUrl: string) => styleUrl.startsWith('mapbox://styles/') || /^https?:\/\//.test(styleUrl);

export default function CheckpointMap({ checkpoints, selectedCheckpoint, onCheckpointSelect, now }: Props) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<mapboxgl.Marker[]>([]);
  const markersByCheckpointId = useRef(new Map<string, mapboxgl.Marker>());
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [mapError, setMapError] = useState<string | null>(null);
  const [canRetry, setCanRetry] = useState(false);
  const [retryAttempt, setRetryAttempt] = useState(0);

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || map.current) return;
    let didLoad = false;
    let isDisposed = false;
    let loadTimeout: number | undefined;
    let mapInstance: mapboxgl.Map | null = null;

    const clearLoadTimeout = () => { if (loadTimeout !== undefined) window.clearTimeout(loadTimeout); loadTimeout = undefined; };
    const clearMapResources = () => { markers.current.forEach((marker) => marker.remove()); markers.current = []; markersByCheckpointId.current.clear(); };

    function removeMap() {
      const activeMap = mapInstance;
      if (!activeMap) return;
      activeMap.off('load', markMapReady);
      activeMap.off('style.load', markMapReady);
      activeMap.off('error', handleMapError);
      activeMap.remove();
      if (map.current === activeMap) map.current = null;
      mapInstance = null;
    }

    function failMap(message: string, retryable: boolean) {
      if (isDisposed || didLoad) return;
      didLoad = true; clearLoadTimeout(); clearMapResources(); removeMap();
      setMapError(message);
      setCanRetry(retryable);
      setIsLoading(false);
    }

    function markMapReady() {
      if (isDisposed || didLoad) return;
      didLoad = true; clearLoadTimeout();
      setMapError(null);
      setCanRetry(false);
      setIsLoading(false);
    }

    function handleMapError(event: unknown) {
      if (isDisposed || didLoad) return;
      const fatalError = getFatalMapboxLoadError(event);
      if (fatalError) {
        failMap(fatalError, false);
        return;
      }
      console.warn('Mapbox emitted a pre-load error; waiting for the map to finish loading.', event);
    }

    function cleanup() {
      isDisposed = true; clearLoadTimeout(); removeMap(); clearMapResources();
    }

    if (!mapboxgl.supported()) {
      failMap('Your browser does not support WebGL (required for the interactive map).', false);
      return cleanup;
    }

    const token = getMapboxPublicToken();
    const styleUrl = getMapboxStyleUrl();

    if (!token) {
      failMap('Map temporarily unavailable. Checkpoint details are still available below.', false);
      return cleanup;
    }

    if (!isValidMapboxStyleUrl(styleUrl)) {
      failMap('The interactive map is unavailable because its map style configuration is invalid.', false);
      return cleanup;
    }

    loadTimeout = window.setTimeout(() => failMap('The interactive map did not load in time. The checkpoint list is still available.', true), 10000);

    try {
      mapContainer.current.innerHTML = '';
      mapboxgl.accessToken = token;

      mapInstance = new mapboxgl.Map({ container: mapContainer.current, style: styleUrl, center: [-82.9988, 39.9612], zoom: 8 });
      map.current = mapInstance;

      mapInstance.addControl(new mapboxgl.NavigationControl(), 'top-right');
      mapInstance.addControl(new mapboxgl.ScaleControl(), 'bottom-right');

      mapInstance.on('load', markMapReady);
      mapInstance.on('style.load', markMapReady);
      mapInstance.on('error', handleMapError);
    } catch (error) {
      console.error('Map initialization error:', error);
      const fatalError = getFatalMapboxLoadError(error);
      if (fatalError) failMap(fatalError, false);
    }

    return cleanup;
  }, [retryAttempt]);

  // Update markers when checkpoints change
  useEffect(() => {
    if (!map.current || isLoading) return;
    const displayNow = now ?? new Date();

    // Remove existing markers
    markers.current.forEach((marker) => marker.remove());
    markers.current = [];
    markersByCheckpointId.current.clear();

    const validCheckpoints = checkpoints.filter(
      (checkpoint): checkpoint is DUICheckpoint & { latitude: number; longitude: number } =>
        checkpointHasCoordinates(checkpoint)
    );
    const ohioCheckpoints = validCheckpoints.filter((c) => isOhioCoordinate(c.latitude, c.longitude));

    // Add new markers
    ohioCheckpoints.forEach((checkpoint) => {
      const statusColors = {
        upcoming: '#FF9500',
        active: '#FF3B30',
        completed: '#34C759',
        cancelled: '#8E8E93',
      };

      const isPendingAnnouncement = checkpoint.is_pending_announcement === true;
      const displayStatus = isPendingAnnouncement ? 'upcoming' : getDisplayStatus(checkpoint, displayNow);
      const color = statusColors[displayStatus] || statusColors.upcoming;
      const isSelected = selectedCheckpoint?.id === checkpoint.id;
      const precision = getCheckpointLocationPrecision(checkpoint);
      const isApproximate = precision !== 'exact';
      const locationLabel = getCheckpointAreaLabel(checkpoint);
      const locationGuidance = isPendingAnnouncement
        ? 'This pin marks the named city or county from a public pending announcement. It is not a confirmed street-level checkpoint location.'
        : getCheckpointLocationGuidance(checkpoint);

      const el = document.createElement('div');
      const core = document.createElement('div');
      const baseSize = 34;
      const baseShadow = isSelected
        ? '0 0 0 5px rgba(255,107,24,0.18), 0 4px 12px rgba(0,0,0,0.35)'
        : '0 2px 8px rgba(0,0,0,0.3)';
      const focusShadow = isSelected
        ? '0 0 0 6px rgba(255,107,24,0.24), 0 5px 14px rgba(0,0,0,0.38)'
        : '0 0 0 4px rgba(255,107,24,0.18), 0 4px 12px rgba(0,0,0,0.35)';

      el.style.width = `${baseSize}px`;
      el.style.height = `${baseSize}px`;
      el.style.display = 'flex';
      el.style.alignItems = 'center';
      el.style.justifyContent = 'center';
      el.style.cursor = 'pointer';
      el.style.transition = 'box-shadow 0.18s ease';
      el.style.zIndex = isSelected ? '1000' : '1';
      el.style.boxShadow = baseShadow;
      el.style.borderRadius = '999px';

      core.style.display = 'flex';
      core.style.alignItems = 'center';
      core.style.justifyContent = 'center';
      core.style.width = isApproximate ? '24px' : `${baseSize}px`;
      core.style.height = isApproximate ? '24px' : `${baseSize}px`;
      core.style.boxSizing = 'border-box';

      if (isApproximate) {
        core.style.background = 'rgba(255,255,255,0.98)';
        core.style.border = `4px solid ${color}`;
        core.style.borderRadius = '6px';
        core.style.transform = 'rotate(45deg)';
      } else {
        core.style.backgroundColor = color;
        core.style.border = '3px solid white';
        core.style.borderRadius = '999px';
      }

      const applyFocusStyles = () => {
        el.style.boxShadow = focusShadow;
      };

      const removeFocusStyles = () => {
        el.style.boxShadow = baseShadow;
      };

      el.addEventListener('focus', applyFocusStyles);
      el.addEventListener('blur', removeFocusStyles);
      el.appendChild(core);

      const sourceNameForPopup = checkpoint.source_name && !isAggregatorSourceName(checkpoint.source_name) ? checkpoint.source_name : null;
      const eventDateLabel = checkpoint.pending_announcement_event_date
        ? formatCalendarDate(checkpoint.pending_announcement_event_date)
        : formatCalendarDate(checkpoint.start_date);
      const safeEventDateLabel = escapePopupHtml(eventDateLabel);
      const timingHtml = isPendingAnnouncement
        ? `
              <p style="margin: 0 0 6px 0; font-size: 13px; color: #666;">
                <strong>Event date:</strong> ${safeEventDateLabel}
              </p>
              <p style="margin: 0 0 6px 0; font-size: 13px; color: #666;">
                <strong>Timing:</strong> Exact time pending
              </p>
            `
        : `
              <p style="margin: 0 0 6px 0; font-size: 13px; color: #666;">
                <strong>Start:</strong> ${formatMapDateTime(checkpoint.start_date)}
              </p>
              <p style="margin: 0 0 6px 0; font-size: 13px; color: #666;">
                <strong>End:</strong> ${formatMapDateTime(checkpoint.end_date)}
              </p>
            `;
      const statusLabel = isPendingAnnouncement ? 'Pending details' : displayStatus;

      const label = [
        `DUI checkpoint: ${checkpoint.title}`,
        locationLabel,
        `Status: ${statusLabel}`,
        `Map precision: ${getCheckpointLocationPrecisionLabel(precision)}`,
        isPendingAnnouncement
          ? `Event date: ${eventDateLabel}. Exact time pending`
          : `Start: ${formatMapDateTime(checkpoint.start_date)}. End: ${formatMapDateTime(checkpoint.end_date)}`,
        'Press Enter for details.',
      ].join('. ');
      el.setAttribute('role', 'button');
      el.setAttribute('tabindex', '0');
      el.setAttribute('aria-label', label);
      el.setAttribute('aria-haspopup', 'dialog');

      const popup = new mapboxgl.Popup({ offset: 25, closeButton: true })
        .setHTML(`
          <div style="padding: 12px; min-width: 240px; max-width: 320px;">
            <h4 style="margin: 0 0 10px 0; font-weight: 600; font-size: 15px; color: #1a1a1a;">${escapePopupHtml(checkpoint.title)}</h4>
            <div style="border-top: 1px solid #e5e5e5; padding-top: 8px; margin-top: 8px;">
              <p style="margin: 0 0 6px 0; font-size: 13px; color: #666;">
                <strong>Location:</strong> ${escapePopupHtml(locationLabel)}
              </p>
              <p style="margin: 0 0 6px 0; font-size: 13px; color: #666;">
                <strong>Map precision:</strong> ${getCheckpointLocationPrecisionLabel(precision)}
              </p>
              ${timingHtml}
              <p style="margin: 0; font-size: 13px; color: #666;">
                <strong>Status:</strong> <span style="color: ${color}; font-weight: 600; text-transform: capitalize;">${escapePopupHtml(statusLabel)}</span>
              </p>
            </div>
            ${locationGuidance ? `<p style="margin: 10px 0 0 0; padding-top: 8px; border-top: 1px solid #e5e5e5; font-size: 12px; color: #666; line-height: 1.5;">${escapePopupHtml(locationGuidance)}</p>` : ''}
            ${checkpoint.description ? `<p style="margin: 10px 0 0 0; padding-top: 8px; border-top: 1px solid #e5e5e5; font-size: 12px; color: #888; line-height: 1.4;">${escapePopupHtml(checkpoint.description)}</p>` : ''}
            ${sourceNameForPopup ? `<p style="margin: 8px 0 0 0; font-size: 11px; color: #aaa;">Source: ${escapePopupHtml(sourceNameForPopup)}</p>` : ''}
          </div>
        `);

      const marker = new mapboxgl.Marker(el)
        .setLngLat([checkpoint.longitude!, checkpoint.latitude!])
        .setPopup(popup)
        .addTo(map.current!);

      const activateMarker = () => {
        if (selectedCheckpoint?.id === checkpoint.id) {
          marker.togglePopup();
          return;
        }

        if (onCheckpointSelect) {
          onCheckpointSelect(checkpoint);
        }
      };

      el.addEventListener('click', activateMarker);
      el.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          activateMarker();
          return;
        }
        if (e.key === 'Escape') {
          marker.getPopup()?.remove();
        }
      });

      markers.current.push(marker);
      markersByCheckpointId.current.set(checkpoint.id, marker);
    });

    // Fit bounds to markers if checkpoints exist
    if (ohioCheckpoints.length > 0 && map.current) {
      const bounds = new mapboxgl.LngLatBounds();
      ohioCheckpoints.forEach((checkpoint) => {
        bounds.extend([checkpoint.longitude!, checkpoint.latitude!]);
      });

      map.current.fitBounds(bounds, {
        padding: { top: 60, bottom: 60, left: 60, right: 60 },
        maxZoom: 12,
        duration: 1000,
      });
    }
  }, [checkpoints, selectedCheckpoint, onCheckpointSelect, isLoading, now]);

  // Center on selected checkpoint
  useEffect(() => {
    if (!map.current || !selectedCheckpoint) return;
    if (typeof selectedCheckpoint.latitude !== 'number' || typeof selectedCheckpoint.longitude !== 'number') return;
    if (!isOhioCoordinate(selectedCheckpoint.latitude, selectedCheckpoint.longitude)) return;

    map.current.flyTo({
      center: [selectedCheckpoint.longitude, selectedCheckpoint.latitude],
      zoom: 13,
      duration: 1500,
    });

    const selectedMarker = markersByCheckpointId.current.get(selectedCheckpoint.id);
    const selectedPopup = selectedMarker?.getPopup();
    if (selectedMarker && selectedPopup && !selectedPopup.isOpen()) {
      selectedPopup.addTo(map.current);
    }
  }, [selectedCheckpoint]);

  const retryInteractiveMap = () => {
    setMapError(null);
    setCanRetry(false);
    setIsLoading(true);
    setRetryAttempt((attempt) => attempt + 1);
  };

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
        <div className="flex h-full items-center justify-center p-5 sm:p-8">
          <div className="w-full max-w-2xl">
            <div className="text-center">
              <MapPin className="mx-auto mb-3 h-12 w-12 text-brand-mango/60" />
              <p className="text-lg font-semibold text-brand-black">Interactive map unavailable</p>
              <p role="status" className="mt-1 text-sm text-brand-black/65">{mapError}</p>
              {canRetry ? (
                <button
                  type="button"
                  onClick={retryInteractiveMap}
                  className="mt-4 rounded-lg bg-brand-mango px-4 py-2.5 text-sm font-semibold text-brand-black transition-colors hover:bg-brand-gold focus:outline-none focus:ring-2 focus:ring-brand-black focus:ring-offset-2"
                >
                  Retry interactive map
                </button>
              ) : null}
            </div>
            {checkpoints.length > 0 ? (
              <div className="mt-6 rounded-2xl border border-brand-black/10 bg-white p-4 text-left shadow-sm">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand-goldText">
                  Current list view
                </p>
                <div className="mt-3 space-y-2">
                  {checkpoints.slice(0, 6).map((checkpoint) => (
                    <button
                      key={checkpoint.id}
                      type="button"
                      onClick={() => onCheckpointSelect?.(checkpoint)}
                      className="block w-full rounded-xl border border-brand-black/10 bg-brand-offWhite px-4 py-3 text-left transition-colors hover:border-brand-mango/40 hover:bg-brand-mango/5"
                    >
                      <span className="block text-sm font-semibold text-brand-black">{checkpoint.title}</span>
                      <span className="mt-1 block text-xs text-brand-black/60">
                        {getCheckpointAreaLabel(checkpoint)} • {getFallbackDate(checkpoint)}
                      </span>
                    </button>
                  ))}
                </div>
                {checkpoints.length > 6 ? (
                  <p className="mt-3 text-xs text-brand-black/55">
                    Showing 6 of {checkpoints.length}. The full list appears below the map section.
                  </p>
                ) : null}
              </div>
            ) : (
              <p className="mt-6 rounded-xl border border-brand-black/10 bg-white px-4 py-3 text-center text-sm text-brand-black/65">
                No checkpoint rows are available for the selected filters.
              </p>
            )}
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

      {/* Empty state */}
      {/* Truly empty - no checkpoints at all */}
      {!isLoading && checkpoints.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/95 rounded-2xl">
          <div className="text-center px-4">
            <MapPin className="mx-auto mb-3 h-12 w-12 text-brand-black/20" />
            <p className="text-lg font-semibold text-brand-black/70">No Checkpoints Found</p>
            <p className="mt-1 text-sm text-brand-black/60">Try adjusting your filters or check back later</p>
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
