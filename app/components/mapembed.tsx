"use client";

import dynamic from "next/dynamic";

// Leaflet must be dynamically imported — it uses window and breaks SSR
const Map = dynamic(() => import("./leafletmap"), { ssr: false });

export default function MapEmbed() {
  return (
    <div className="rounded-2xl overflow-hidden border border-border shadow-lg h-[450px]">
      <Map />
    </div>
  );
}