"use client";

import { motion } from "motion/react";

export function ChatAnimation() {
  return (
    <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-xl p-0">
      {/* Light mode SVG - with orange theme */}
      <motion.svg
        width="100%"
        height="300"
        viewBox="0 0 400 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto dark:hidden"
        style={{
          background: "linear-gradient(180deg, #f8f9fa 0%, #ffffff 100%)",
        }}
      >
        {/* Form container - Light */}
        <motion.rect
          x="50"
          y="30"
          width="300"
          height="240"
          rx="16"
          fill="#ffffff"
          stroke="#ff6b00"
          strokeOpacity="0.3"
          strokeWidth="2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        />

        {/* Form header - Light */}
        <motion.rect
          x="50"
          y="30"
          width="300"
          height="50"
          rx="16"
          fill="#ff6b00"
          fillOpacity="0.1"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        />

        {/* Form title text - Light */}
        <motion.rect
          x="70"
          y="50"
          width="150"
          height="12"
          rx="3"
          fill="#ff6b00"
          fillOpacity="0.6"
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: 150 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        />

        {/* System message - Light */}
        <motion.g
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <rect
            x="70"
            y="100"
            width="200"
            height="50"
            rx="12"
            fill="#ff6b00"
            fillOpacity="0.1"
          />
          <rect
            x="80"
            y="110"
            width="180"
            height="8"
            rx="4"
            fill="#ff6b00"
            fillOpacity="0.5"
          />
          <rect
            x="80"
            y="126"
            width="120"
            height="8"
            rx="4"
            fill="#ff6b00"
            fillOpacity="0.3"
          />
        </motion.g>

        {/* User message - Light */}
        <motion.g
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
        >
          <rect
            x="120"
            y="170"
            width="210"
            height="50"
            rx="12"
            fill="#ff6b00"
            fillOpacity="0.2"
          />
          <rect
            x="135"
            y="182"
            width="180"
            height="8"
            rx="4"
            fill="#ff6b00"
            fillOpacity="0.6"
          />
          <rect
            x="135"
            y="198"
            width="140"
            height="8"
            rx="4"
            fill="#ff6b00"
            fillOpacity="0.4"
          />
        </motion.g>

        {/* Input field - Light */}
        <motion.g
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.6 }}
        >
          <rect
            x="70"
            y="235"
            width="220"
            height="45"
            rx="22.5"
            fill="#ffffff"
            stroke="#ff6b00"
            strokeOpacity="0.3"
            strokeWidth="2"
          />
          <rect x="90" y="255" width="120" height="7" rx="3.5" fill="#e2e8f0" />
          <circle cx="310" cy="258" r="18" fill="#ff6b00" />
          {/* Send icon - Light */}
          <path
            d="M304 258L316 258M316 258L310 252M316 258L310 264"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.g>

        {/* Typing indicator animation - Light */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 1, 1, 0],
            transition: {
              repeat: Infinity,
              duration: 2,
              times: [0, 0.2, 0.8, 1],
              delay: 1.8,
            },
          }}
        >
          <circle cx="80" cy="220" r="4" fill="#ff6b00" />
          <circle cx="95" cy="220" r="4" fill="#ff6b00" />
          <circle cx="110" cy="220" r="4" fill="#ff6b00" />
        </motion.g>
      </motion.svg>

      {/* Dark mode SVG */}
      <motion.svg
        width="100%"
        height="300"
        viewBox="0 0 400 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto hidden dark:block"
        style={{
          background: "linear-gradient(180deg, #121212 0%, #0a0a0a 100%)",
        }}
      >
        {/* Form container */}
        <motion.rect
          x="50"
          y="30"
          width="300"
          height="240"
          rx="16"
          fill="#1a1a1a"
          stroke="#ff6b00"
          strokeOpacity="0.3"
          strokeWidth="2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        />

        {/* Form header */}
        <motion.rect
          x="50"
          y="30"
          width="300"
          height="50"
          rx="16"
          fill="#ff6b00"
          fillOpacity="0.1"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        />

        {/* Form title text */}
        <motion.rect
          x="70"
          y="50"
          width="150"
          height="12"
          rx="3"
          fill="#ff6b00"
          fillOpacity="0.6"
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: 150 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        />

        {/* System message */}
        <motion.g
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <rect
            x="70"
            y="100"
            width="200"
            height="50"
            rx="12"
            fill="#ff6b00"
            fillOpacity="0.1"
          />
          <rect
            x="80"
            y="110"
            width="180"
            height="8"
            rx="4"
            fill="#ff6b00"
            fillOpacity="0.5"
          />
          <rect
            x="80"
            y="126"
            width="120"
            height="8"
            rx="4"
            fill="#ff6b00"
            fillOpacity="0.3"
          />
        </motion.g>

        {/* User message */}
        <motion.g
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
        >
          <rect
            x="120"
            y="170"
            width="210"
            height="50"
            rx="12"
            fill="#ff6b00"
            fillOpacity="0.2"
          />
          <rect
            x="135"
            y="182"
            width="180"
            height="8"
            rx="4"
            fill="#ff6b00"
            fillOpacity="0.6"
          />
          <rect
            x="135"
            y="198"
            width="140"
            height="8"
            rx="4"
            fill="#ff6b00"
            fillOpacity="0.4"
          />
        </motion.g>

        {/* Input field */}
        <motion.g
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.6 }}
        >
          <rect
            x="70"
            y="235"
            width="220"
            height="45"
            rx="22.5"
            fill="#1a1a1a"
            stroke="#ff6b00"
            strokeOpacity="0.3"
            strokeWidth="2"
          />
          <rect x="90" y="255" width="120" height="7" rx="3.5" fill="#333333" />
          <circle cx="310" cy="258" r="18" fill="#ff6b00" />
          {/* Send icon */}
          <path
            d="M304 258L316 258M316 258L310 252M316 258L310 264"
            stroke="#1a1a1a"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.g>

        {/* Typing indicator animation */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 1, 1, 0],
            transition: {
              repeat: Infinity,
              duration: 2,
              times: [0, 0.2, 0.8, 1],
              delay: 1.8,
            },
          }}
        >
          <circle cx="80" cy="220" r="4" fill="#ff6b00" />
          <circle cx="95" cy="220" r="4" fill="#ff6b00" />
          <circle cx="110" cy="220" r="4" fill="#ff6b00" />
        </motion.g>
      </motion.svg>
    </div>
  );
}
