// install npm install leaflet react-leaflet
/* index.css */
// @import "leaflet/dist/leaflet.css";

import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { useState, useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// ---------- 1.  Leaflet icon fix ----------
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// ---------- 2.  Helper for map click ----------
const LocationMarker = ({ onPick }) => {
  useMapEvents({
    click(e) {
      onPick(e.latlng);
    },
  });
  return null;
};

// ---------- 3.  Main component ----------
const LocationPicker = () => {
  const [position, setPosition] = useState(null);        // marker lat/lng
  const [mapCenter, setMapCenter] = useState([20.6, 78.9]); // start center (India)
  const [address, setAddress] = useState("");            // text input
  const [loading, setLoading] = useState(false);         // geocode spinner

  // 3‑A  ►  Try browser GPS once at mount
  useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setMapCenter([latitude, longitude]);
        setPosition({ lat: latitude, lng: longitude });
      },
      () => console.log("GPS denied")
    );
  }, []);

  // 3‑B  ►  Geocode address via Nominatim
  const geocodeAddress = async () => {
    if (!address.trim()) return;
    setLoading(true);
    try {
      const q = encodeURIComponent(address.trim());
      const url = `https://nominatim.openstreetmap.org/search?format=json&q=${q}`;
      const res = await fetch(url, { headers: { "User-Agent": "demo" } });
      const data = await res.json();
      if (data.length === 0) {
        alert("Address not found");
      } else {
        const { lat, lon } = data[0];
        const latNum = parseFloat(lat);
        const lonNum = parseFloat(lon);
        setMapCenter([latNum, lonNum]);
        setPosition({ lat: latNum, lng: lonNum });
      }
    } catch (err) {
      console.error(err);
      alert("Error reaching geocoder");
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter") geocodeAddress();
  };

  return (
    <div className="min-h-screen w-screen flex flex-col items-center bg-gray-100 p-4">
      <h2 className="text-2xl font-semibold mb-4">📍 Pick / Search Location</h2>

      {/* ---------- 3‑C  Address input ---------- */}
      <div className="flex gap-2 w-full max-w-xl mb-4">
        <input
          type="text"
          placeholder="Type address…"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          onKeyDown={handleKey}
          className="flex-1 border p-2 rounded"
        />
        <button
          onClick={geocodeAddress}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-60"
        >
          {loading ? "Locating…" : "Locate"}
        </button>
      </div>

      {/* ---------- 3‑D  Leaflet map ---------- */}
      <MapContainer
        center={mapCenter}
        zoom={13}
        style={{ height: "70vh", width: "80vw" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <LocationMarker onPick={(latlng) => setPosition(latlng)} />
        {position && <Marker position={position} />}
      </MapContainer>

      {/* ---------- 3‑E  Lat/Lng read‑out ---------- */}
      {position && (
        <div className="mt-4 text-lg font-medium text-gray-700">
          🌐 Lat&nbsp;{position.lat.toFixed(5)} | Lng&nbsp;{position.lng.toFixed(5)}
        </div>
      )}
    </div>
  );
};

export default LocationPicker;