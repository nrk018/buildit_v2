"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import Link from "next/link"
import { ChevronDown } from "lucide-react"

export default function HeroLogo() {
  return (
    <section
      className="relative flex h-[calc(100dvh-64px)] snap-start items-center justify-center overflow-hidden bg-background"
      aria-label="BuildIt hero"
    >
      {/* Event Notification Banner — z-30 so mobile nav drawer (z-40/z-50) stays on top when open */}
      <Link
        href="/fantastic-4"
        className="absolute top-0 left-0 right-0 z-30 flex items-center justify-center px-4 py-3 bg-blue-500/30 backdrop-blur-lg border-b border-blue-400/40 hover:bg-blue-500/40 transition-all duration-300 shadow-lg cursor-pointer"
      >
        <div className="flex items-center gap-2.5 text-white font-bold text-sm md:text-base">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          <span className="tracking-wide">EVENT: </span>
          <div className="flex items-center gap-1">
            <span className="font-bold leading-tight" style={{ fontFamily: '"Rock Salt", cursive' }}>
              Fantastic
            </span>
            <div className="relative flex items-center justify-center overflow-visible">
              <span className="flex items-center justify-center w-4 h-4 md:w-5 md:h-5 rounded-full bg-sky-400 border-2 border-white">
                <span className="text-xs md:text-sm font-bold" style={{ fontFamily: '"Rock Salt", cursive', transform: 'scale(1.3)', position: 'relative', zIndex: 10, color: '#0284c7' }}>
                  4
                </span>
              </span>
            </div>
          </div>
          <span className="tracking-wide"> HAS NOW BEGUN</span>
          <ChevronDown className="w-4 h-4 rotate-[-90deg] opacity-80" />
        </div>
      </Link>

      {/* Ambient glows */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="absolute -top-16 left-1/4 h-52 w-52 rounded-full blur-3xl opacity-20"
          style={{ backgroundColor: "var(--brand-yellow)" }}
        />
        <div
          className="absolute bottom-0 right-1/4 h-56 w-56 rounded-full blur-3xl opacity-10"
          style={{ backgroundColor: "var(--brand-yellow)" }}
        />
      </div>

      <div className="relative z-10 mx-auto flex flex-col md:flex-row max-w-7xl items-center px-4">
        {/* Logo - Full width on mobile, half width on desktop */}
        <div className="w-full md:w-1/2 flex justify-center items-center min-h-[40vh] md:min-h-[calc(100dvh-64px)]">
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex justify-center items-center w-full h-full"
          >
            <Image
              alt="BuildIt logo with paper plane"
              src="/images/builditlogo.png"
              width={600}
              height={600}
              className="w-full h-full max-w-[80%] md:max-w-[90%] max-h-[80%] md:max-h-[90%] object-contain rounded-2xl shadow-2xl"
              priority
            />
          </motion.div>
        </div>

        {/* Text Content - Full width on mobile, half width on desktop */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center md:items-start pl-0 md:pl-8">
          <div className="text-4xl font-bold md:text-6xl lg:text-7xl text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, scale: 0.3 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.3, ease: "easeOut" }}
              className="block md:block"
            >
              BUILD.
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.3 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.3, ease: "easeOut" }}
              className="inline md:block"
            >
              {" "}LEARN.
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.3 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.3, ease: "easeOut" }}
              className="inline md:block"
            >
              {" "}SHIP.
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5, ease: "easeOut" }}
            className="mt-6 text-lg text-muted-foreground md:text-xl max-w-lg text-center md:text-left"
          >
            A builder club at Manipal University Jaipur — where students build real-world projects, learn from industry experts, and ship innovative solutions.
          </motion.p>
        </div>
      </div>

      {/* Floating Arrow Down Button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.6 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => {
          const nextSection = document.querySelector('[data-section="1"]')
          nextSection?.scrollIntoView({ behavior: 'smooth' })
        }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 p-3 rounded-full bg-card/80 backdrop-blur-sm border border-border/50 hover:bg-card/90 transition-all duration-300 shadow-lg"
        aria-label="Scroll to next section"
      >
        <ChevronDown className="w-6 h-6 text-foreground animate-bounce" />
      </motion.button>
    </section>
  )
}
