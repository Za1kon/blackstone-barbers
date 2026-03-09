"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Brooklyn coords — 347 Atlantic Ave
const LAT = 40.6864;
const LNG = -73.9782;

// Custom gold SVG pin marker
const goldIcon = L.divIcon({
  className: "",
  html: `
    <div style="
      width: 36px;
      height: 36px;
      background: #c9a84c;
      border: 3px solid #0a0a0a;
      border-radius: 50% 50% 50% 0;
      transform: rotate(-45deg);
      box-shadow: 0 4px 20px rgba(201,168,76,0.5);
    ">
      <div style="
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        transform: rotate(45deg);
        font-size: 14px;
        font-weight: bold;
        color: #0a0a0a;
      ">✂</div>
    </div>
  `,
  iconSize: [36, 36],
  iconAnchor: [18, 36],
  popupAnchor: [0, -40],
});

export default function MapComponent() {
  // Fix Leaflet default icon path issue with Next.js
  useEffect(() => {
    // Leaflet icons path fix
    delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
      iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
      shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    });
  }, []);

  return (
    <>
      <style>{`
        .leaflet-container {
          background: #0a0a0a !important;
          height: 100%;
          width: 100%;
        }
        .leaflet-popup-content-wrapper {
          background: #141414;
          color: #f5f5f5;
          border: 1px solid #222;
          border-radius: 0;
          box-shadow: 0 8px 32px rgba(0,0,0,0.6);
        }
        .leaflet-popup-tip {
          background: #141414;
        }
        .leaflet-popup-close-button {
          color: #888 !important;
        }
        .leaflet-popup-close-button:hover {
          color: #c9a84c !important;
        }
        .leaflet-control-zoom a {
          background: #141414 !important;
          color: #f5f5f5 !important;
          border-color: #333 !important;
        }
        .leaflet-control-zoom a:hover {
          background: #c9a84c !important;
          color: #0a0a0a !important;
        }
        .leaflet-control-attribution {
          background: rgba(10,10,10,0.8) !important;
          color: #444 !important;
          font-size: 10px;
        }
        .leaflet-control-attribution a {
          color: #666 !important;
        }
      `}</style>
      <MapContainer
        center={[LAT, LNG]}
        zoom={15}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
        zoomControl={true}
      >
        {/* Stadia Maps dark tiles */}
        <TileLayer
          attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a>, &copy; <a href="https://openstreetmap.org">OpenStreetMap</a>'
          url={`https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png?api_key=${process.env.NEXT_PUBLIC_STADIA_MAPS_API_KEY}`}
        />
        <Marker position={[LAT, LNG]} icon={goldIcon}>
          <Popup>
            <div style={{ fontFamily: "sans-serif", lineHeight: "1.6", padding: "4px" }}>
              <strong style={{ color: "#c9a84c", fontSize: "14px", display: "block", marginBottom: "4px" }}>
                Blackstone Barbers
              </strong>
              <span style={{ color: "#888", fontSize: "12px" }}>
                347 Atlantic Ave<br />Brooklyn, NY 11217
              </span>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </>
  );
}