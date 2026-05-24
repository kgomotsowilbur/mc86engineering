"use client";

import { useState } from "react";

interface WhatsAppFloatProps {
  phoneNumber: string; // e.g. "27821234567" (no + or spaces)
  message?: string;    // pre-filled message (optional)
}

export default function WhatsAppFloat({
  phoneNumber,
  message = "Hello! I'd like to enquire about your services.",
}: WhatsAppFloatProps) {
  const [hovered, setHovered] = useState(false);

  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "fixed",
        bottom: "28px",
        right: "28px",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        gap: "10px",
        textDecoration: "none",
      }}
    >
      {/* Tooltip label */}
      <span
        style={{
          background: "#fff",
          color: "#111",
          fontSize: "13px",
          fontWeight: 600,
          padding: "6px 12px",
          borderRadius: "20px",
          boxShadow: "0 4px 16px rgba(0,0,0,0.13)",
          whiteSpace: "nowrap",
          opacity: hovered ? 1 : 0,
          transform: hovered ? "translateX(0)" : "translateX(8px)",
          transition: "opacity 0.22s ease, transform 0.22s ease",
          pointerEvents: "none",
          fontFamily: "inherit",
          letterSpacing: "0.01em",
        }}
      >
        Chat with us
      </span>

      {/* Button */}
      <span
        style={{
          width: "58px",
          height: "58px",
          borderRadius: "50%",
          background: "#25D366",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: hovered
            ? "0 6px 28px rgba(37,211,102,0.55)"
            : "0 4px 18px rgba(37,211,102,0.38)",
          transform: hovered ? "scale(1.10)" : "scale(1)",
          transition: "box-shadow 0.22s ease, transform 0.22s ease",
          flexShrink: 0,
        }}
      >
        {/* Pulse ring */}
        <span
          style={{
            position: "absolute",
            width: "58px",
            height: "58px",
            borderRadius: "50%",
            background: "rgba(37,211,102,0.35)",
            animation: "wa-pulse 2.2s ease-out infinite",
          }}
        />

        {/* WhatsApp SVG icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          width="30"
          height="30"
          fill="white"
          style={{ position: "relative", zIndex: 1 }}
        >
          <path d="M16.003 2C8.28 2 2 8.28 2 16.003c0 2.48.65 4.9 1.89 7.03L2 30l7.15-1.87A13.94 13.94 0 0016.003 30C23.72 30 30 23.72 30 16.003 30 8.28 23.72 2 16.003 2zm0 25.5a11.44 11.44 0 01-5.83-1.6l-.42-.25-4.25 1.11 1.14-4.13-.27-.43A11.47 11.47 0 014.5 16.003C4.5 9.66 9.66 4.5 16.003 4.5c6.34 0 11.497 5.16 11.497 11.503S22.343 27.5 16.003 27.5zm6.3-8.61c-.34-.17-2.02-1-2.34-1.11-.32-.11-.55-.17-.78.17-.23.34-.89 1.11-1.09 1.34-.2.23-.4.26-.74.09-.34-.17-1.44-.53-2.74-1.69a10.3 10.3 0 01-1.9-2.36c-.2-.34-.02-.52.15-.69.15-.15.34-.4.51-.6.17-.2.23-.34.34-.57.11-.23.06-.43-.03-.6-.09-.17-.78-1.88-1.07-2.58-.28-.68-.57-.59-.78-.6l-.67-.01c-.23 0-.6.09-.91.43-.31.34-1.19 1.17-1.19 2.85 0 1.68 1.22 3.3 1.39 3.53.17.23 2.4 3.66 5.82 5.14.81.35 1.44.56 1.93.72.81.26 1.55.22 2.13.13.65-.1 2.02-.83 2.3-1.62.29-.8.29-1.48.2-1.62-.08-.14-.31-.23-.65-.4z" />
        </svg>
      </span>

      <style>{`
        @keyframes wa-pulse {
          0%   { transform: scale(1);   opacity: 0.7; }
          70%  { transform: scale(1.55); opacity: 0; }
          100% { transform: scale(1.55); opacity: 0; }
        }
      `}</style>
    </a>
  );
}