import React, { useState } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  useMap,
} from 'react-leaflet';
import L from 'leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';

// ---------- Leaflet icon fix ----------
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// ---------- Helper to fly map ----------
const FlyTo = ({ coords }) => {
  const map = useMap();
  if (coords) map.flyTo(coords, 13);
  return null;
};

const RouteMap = () => {
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [sourceCoord, setSourceCoord] = useState(null);
  const [destCoord, setDestCoord] = useState(null);
  const [routeCoords, setRouteCoords] = useState([]);
  const [loading, setLoading] = useState(false);

  // ---------- Geocode with Nominatim ----------
  const geocode = async (place) => {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
      place
    )}`;
    const res = await axios.get(url, {
      headers: { 'User-Agent': 'react-map-app' },
    });
    if (!res.data.length) throw new Error('Location not found');
    return {
      lat: parseFloat(res.data[0].lat),
      lng: parseFloat(res.data[0].lon),
    };
  };

  // ---------- Fetch route from OpenRouteService ----------
  const fetchRoute = async (src, dst) => {
    const res = await axios.post(
      'https://api.openrouteservice.org/v2/directions/driving-car/geojson',
      { coordinates: [[src.lng, src.lat], [dst.lng, dst.lat]] },
      {
        headers: {
          Authorization: 'eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6IjZjOTg2MDYyZDZiNDRlNGJiYTI4OTE2OTg4NmFjOGNhIiwiaCI6Im11cm11cjY0In0=',
          'Content-Type': 'application/json',
        },
      }
    );
    const coords = res.data.features[0].geometry.coordinates.map((c) => [
      c[1],
      c[0],
    ]);
    setRouteCoords(coords);
  };

  // ---------- Use current browser location ----------
  const useMyLocation = () => {
    if (!navigator.geolocation) return alert('Geolocation not supported');
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const here = { lat: latitude, lng: longitude };
        setSourceCoord(here);
        setSource('My Location');           // show placeholder text
      },
      () => alert('Permission denied')
    );
  };

  // ---------- Main “Show Route” handler ----------
  const handleLocate = async () => {
    if ((!source && !sourceCoord) || !destination) return;
    setLoading(true);
    try {
      const src = sourceCoord || (await geocode(source));
      const dst = await geocode(destination);
      setSourceCoord(src);
      setDestCoord(dst);
      await fetchRoute(src, dst);
    } catch (err) {
      alert('Error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4">🗺️ Route Finder</h2>

      {/* ---------- Inputs & “My Location” button ---------- */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4 w-full max-w-2xl">
        <div className="flex flex-1 gap-2">
          <input
            type="text"
            placeholder="Source"
            value={source}
            onChange={(e) => {
              setSource(e.target.value);
              setSourceCoord(null); // reset coord if user types again
            }}
            className="flex-1 border p-2 rounded"
          />
          <button
            onClick={useMyLocation}
            className="px-3 bg-green-600 text-white rounded whitespace-nowrap"
            type="button"
          >
            📍 My Location
          </button>
        </div>

        <input
          type="text"
          placeholder="Destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="flex-1 border p-2 rounded"
        />

        <button
          onClick={handleLocate}
          className="px-4 py-2 bg-blue-600 text-white rounded"
          disabled={loading}
        >
          {loading ? 'Loading…' : 'Show Route'}
        </button>
      </div>

      {/* ---------- Map ---------- */}
      <MapContainer
        center={[20.5937, 78.9629]}
        zoom={5}
        scrollWheelZoom
        style={{ height: '70vh', width: '90vw' }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {sourceCoord && (
          <>
            <Marker position={[sourceCoord.lat, sourceCoord.lng]} />
            <FlyTo coords={[sourceCoord.lat, sourceCoord.lng]} />
          </>
        )}
        {destCoord && <Marker position={[destCoord.lat, destCoord.lng]} />}
        {routeCoords.length > 0 && (
          <Polyline positions={routeCoords} color="red" />
        )}
      </MapContainer>
    </div>
  );
};

export default RouteMap;