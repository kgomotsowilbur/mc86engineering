"use client";

import "leaflet/dist/leaflet.css";
import styles from "./css/leafletmap.module.css";
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from "react-leaflet";
import L from "leaflet";

const GMAPS_URL =
  "https://maps.google.com/?q=17+Makriel+Rd,+Wadeville,+Germiston,+1422,+South+Africa";

const STADIA_API_KEY = process.env.NEXT_PUBLIC_STADIA_API_KEY!;

const mainIcon = L.icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const COORDS: [number, number] = [-26.2785, 28.1835];

export default function LeafletMap() {
  return (
    <div className={styles.mapWrapper} style={{ position: "relative", height: "450px", width: "100%" }}>
      {/* Location card overlay */}
      <div
        style={{
          position: "absolute",
          top: "12px",
          left: "12px",
          zIndex: 20,
          background: "white",
          borderRadius: "10px",
          padding: "10px 14px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
          maxWidth: "220px",
          pointerEvents: "none",
        }}
      >
        <p style={{ margin: 0, fontWeight: 700, fontSize: "13px", color: "#1a1a1a" }}>
          MC86 Engineering & Construction
        </p>
        <p style={{ margin: "4px 0 0", fontSize: "11px", color: "#666", lineHeight: "1.4" }}>
          17 Makriel Rd, Wadeville<br />
          Germiston, 1422<br />
          South Africa
        </p>
        <a
          href={GMAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-block",
            marginTop: "6px",
            fontSize: "11px",
            color: "#4A7C59",
            fontWeight: 600,
            pointerEvents: "all",
            textDecoration: "none",
          }}
        >
          Open in Google Maps ↗
        </a>
      </div>

      <MapContainer
        center={COORDS}
        zoom={15}
        scrollWheelZoom={true}
        dragging={true}
        doubleClickZoom={true}
        zoomControl={false}
        style={{ height: "450px", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url={`https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png?api_key=${STADIA_API_KEY}`}
          maxZoom={20}
        />

        <ZoomControl position="bottomright" />

        <Marker position={COORDS} icon={mainIcon}>
          <Popup>
            <strong>MC86 Engineering & Construction</strong>
            <br />
            17 Makriel Rd, Wadeville, Germiston
            <br />
            <a
              href={GMAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#4A7C59", fontWeight: 600 }}
            >
              Open in Google Maps ↗
            </a>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}