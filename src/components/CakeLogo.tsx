import React from "react";

interface CakeLogoProps {
  className?: string;
  size?: number;
}

export default function CakeLogo({ className = "", size = 32 }: CakeLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`select-none ${className}`}
    >
      <defs>
        {/* Gradients for candles, flames, frosting and metal */}
        <linearGradient id="flameGrad" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#f97316" />
          <stop offset="50%" stopColor="#facc15" />
          <stop offset="100%" stopColor="#fef08a" />
        </linearGradient>

        <linearGradient id="candleGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="50%" stopColor="#60a5fa" />
          <stop offset="100%" stopColor="#2563eb" />
        </linearGradient>

        <linearGradient id="frostingGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="40%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>

        <linearGradient id="cakeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#f8fafc" />
          <stop offset="100%" stopColor="#cbd5e1" />
        </linearGradient>

        <linearGradient id="bowGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1e40af" />
        </linearGradient>

        <linearGradient id="keyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#94a3b8" />
          <stop offset="100%" stopColor="#475569" />
        </linearGradient>

        <filter id="eyeGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>

        <filter id="flameGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* BACKGROUND FLOATING CONFETTI */}
      {/* Pink pill left */}
      <rect x="120" y="120" width="16" height="8" rx="4" transform="rotate(-15 120 120)" fill="#f43f5e" />
      {/* Yellow pill right */}
      <rect x="360" y="130" width="16" height="8" rx="4" transform="rotate(30 360 130)" fill="#fbbf24" />
      {/* Blue pill far left */}
      <path d="M88 175 C88 165, 110 180, 112 190" stroke="#3b82f6" strokeWidth="8" strokeLinecap="round" />
      {/* Orange circle far right */}
      <circle cx="410" cy="180" r="10" fill="#f97316" />
      {/* Green spark */}
      <path d="M108 244 L114 244 M111 241 L111 247" stroke="#10b981" strokeWidth="3" strokeLinecap="round" />
      {/* Small stars */}
      <circle cx="218" cy="100" r="3" fill="#facc15" />
      {/* Yellow circle left */}
      <circle cx="84" cy="278" r="6" fill="#facc15" />
      {/* Purple capsule far left */}
      <rect x="84" y="310" width="14" height="7" rx="3.5" transform="rotate(45 84 310)" fill="#c084fc" />

      {/* THREE CANDLES */}
      {/* LEFT CANDLE */}
      <g transform="translate(-10, 0)">
        {/* Flame */}
        <path
          d="M 194 115 C 180 85, 194 55, 194 55 C 194 55, 208 85, 194 115 Z"
          fill="url(#flameGrad)"
          filter="url(#flameGlow)"
        />
        {/* Wick */}
        <line x1="194" y1="115" x2="194" y2="130" stroke="#475569" strokeWidth="3" />
        {/* Candle Body */}
        <rect x="180" y="130" width="28" height="58" rx="4" fill="url(#candleGrad)" />
        {/* Stripes */}
        <path d="M180 142 L208 134 M180 158 L208 150 M180 174 L208 166 M180 188 L208 180" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" />
      </g>

      {/* MIDDLE CANDLE */}
      <g transform="translate(0, -15)">
        {/* Flame */}
        <path
          d="M 256 100 C 240 65, 256 30, 256 30 C 256 30, 272 65, 256 100 Z"
          fill="url(#flameGrad)"
          filter="url(#flameGlow)"
        />
        {/* Wick */}
        <line x1="256" y1="100" x2="256" y2="115" stroke="#475569" strokeWidth="3" />
        {/* Candle Body */}
        <rect x="241" y="115" width="30" height="66" rx="4" fill="url(#candleGrad)" />
        {/* Stripes */}
        <path d="M241 129 L271 120 M241 147 L271 138 M241 165 L271 156 M241 181 L271 172" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" />
      </g>

      {/* RIGHT CANDLE */}
      <g transform="translate(10, 0)">
        {/* Flame */}
        <path
          d="M 318 115 C 304 85, 318 55, 318 55 C 318 55, 332 85, 318 115 Z"
          fill="url(#flameGrad)"
          filter="url(#flameGlow)"
        />
        {/* Wick */}
        <line x1="318" y1="115" x2="318" y2="130" stroke="#475569" strokeWidth="3" />
        {/* Candle Body */}
        <rect x="304" y="130" width="28" height="58" rx="4" fill="url(#candleGrad)" />
        {/* Stripes */}
        <path d="M304 142 L332 134 M304 158 L332 150 M304 174 L332 166 M304 188 L332 180" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" />
      </g>


      {/* WINDING KEY / LEVER ON RIGHT */}
      <g>
        {/* Silver shaft */}
        <rect x="390" y="275" width="35" height="10" rx="4" fill="#cbd5e1" transform="rotate(-15 390 275)" />
        {/* Blue knob */}
        <circle cx="425" cy="245" r="18" fill="url(#candleGrad)" stroke="#1d4ed8" strokeWidth="3" />
        <circle cx="420" cy="240" r="6" fill="#93c5fd" opacity="0.6" />
      </g>


      {/* MAIN CAKE BODY */}
      {/* Base shadow */}
      <ellipse cx="256" cy="385" rx="145" ry="30" fill="#000000" opacity="0.4" />

      {/* Cake Main White Layer */}
      <path
        d="M 120 220 
           L 120 370 
           Q 256 425, 392 370 
           L 392 220 
           Z"
        fill="url(#cakeGrad)"
        stroke="#0f172a"
        strokeWidth="6"
        strokeLinejoin="round"
      />

      {/* Decorative sprinkles on the white body side */}
      <circle cx="150" cy="275" r="5" fill="#f43f5e" />
      <circle cx="154" cy="325" r="5" fill="#eab308" />
      <rect x="365" y="308" width="10" height="5" rx="2" transform="rotate(30 365 308)" fill="#0ea5e9" />
      <rect x="140" y="300" width="10" height="5" rx="2" transform="rotate(-20 140 300)" fill="#10b981" />
      <circle cx="360" cy="285" r="4" fill="#c084fc" />

      {/* Dripping Blue Icing / Frosting Top */}
      <path
        d="M 117 215 
           C 117 215, 130 255, 150 255 
           C 170 255, 175 230, 195 230 
           C 215 230, 220 265, 245 265 
           C 270 265, 280 235, 305 235 
           C 330 235, 335 260, 355 260 
           C 375 260, 395 215, 395 215
           L 395 190
           Q 256 145, 117 190
           Z"
        fill="url(#frostingGrad)"
        stroke="#0f172a"
        strokeWidth="6"
        strokeLinejoin="round"
      />

      {/* Sprinkles on Top Frosting */}
      <rect x="145" y="195" width="12" height="6" rx="3" transform="rotate(15 145 195)" fill="#ffffff" />
      <rect x="180" y="200" width="12" height="6" rx="3" transform="rotate(-30 180 200)" fill="#f43f5e" />
      <rect x="225" y="210" width="12" height="6" rx="3" transform="rotate(45 225 210)" fill="#fbbf24" />
      <circle cx="265" cy="205" r="4" fill="#ffffff" />
      <rect x="290" y="210" width="12" height="6" rx="3" transform="rotate(-15 290 210)" fill="#a855f7" />
      <rect x="330" y="200" width="12" height="6" rx="3" transform="rotate(25 330 200)" fill="#eab308" />
      <circle cx="355" cy="195" r="4" fill="#fb7185" />


      {/* THE DIGITAL ROBOT SCREEN FACEPLATE */}
      <rect
        x="170"
        y="255"
        width="172"
        height="85"
        rx="26"
        fill="#0f172a"
        stroke="#1e293b"
        strokeWidth="5"
      />

      {/* Glowing Happy Eyes */}
      <g filter="url(#eyeGlow)">
        {/* Left Eye: Curved smiling path */}
        <path
          d="M 195 290 Q 210 274, 225 290"
          stroke="#38bdf8"
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
        />
        {/* Right Eye: Curved smiling path */}
        <path
          d="M 287 290 Q 302 274, 317 290"
          stroke="#38bdf8"
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
        />
        {/* Smiling Mouth */}
        <path
          d="M 240 312 Q 256 322, 272 312"
          stroke="#38bdf8"
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
        />
      </g>

      {/* Pink Cheeks */}
      <ellipse cx="188" cy="303" rx="8" ry="4" fill="#fb7185" opacity="0.8" />
      <ellipse cx="324" cy="303" rx="8" ry="4" fill="#fb7185" opacity="0.8" />


      {/* THE BOTTOM DECORATIVE BLUE BOW */}
      <g transform="translate(0, 10)">
        {/* Left loop of the bow */}
        <path
          d="M 256 365 
             C 210 330, 165 345, 175 385 
             C 185 415, 220 400, 256 385 Z"
          fill="url(#bowGrad)"
          stroke="#0f172a"
          strokeWidth="5"
          strokeLinejoin="round"
        />

        {/* Right loop of the bow */}
        <path
          d="M 256 365 
             C 302 330, 347 345, 337 385 
             C 327 415, 292 400, 256 385 Z"
          fill="url(#bowGrad)"
          stroke="#0f172a"
          strokeWidth="5"
          strokeLinejoin="round"
        />

        {/* Bow Tails */}
        <path
          d="M 215 385 L 180 425 L 210 420 Z"
          fill="#1e40af"
          stroke="#0f172a"
          strokeWidth="4"
          strokeLinejoin="round"
        />
        <path
          d="M 297 385 L 332 425 L 302 420 Z"
          fill="#1e40af"
          stroke="#0f172a"
          strokeWidth="4"
          strokeLinejoin="round"
        />

        {/* Central Knot */}
        <rect
          x="234"
          y="358"
          width="44"
          height="34"
          rx="12"
          fill="#1d4ed8"
          stroke="#0f172a"
          strokeWidth="5"
        />

        {/* Small White Discord Controller Face in the center of the knot */}
        <path
          d="M 246 373 
             C 246 368, 266 368, 266 373 
             C 266 378, 261 382, 256 382 
             C 251 382, 246 378, 246 373 Z"
          fill="#ffffff"
        />
        {/* Controller antenna details/eyes */}
        <circle cx="251" cy="374" r="1.5" fill="#1d4ed8" />
        <circle cx="261" cy="374" r="1.5" fill="#1d4ed8" />
        <path d="M248 370 L245 367 M264 370 L267 367" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
      </g>
    </svg>
  );
}
