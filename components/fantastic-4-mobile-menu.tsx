"use client"

import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { useRef, useState, useEffect } from "react"
import { cn } from "@/lib/utils"

type NavItem = {
  id: string
  label: string
  showBadge?: boolean
  isLive?: boolean
}

type Fantastic4MobileMenuProps = {
  navItems: NavItem[]
  activeSection: string
  onNavClick: (sectionId: string) => void
}

export function Fantastic4MobileMenu({ 
  navItems, 
  activeSection, 
  onNavClick 
}: Fantastic4MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const navContainerRef = useRef<HTMLElement | null>(null)

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      // Save current scroll position
      const scrollY = window.scrollY
      // Lock body scroll
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollY}px`
      document.body.style.width = '100%'
      document.body.style.overflow = 'hidden'
    } else {
      // Restore scroll position
      const scrollY = document.body.style.top
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      document.body.style.overflow = ''
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1)
      }
    }
    
    return () => {
      // Cleanup on unmount
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Reset nav scroll when menu opens
  useEffect(() => {
    if (isOpen && navContainerRef.current) {
      // Force reset scroll position multiple times to ensure it works
      const resetScroll = () => {
        const nav = navContainerRef.current
        if (nav) {
          nav.scrollTop = 0
        }
      }
      
      // Reset immediately
      resetScroll()
      
      // Reset after DOM update
      const timeout1 = setTimeout(resetScroll, 0)
      
      // Reset after animation frames
      requestAnimationFrame(() => {
        resetScroll()
        requestAnimationFrame(() => {
          resetScroll()
        })
      })
      
      // Reset after short delays
      const timeout2 = setTimeout(resetScroll, 50)
      const timeout3 = setTimeout(resetScroll, 150)
      
      return () => {
        clearTimeout(timeout1)
        clearTimeout(timeout2)
        clearTimeout(timeout3)
      }
    }
  }, [isOpen])

  // Callback ref to set scroll immediately when element mounts
  const setNavRef = (element: HTMLElement | null) => {
    navContainerRef.current = element
    if (element && isOpen) {
      // Immediately reset scroll when element is mounted
      element.scrollTop = 0
      requestAnimationFrame(() => {
        element.scrollTop = 0
      })
    }
  }

  const handleNavClick = (sectionId: string) => {
    onNavClick(sectionId)
    setIsOpen(false)
  }

  return (
    <>
      {/* Mobile Hamburger Button — 44px min touch target */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden flex flex-col items-center justify-center min-w-[44px] min-h-[44px] w-11 h-11 -my-1 -mr-1 space-y-1 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-transparent rounded-xl active:opacity-80 transition-opacity"
        aria-label="Toggle menu"
      >
        <motion.span
          className="w-6 h-0.5 block"
          style={{ backgroundColor: "#0E4A80" }}
          animate={{
            rotate: isOpen ? 45 : 0,
            y: isOpen ? 6 : 0,
          }}
          transition={{ duration: 0.2 }}
        />
        <motion.span
          className="w-6 h-0.5 block"
          style={{ backgroundColor: "#0E4A80" }}
          animate={{
            opacity: isOpen ? 0 : 1,
          }}
          transition={{ duration: 0.2 }}
        />
        <motion.span
          className="w-6 h-0.5 block"
          style={{ backgroundColor: "#0E4A80" }}
          animate={{
            rotate: isOpen ? -45 : 0,
            y: isOpen ? -6 : 0,
          }}
          transition={{ duration: 0.2 }}
        />
      </button>

      {/* Mobile Slide Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Slide Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              onAnimationStart={() => {
                // Reset scroll when animation starts
                if (navContainerRef.current) {
                  navContainerRef.current.scrollTop = 0
                }
              }}
              onAnimationComplete={() => {
                // Ensure scroll is reset after animation completes
                if (navContainerRef.current) {
                  navContainerRef.current.scrollTop = 0
                }
              }}
              className="fixed top-0 right-0 z-50 h-screen w-80 max-w-[85vw] md:hidden overflow-hidden touch-none rounded-l-2xl shadow-2xl border-l border-white/20"
              style={{ 
                backgroundColor: 'rgba(1, 5, 11, 0.98)',
                overscrollBehavior: 'none', 
                marginTop: 0, 
                marginRight: 0,
                paddingTop: 'env(safe-area-inset-top, 0)',
                paddingRight: 'env(safe-area-inset-right, 0)',
                paddingBottom: 'env(safe-area-inset-bottom, 0)',
              }}
            >
              <div className="flex flex-col h-full overflow-hidden">
                {/* Drawer Header — safe area and touch targets */}
                <div className="flex items-center justify-between p-4 pt-[max(1rem,env(safe-area-inset-top))] border-b border-white/10 flex-shrink-0 rounded-tl-2xl">
                  <Link 
                    href="/" 
                    className="font-semibold tracking-tight text-white"
                    style={{ fontFamily: '"Audiowide", cursive' }}
                    onClick={() => setIsOpen(false)}
                  >
                    ← Back to Home
                  </Link>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl hover:bg-background/60 active:opacity-80 transition-colors"
                    aria-label="Close menu"
                  >
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Navigation Links */}
                <nav 
                  ref={setNavRef}
                  className="flex-1 p-6 overflow-y-auto min-h-0 overscroll-contain"
                  style={{ 
                    overscrollBehavior: 'contain',
                    overscrollBehaviorY: 'contain',
                    WebkitOverflowScrolling: 'touch',
                    maxHeight: 'calc(100vh - 80px)'
                  }}
                >
                  <ul className="space-y-2">
                    {navItems.map((item, index) => {
                      const isActive = activeSection === item.id
                      return (
                        <motion.li
                          key={item.id}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <button
                            onClick={() => handleNavClick(item.id)}
                            className={cn(
                              "flex items-center w-full min-h-[44px] px-4 py-3 rounded-xl text-base font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring active:opacity-90",
                              isActive 
                                ? "bg-background text-foreground" 
                                : "text-muted-foreground hover:text-foreground hover:bg-background/60"
                            )}
                            style={{ fontFamily: '"Audiowide", cursive' }}
                          >
                            {item.showBadge && (
                              <span className="flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold flex-shrink-0 mr-3" style={{ backgroundColor: 'rgba(14,74,128,0.4)', border: '1px solid #0e4a80', color: '#ffffff' }}>
                                4
                              </span>
                            )}
                            {item.isLive && (
                              <span className="relative flex items-center gap-1.5 flex-shrink-0 mr-3">
                                <span className="relative flex h-2 w-2">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: '#158fd4' }}></span>
                                  <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: '#0e4a80' }}></span>
                                </span>
                                <span className="text-xs font-bold animate-pulse" style={{ color: '#9daecc' }}>
                                  LIVE
                                </span>
                              </span>
                            )}
                            {item.label}
                          </button>
                        </motion.li>
                      )
                    })}
                  </ul>
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

