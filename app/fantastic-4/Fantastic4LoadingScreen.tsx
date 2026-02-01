"use client"

import Image from "next/image"

export default function Fantastic4LoadingScreen() {
  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-center"
      style={{ backgroundColor: "#158fd4" }}
      aria-label="Loading Fantastic 4"
    >
      <Image
        src="/images/builditlogo.png"
        alt="BuildIt"
        width={200}
        height={200}
        className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 object-contain opacity-95"
        priority
      />
      <div
        className="mt-6 text-lg sm:text-xl font-semibold uppercase tracking-wider"
        style={{ color: "#ffffff", fontFamily: '"Audiowide", cursive' }}
      >
        Fantastic 4
      </div>
      <div className="mt-4 flex gap-1.5" aria-hidden>
        <span
          className="w-2 h-2 rounded-full animate-pulse"
          style={{ backgroundColor: "#ffffff", animationDelay: "0ms" }}
        />
        <span
          className="w-2 h-2 rounded-full animate-pulse"
          style={{ backgroundColor: "#ffffff", animationDelay: "150ms" }}
        />
        <span
          className="w-2 h-2 rounded-full animate-pulse"
          style={{ backgroundColor: "#ffffff", animationDelay: "300ms" }}
        />
      </div>
    </div>
  )
}
