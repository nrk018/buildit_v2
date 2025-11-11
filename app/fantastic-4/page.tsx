"use client"

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { useRef, useState, useEffect } from "react"
import { 
  Calendar, 
  Trophy, 
  Code, 
  Smartphone, 
  Globe, 
  Brain, 
  Clock, 
  Users, 
  CheckCircle2, 
  Award,
  Lightbulb,
  Zap,
  Mail,
  Phone,
  ChevronRight,
  Sparkles,
  Target,
  Presentation,
  Download,
  ArrowRight,
  Lock
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect"
import { StardustButton } from "@/components/ui/stardust-button"
import { problemStatements } from "@/data/fantastic4-problems"
import { generateProblemStatementsPDF } from "@/lib/pdf-generator"
import { cn } from "@/lib/utils"

const domains = [
  { icon: Globe, name: "Web Development", color: "text-blue-400" },
  { icon: Smartphone, name: "Mobile Development", color: "text-green-400" },
  { icon: Zap, name: "Web3", color: "text-purple-400" },
  { icon: Brain, name: "AI/ML", color: "text-pink-400" },
]

type TimelineItem = {
  date: string
  title: string
  subtitle: string
  description: string
  details: string[]
  color: string
  icon: React.ComponentType<{ className?: string }>
  iconColor: string
}

const timeline: TimelineItem[] = [
  {
    date: "10th-14th Nov",
    title: "Ideathon Phase",
    subtitle: "Mon-Fri",
    description: "Students ideate on a project with 4 MVP features",
    details: [
      "Each idea must include 4 MVP features",
      "MVPs evaluated based on viability",
      "Evaluation criteria: innovation, feasibility, clarity, scalability",
      "Document your idea using the SRS template (download below)"
    ],
    color: "border-blue-500/50 bg-blue-500/5",
    icon: Lightbulb,
    iconColor: "text-blue-400"
  },
  {
    date: "14th Nov",
    title: "Ideathon Results",
    subtitle: "Results Announcement",
    description: "Winners receive goodies from Unstop and Buildit",
    details: [
      "Ideathon results announced",
      "Winners receive goodies",
      "Preparation for hackathon begins"
    ],
    color: "border-yellow-500/50 bg-yellow-500/5",
    icon: Trophy,
    iconColor: "text-yellow-400"
  },
  {
    date: "15th Nov",
    title: "Hackathon Day",
    subtitle: "5:00 PM - 5:30 AM",
    description: "Event starts with Treasure Hunt + What's The Word, followed by hackathon",
    details: [
      "5:00 PM - Event starts",
      "Treasure Hunt + What's The Word",
      "9:00 PM - Hackathon begins",
      "Those without ideas will ideate between 5 PM-9 PM",
      "MVP development time: 9:30 PM-5:30 AM"
    ],
    color: "border-purple-500/50 bg-purple-500/5",
    icon: Code,
    iconColor: "text-purple-400"
  },
  {
    date: "16th Nov",
    title: "Final Pitching & Winners",
    subtitle: "9:00 AM - 6:00 PM",
    description: "Final pitching for top teams and winner announcement",
    details: [
      "9:00 AM - Final pitching for top teams",
      "12:00 PM - Pitching ends",
      "6:00 PM - Winners announced"
    ],
    color: "border-green-500/50 bg-green-500/5",
    icon: Presentation,
    iconColor: "text-green-400"
  },
]

const judgingCriteria = [
  { criterion: "Innovation", description: "Uniqueness and creativity of the solution" },
  { criterion: "Feasibility", description: "Practical implementation and technical viability" },
  { criterion: "Implementation", description: "Quality of code and technical execution" },
  { criterion: "UI/UX", description: "User interface and experience design" },
  { criterion: "Presentation", description: "Clarity and effectiveness of pitch" },
  { criterion: "Technical Depth", description: "Complexity and sophistication of solution" },
  { criterion: "SRS Quality", description: "Quality and completeness of Software Requirements Specification documentation" },
]

// Problem statements are imported from data file

// Card content component
function TimelineCardContent({ item }: { item: TimelineItem }) {
  return (
    <>
      {/* Date badge */}
      <div className="inline-flex items-center gap-1 md:gap-2 rounded-full border border-border/50 bg-card/50 px-1.5 md:px-3 py-0.5 md:py-1 text-[10px] md:text-xs font-semibold text-muted-foreground mb-1.5 md:mb-3">
        <Calendar className="h-2 w-2 md:h-3 md:w-3" />
        <span>{item.date}</span>
      </div>

      {/* Header */}
      <div className="mb-1.5 md:mb-3">
        <div className="flex items-start gap-1.5 md:gap-3 mb-1 md:mb-2">
          <div className={`rounded-lg bg-card/50 p-1 md:p-2 ${item.iconColor} flex-shrink-0`}>
            <item.icon className="h-3 w-3 md:h-5 md:w-5" />
          </div>
          <div className="flex-1">
            <h3 className="text-sm md:text-xl lg:text-2xl font-bold mb-0.5 md:mb-1">{item.title}</h3>
            <p className="text-[10px] md:text-sm font-medium text-muted-foreground">{item.subtitle}</p>
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="text-muted-foreground mb-2 md:mb-4 text-[10px] md:text-sm lg:text-base leading-relaxed">
        {item.description}
      </p>

      {/* Details list */}
      <div className="space-y-1 md:space-y-2">
        {item.details.map((detail, detailIndex) => (
          <div key={detailIndex} className="flex items-start gap-1.5 md:gap-2.5 text-[10px] md:text-sm">
            <ChevronRight className="h-2.5 w-2.5 md:h-4 md:w-4 mt-0.5 flex-shrink-0 text-primary" />
            <span className="text-muted-foreground leading-tight">{detail}</span>
          </div>
        ))}
      </div>

      {/* SRS Template Download Link for Ideathon Phase */}
      {item.title === "Ideathon Phase" && (
        <div className="mt-2 md:mt-4 pt-2 md:pt-4 border-t border-white/10">
          <a
            href="/custom_srs_template.doc"
            download="custom_srs_template.doc"
            className="inline-flex items-center gap-1 md:gap-2 text-[10px] md:text-sm text-blue-400 hover:text-blue-300 transition-colors underline"
          >
            <Download className="h-2.5 w-2.5 md:h-4 md:w-4" />
            <span>Download SRS Template</span>
          </a>
        </div>
      )}
    </>
  )
}

// Timeline Component with scroll progress  
function TimelineComponent({ timeline: timelineItems }: { timeline: TimelineItem[] }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scrollDirection, setScrollDirection] = useState<'left' | 'right' | null>(null)
  const [lastScrollTop, setLastScrollTop] = useState(0)
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  })

  // Calculate the height percentage for the gradient fill (fills from top to bottom as you scroll)
  const fillHeight = useTransform(scrollYProgress, (progress) => {
    return `${progress * 100}%`
  })

  // Track scroll direction for mobile arrows
  useEffect(() => {
    let ticking = false
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!containerRef.current) {
            ticking = false
            return
          }
          
          const rect = containerRef.current.getBoundingClientRect()
          const isInViewport = rect.top < window.innerHeight && rect.bottom > 0
          
          if (!isInViewport) {
            setScrollDirection(null)
            ticking = false
            return
          }
          
          const currentScrollTop = window.scrollY || window.pageYOffset
          
          if (currentScrollTop > lastScrollTop) {
            // Scrolling down - arrow points right
            setScrollDirection('right')
          } else if (currentScrollTop < lastScrollTop) {
            // Scrolling up - arrow points left
            setScrollDirection('left')
          }
          
          setLastScrollTop(currentScrollTop)
          
          // Clear existing timeout
          if (scrollTimeoutRef.current) {
            clearTimeout(scrollTimeoutRef.current)
          }
          
          // Hide arrow after 1 second of no scrolling
          scrollTimeoutRef.current = setTimeout(() => {
            setScrollDirection(null)
          }, 1000)
          
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    
    // Initial check
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
    }
  }, [lastScrollTop])

  return (
    <div ref={containerRef} className="relative">
      {/* Vertical timeline line container - Desktop */}
      <div className="absolute left-1/2 top-0 bottom-0 w-1 transform -translate-x-1/2 hidden md:block z-0">
        {/* Background line (dark/black) */}
        <div className="absolute inset-0 bg-border/40 rounded-full"></div>
        
        {/* Animated fill line with gradient - fills from top to bottom */}
        <motion.div
          className="absolute top-0 left-0 right-0 rounded-full origin-top"
          style={{
            height: fillHeight,
            background: "linear-gradient(to bottom, #3b82f6 0%, #22c55e 100%)",
          }}
        />
      </div>

      {/* Vertical timeline line container - Mobile (positioned outside left of cards) */}
      <div className="absolute left-3 top-0 bottom-0 w-0.5 md:hidden z-0">
        {/* Background line (dark/black) */}
        <div className="absolute inset-0 bg-border/40 rounded-full"></div>
        
        {/* Animated fill line with gradient - fills from top to bottom */}
        <motion.div
          className="absolute top-0 left-0 right-0 rounded-full origin-top"
          style={{
            height: fillHeight,
            background: "linear-gradient(to bottom, #3b82f6 0%, #22c55e 100%)",
          }}
        />
      </div>

      {/* Mobile scroll direction arrows */}
      <div className="md:hidden fixed bottom-8 right-8 z-20">
        <AnimatePresence>
          {scrollDirection && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="bg-white/20 backdrop-blur-md rounded-full p-3 border-2 border-white/30"
            >
              {scrollDirection === 'right' ? (
                <ChevronRight className="h-6 w-6 text-white" />
              ) : (
                <ChevronRight className="h-6 w-6 text-white rotate-180" />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="space-y-4 md:space-y-12">
        {timelineItems.map((item, index) => {
          const isEven = index % 2 === 0
          const dotColor = index === 0 ? 'bg-blue-500' :
            index === 1 ? 'bg-yellow-500' :
            index === 2 ? 'bg-purple-500' :
            'bg-green-500'
          
          const borderColor = index === 0 ? 'border-blue-500' :
            index === 1 ? 'border-yellow-500' :
            index === 2 ? 'border-purple-500' :
            'border-green-500'
          
          return (
            <div
              key={index}
              className="relative flex items-center gap-2 md:gap-8"
            >
              {/* Desktop Layout: Even items have card on left, odd items have card on right */}
              {/* Mobile Layout: Card positioned to the right of the line */}
              
              {/* Left side - Card for even (desktop) */}
              <div className={`hidden md:flex flex-1 ${
                isEven ? 'justify-end' : 'justify-start'
              }`}>
                {isEven ? (
                  // Card on left for even items
                  <div className={`rounded-xl border-2 border-white/50 bg-white/10 backdrop-blur-md p-5 md:p-6 shadow-xl hover:shadow-2xl transition-shadow max-w-lg w-full`}>
                    <TimelineCardContent item={item} />
                  </div>
                ) : null}
              </div>

              {/* Right side - Card for odd (desktop) */}
              <div className={`hidden md:flex flex-1 ${
                isEven ? 'justify-start' : 'justify-end'
              }`}>
                {!isEven ? (
                  // Card on right for odd items
                  <div className={`rounded-xl border-2 border-white/50 bg-white/10 backdrop-blur-md p-5 md:p-6 shadow-xl hover:shadow-2xl transition-shadow max-w-lg w-full`}>
                    <TimelineCardContent item={item} />
                  </div>
                ) : null}
              </div>

              {/* Mobile: Card positioned to the right of the line, smaller size */}
              <div className="flex-1 md:hidden ml-10">
                <div className={`rounded-lg border-2 border-white/50 bg-white/10 backdrop-blur-md p-2.5 shadow-xl hover:shadow-2xl transition-shadow max-w-[85%]`}>
                  <TimelineCardContent item={item} />
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}


const faqs = [
  {
    question: "What should I bring to the event?",
    answer: "Bring your laptop, charger, any necessary development tools, and enthusiasm! We'll provide the workspace, internet, and snacks."
  },
  {
    question: "What is the team size?",
    answer: "Teams can have up to 4 members. Solo participants are also welcome, but we encourage team collaboration for better results."
  },
  {
    question: "What tools are permitted?",
    answer: "You can use any development tools, frameworks, libraries, and APIs. Use of AI tools for code generation is allowed, but the core logic and implementation should be your own."
  },
  {
    question: "How do I submit my project?",
    answer: "Submit your project through the provided platform with a GitHub repository link, demo video, and presentation. Detailed submission guidelines will be shared during the event."
  },
  {
    question: "Do I need to have an idea before the event?",
    answer: "While having an idea beforehand is helpful, you can also ideate during the event. There's dedicated time on 15th Nov (5 PM-9 PM) for teams without ideas to brainstorm."
  },
  {
    question: "What if I'm new to hackathons?",
    answer: "Fantastic 4 welcomes participants of all skill levels! The event is designed to be inclusive, with mentors available to help and guide you through the process."
  },
]

export default function Fantastic4Page() {
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const [isScrolledPastHero, setIsScrolledPastHero] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [activeOverviewCard, setActiveOverviewCard] = useState(0)
  const [activeWhyParticipateCard, setActiveWhyParticipateCard] = useState(0)

  // Countdown timer for Hackathon (opens on 15th November 2025)
  useEffect(() => {
    const targetDate = new Date('2025-11-15T00:00:00').getTime()
    
    const updateCountdown = () => {
      const now = new Date().getTime()
      const difference = targetDate - now

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }

    updateCountdown()
    const interval = setInterval(updateCountdown, 1000)

    return () => clearInterval(interval)
  }, [])

  const handleDownloadPDF = async () => {
    setIsGeneratingPDF(true)
    try {
      await generateProblemStatementsPDF()
    } catch (error) {
      console.error('Error generating PDF:', error)
      alert('Failed to generate PDF. Please try again.')
    } finally {
      setIsGeneratingPDF(false)
    }
  }

  // Handle smooth scroll to section
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const offset = 80 // Offset for navbar only (no main navbar on this page)
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  // Detect active section on scroll and check if scrolled past hero
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'overview', 'timeline', 'problems', 'rules', 'registration', 'hackathon', 'faq', 'contact']
      const scrollPosition = window.scrollY + 150

      // Check if scrolled past hero section
      const heroElement = document.getElementById('hero')
      if (heroElement) {
        const rect = heroElement.getBoundingClientRect()
        // Set to true when the top of hero section has scrolled past viewport top (with navbar offset)
        const navbarHeight = 80 // navbar height
        setIsScrolledPastHero(rect.top < -navbarHeight)
      }

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Check on mount
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { id: 'hero', label: 'Home', showBadge: true },
    { id: 'overview', label: 'Overview' },
    { id: 'timeline', label: 'Timeline', isLive: true },
    { id: 'problems', label: 'Problems' },
    { id: 'rules', label: 'Rules' },
    { id: 'registration', label: 'Stage 1' },
    { id: 'hackathon', label: 'Stage 2' },
    { id: 'faq', label: 'FAQ' },
    { id: 'contact', label: 'Contact' },
  ]

  return (
    <div className="min-h-screen relative" data-fantastic-4-page style={{ fontFamily: '"Audiowide", cursive' }}>
      {/* Main Navbar - Replaces the default navbar */}
      <nav className="sticky top-0 z-50 bg-transparent px-3 py-2">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center justify-between gap-4 rounded-full border border-white/10 bg-card/60 px-4 py-2 backdrop-blur supports-[backdrop-filter]:bg-card/50">
            {/* Back to Home Button */}
            <Link 
              href="/" 
              className="flex items-center gap-2 flex-shrink-0 hover:opacity-80 transition-opacity"
              style={{ fontFamily: '"Audiowide", cursive' }}
            >
              <span className="font-semibold tracking-tight text-white text-sm md:text-base">← Back to Home</span>
            </Link>

            {/* Desktop Navigation Items */}
            <div className="hidden md:flex items-center gap-1 flex-1 justify-center overflow-x-auto">
              {navItems.map((item) => {
              const isActive = activeSection === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`
                    inline-flex h-9 items-center rounded-full px-3 text-sm leading-none transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring whitespace-nowrap
                    ${isActive 
                      ? 'bg-background text-foreground' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-background/60'
                    }
                  `}
                  style={{ fontFamily: '"Audiowide", cursive' }}
                >
                  {item.showBadge ? (
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-sky-500/20 border border-sky-500/50 text-sky-400 text-xs font-bold flex-shrink-0 mr-1">
                      4
                    </span>
                  ) : null}
                  {item.isLive ? (
                    <span className="relative flex items-center gap-1 flex-shrink-0 mr-1">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500"></span>
                      </span>
                      <span className="text-xs font-bold text-red-400 animate-pulse">
                        LIVE
                      </span>
                    </span>
                  ) : null}
                  {item.label}
                </button>
              )
            })}
            </div>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden flex flex-col items-center justify-center w-8 h-8 space-y-1 focus:outline-none focus:ring-2 focus:ring-ring rounded-md"
              aria-label="Toggle menu"
            >
              <motion.span
                className="w-6 h-0.5 bg-white block"
                animate={{
                  rotate: isMobileMenuOpen ? 45 : 0,
                  y: isMobileMenuOpen ? 6 : 0,
                }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className="w-6 h-0.5 bg-white block"
                animate={{
                  opacity: isMobileMenuOpen ? 0 : 1,
                }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className="w-6 h-0.5 bg-white block"
                animate={{
                  rotate: isMobileMenuOpen ? -45 : 0,
                  y: isMobileMenuOpen ? -6 : 0,
                }}
                transition={{ duration: 0.2 }}
              />
            </button>
          </div>
        </div>

        {/* Mobile Slide Drawer */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
                onClick={() => setIsMobileMenuOpen(false)}
              />
              
              {/* Slide Drawer */}
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed top-0 right-0 z-50 h-full w-80 max-w-[85vw] bg-card border-l border-white/10 md:hidden"
              >
                <div className="flex flex-col h-full">
                  {/* Drawer Header */}
                  <div className="flex items-center justify-between p-6 border-b border-white/10">
                    <Link 
                      href="/" 
                      className="font-semibold tracking-tight text-white"
                      style={{ fontFamily: '"Audiowide", cursive' }}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      ← Back to Home
                    </Link>
                    <button
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="p-2 rounded-md hover:bg-background/60 transition-colors"
                      aria-label="Close menu"
                    >
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  {/* Navigation Links */}
                  <nav className="flex-1 p-6 overflow-y-auto">
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
                              onClick={() => {
                                scrollToSection(item.id)
                                setIsMobileMenuOpen(false)
                              }}
                              className={cn(
                                "flex items-center w-full px-4 py-3 rounded-lg text-base font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring",
                                isActive 
                                  ? "bg-background text-foreground" 
                                  : "text-muted-foreground hover:text-foreground hover:bg-background/60"
                              )}
                              style={{ fontFamily: '"Audiowide", cursive' }}
                            >
                              {item.showBadge && (
                                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-sky-500/20 border border-sky-500/50 text-sky-400 text-xs font-bold flex-shrink-0 mr-3">
                                  4
                                </span>
                              )}
                              {item.isLive && (
                                <span className="relative flex items-center gap-1.5 flex-shrink-0 mr-3">
                                  <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                                  </span>
                                  <span className="text-xs font-bold text-red-400 animate-pulse">
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
      </nav>
      {/* Main content wrapper */}
      <div className="relative z-10 min-h-screen">
        {/* Hero Section */}
      <section id="hero" className="relative h-screen flex items-center justify-center pointer-events-none overflow-hidden">
        {/* Ripple Effect - Only in hero section */}
        <div className="absolute inset-0 z-[2] pointer-events-none">
          <BackgroundRippleEffect 
            rows={25} 
            cols={60} 
            cellSize={56} 
          />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 w-full pointer-events-auto z-10">
          <div className="flex flex-col items-center justify-center h-full gap-3 md:gap-2 lg:gap-3 py-4 md:py-3 lg:py-4">
            {/* Partner Logos - Buildit x Unstop */}
            <div className="flex items-center justify-center gap-2 md:gap-4 lg:gap-6 -mt-12 md:-mt-24 lg:-mt-28">
              <Image
                src="/images/builditlogo.png"
                alt="Buildit Logo"
                width={200}
                height={200}
                className="h-20 md:h-24 lg:h-32 xl:h-40 w-auto object-contain"
                priority
              />
              <span className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-semibold text-white/70">×</span>
              <Image
                src="/unstop-logo.svg"
                alt="Unstop Logo"
                width={120}
                height={120}
                className="h-8 md:h-8 lg:h-10 xl:h-12 w-auto object-contain"
                priority
              />
            </div>

            {/* Date Badge */}
            <div className="flex justify-center mt-3 md:mt-3 lg:mt-4 mb-2 md:mb-1">
              <div className="inline-flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm lg:text-base font-semibold">
                <Sparkles className="h-3 w-3 md:h-4 md:w-4" />
                <span style={{ fontFamily: '"Audiowide", cursive', color: '#ffffff' }}>10th–16th November 2024</span>
              </div>
            </div>

            {/* Main Logo - Text with Rock Salt font */}
            <div className="flex flex-col items-center justify-center flex-shrink-0 px-2">
              <div className="flex items-center gap-1.5 sm:gap-2 md:gap-4 lg:gap-6 justify-center whitespace-nowrap">
                <span className="text-5xl sm:text-5xl md:text-7xl lg:text-9xl xl:text-[12rem] 2xl:text-[14rem] font-bold leading-tight" style={{ fontFamily: '"Rock Salt", cursive' }}>
                  Fantastic
                </span>
                <div className="relative flex items-center justify-center overflow-visible">
                  <span className="flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 lg:w-36 lg:h-36 xl:w-44 xl:h-44 2xl:w-52 2xl:h-52 rounded-full bg-sky-400 border-2 border-white">
                    <span className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl xl:text-[10rem] 2xl:text-[12rem] font-bold" style={{ fontFamily: '"Rock Salt", cursive', transform: 'scale(1.3)', position: 'relative', zIndex: 10, color: '#0284c7' }}>
                      4
                    </span>
                  </span>
                </div>
              </div>
              {/* Tagline */}
              <p className="text-base sm:text-lg md:text-2xl lg:text-3xl xl:text-4xl font-bold mt-3 md:mt-3 lg:mt-4 text-white px-2" style={{ fontFamily: '"Rock Salt", cursive' }}>
                Ideate. Innovate. Build. Win.
              </p>
            </div>

            {/* Event Type */}
            <div className="text-center mt-4 md:mt-5 lg:mt-6 px-2">
              <p className="text-xs sm:text-sm md:text-base text-white font-medium" style={{ fontFamily: '"Audiowide", cursive' }}>
                A Week-Long Ideathon + Overnight Hackathon
              </p>
            </div>

            {/* Product Poster Style Caption */}
            <div className="text-center mt-4 md:mt-4 lg:mt-5 px-2">
              <p className="text-base sm:text-lg md:text-2xl lg:text-3xl xl:text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Problem Statement is out now
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 md:gap-4 mt-4 md:mt-5 px-2">
              {/* REGISTER Button */}
              <a 
                href="https://docs.google.com/forms/d/e/1FAIpQLSc9xhCsVaAfjwmXmMAUMoU8Tq4z5_AZTnEnkT8E89qnLnpiag/viewform"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                <StardustButton className="scale-55 sm:scale-65 md:scale-75 lg:scale-85">
                  REGISTER
                </StardustButton>
              </a>

              {/* Arrow - Shown on all screens, smaller on mobile */}
              <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-white/70 flex-shrink-0 rotate-90 sm:rotate-0" />

              {/* DOCUMENT YOUR IDEA Button */}
              <a 
                href="/custom_srs_template.doc"
                download="custom_srs_template.doc"
                className="inline-block"
              >
                <StardustButton className="scale-55 sm:scale-65 md:scale-75 lg:scale-85">
                  DOCUMENT YOUR IDEA
                </StardustButton>
              </a>

              {/* Arrow - Shown on all screens, smaller on mobile */}
              <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-white/70 flex-shrink-0 rotate-90 sm:rotate-0" />

              {/* SUBMIT Button */}
              <a 
                href="https://docs.google.com/forms/d/e/1FAIpQLSeV9FdT5yFAwBA-40DZb98kkXenajHDW1-jxJsYQdyABI9p_g/viewform?usp=publish-editor"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                <StardustButton className="scale-55 sm:scale-65 md:scale-75 lg:scale-85">
                  SUBMIT
                </StardustButton>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Event Overview */}
      <section id="overview" className="relative border-y border-border/50 bg-transparent h-screen flex items-center justify-center overflow-hidden z-10 pointer-events-none">
        {/* Brighter sky blue background effect for event overview section - Safari compatible */}
        <div className="absolute inset-0 bg-sky-400/30 blur-3xl opacity-70 pointer-events-none z-0" style={{ backgroundColor: 'rgba(56, 189, 248, 0.3)' }}></div>
        <div className="relative mx-auto max-w-7xl px-4 md:px-6 pointer-events-auto z-10 w-full md:h-full md:flex md:flex-col md:justify-center py-4 md:py-0">
          <div className="mb-4 md:mb-6 text-center pt-4 md:pt-8">
            <h2 className="mb-3 md:mb-6 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Event Overview
            </h2>
          </div>

          <div className="mb-4 md:mb-6">
            {/* Mobile: Single card view with carousel */}
            <div className="md:hidden">
              <div className="relative">
                {/* Purpose Card */}
                <div className={`transition-opacity duration-300 ${activeOverviewCard === 0 ? 'opacity-100 block' : 'opacity-0 hidden'}`}>
                  <Card className="border-2 border-white/50 bg-white/10 backdrop-blur-md p-3">
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2 mb-2">
                        <Target className="h-5 w-5 text-blue-400 flex-shrink-0" />
                        <CardTitle className="text-lg">Purpose</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-xs text-muted-foreground leading-relaxed mb-2">
                        Fantastic 4 is designed to foster innovation, creativity, and technical excellence among students. 
                        The event aims to bridge the gap between ideation and implementation, encouraging participants to 
                        think critically, solve real-world problems, and build impactful solutions.
                      </p>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        The mission of this event is to provide students with a structured opportunity to transform their 
                        innovative ideas into working prototypes, collaborate with peers, learn from industry experts, and 
                        showcase their technical skills in a competitive yet supportive environment.
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* Event Structure Card */}
                <div className={`transition-opacity duration-300 ${activeOverviewCard === 1 ? 'opacity-100 block' : 'opacity-0 hidden'}`}>
                  <Card className="border-2 border-white/50 bg-white/10 backdrop-blur-md p-3">
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="h-5 w-5 text-purple-400 flex-shrink-0" />
                        <CardTitle className="text-lg">Event Structure</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div>
                          <h4 className="text-sm font-semibold mb-1 text-purple-300">Phase 1: Ideathon (10th-14th Nov)</h4>
                          <p className="text-xs text-muted-foreground">
                            A week-long ideation phase where teams brainstorm, research, and develop comprehensive project proposals 
                            with 4 MVP features. This phase emphasizes innovation, feasibility analysis, and strategic planning.
                          </p>
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold mb-1 text-purple-300">Phase 2: Hackathon (15th-16th Nov)</h4>
                          <p className="text-xs text-muted-foreground">
                            An overnight coding marathon where selected teams bring their ideas to life. Starting with engaging 
                            activities like Treasure Hunt and What's The Word, followed by intensive development and final pitching.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Dot Indicators */}
              <div className="flex items-center justify-center gap-2 mt-4">
                <button
                  onClick={() => setActiveOverviewCard(0)}
                  className={`transition-all duration-300 rounded-full ${
                    activeOverviewCard === 0 
                      ? 'w-3 h-3 bg-white' 
                      : 'w-2 h-2 bg-white/40'
                  }`}
                  aria-label="Show Purpose card"
                />
                <button
                  onClick={() => setActiveOverviewCard(1)}
                  className={`transition-all duration-300 rounded-full ${
                    activeOverviewCard === 1 
                      ? 'w-3 h-3 bg-white' 
                      : 'w-2 h-2 bg-white/40'
                  }`}
                  aria-label="Show Event Structure card"
                />
              </div>
            </div>

            {/* Desktop: Grid view with both cards */}
            <div className="hidden md:grid md:grid-cols-2 md:gap-6 md:items-start">
              {/* Purpose and Description */}
              <Card className="border-2 border-white/50 bg-white/10 backdrop-blur-md md:p-5">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-3 mb-2">
                    <Target className="h-7 w-7 text-blue-400 flex-shrink-0" />
                    <CardTitle className="text-xl">Purpose</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                    Fantastic 4 is designed to foster innovation, creativity, and technical excellence among students. 
                    The event aims to bridge the gap between ideation and implementation, encouraging participants to 
                    think critically, solve real-world problems, and build impactful solutions.
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    The mission of this event is to provide students with a structured opportunity to transform their 
                    innovative ideas into working prototypes, collaborate with peers, learn from industry experts, and 
                    showcase their technical skills in a competitive yet supportive environment.
                  </p>
                </CardContent>
              </Card>

              {/* Event Structure */}
              <Card className="border-2 border-white/50 bg-white/10 backdrop-blur-md md:p-5">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-3 mb-2">
                    <Calendar className="h-7 w-7 text-purple-400 flex-shrink-0" />
                    <CardTitle className="text-xl">Event Structure</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <h4 className="text-base font-semibold mb-1.5 text-purple-300">Phase 1: Ideathon (10th-14th Nov)</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        A week-long ideation phase where teams brainstorm, research, and develop comprehensive project proposals 
                        with 4 MVP features. This phase emphasizes innovation, feasibility analysis, and strategic planning.
                      </p>
                    </div>
                    <div>
                      <h4 className="text-base font-semibold mb-1.5 text-purple-300">Phase 2: Hackathon (15th-16th Nov)</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        An overnight coding marathon where selected teams bring their ideas to life. Starting with engaging 
                        activities like Treasure Hunt and What's The Word, followed by intensive development and final pitching.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Key Highlights */}
          <div className="mb-4 md:mb-8">
            <h3 className="text-lg md:text-2xl font-bold mb-4 md:mb-8 text-center bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              Why Participate?
            </h3>
            
            {/* Mobile: Single card view with carousel */}
            <div className="md:hidden">
              <div className="relative">
                {/* Win Prizes Card */}
                <div className={`transition-opacity duration-300 ${activeWhyParticipateCard === 0 ? 'opacity-100 block' : 'opacity-0 hidden'}`}>
                  <Card className="border-2 border-white/50 bg-white/10 backdrop-blur-md p-3">
                    <CardHeader className="pb-1">
                      <Trophy className="h-5 w-5 text-yellow-400 mb-1" />
                      <CardTitle className="text-base">Win Prizes</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-xs text-muted-foreground">
                        Compete for a prize pool of ₹30,000 along with exclusive goodies and recognition from industry leaders.
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* Network & Learn Card */}
                <div className={`transition-opacity duration-300 ${activeWhyParticipateCard === 1 ? 'opacity-100 block' : 'opacity-0 hidden'}`}>
                  <Card className="border-2 border-white/50 bg-white/10 backdrop-blur-md p-3">
                    <CardHeader className="pb-1">
                      <Users className="h-5 w-5 text-green-400 mb-1" />
                      <CardTitle className="text-base">Network & Learn</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-xs text-muted-foreground">
                        Connect with like-minded peers, industry mentors, and potential collaborators. Learn from workshops 
                        and expert sessions throughout the event.
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* Build Portfolio Card */}
                <div className={`transition-opacity duration-300 ${activeWhyParticipateCard === 2 ? 'opacity-100 block' : 'opacity-0 hidden'}`}>
                  <Card className="border-2 border-white/50 bg-white/10 backdrop-blur-md p-3">
                    <CardHeader className="pb-1">
                      <Award className="h-5 w-5 text-pink-400 mb-1" />
                      <CardTitle className="text-base">Build Portfolio</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-xs text-muted-foreground">
                        Create a real-world project, earn a participation certificate, and add a significant achievement 
                        to your portfolio that showcases your technical and problem-solving skills.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Dot Indicators */}
              <div className="flex items-center justify-center gap-2 mt-4">
                <button
                  onClick={() => setActiveWhyParticipateCard(0)}
                  className={`transition-all duration-300 rounded-full ${
                    activeWhyParticipateCard === 0 
                      ? 'w-3 h-3 bg-white' 
                      : 'w-2 h-2 bg-white/40'
                  }`}
                  aria-label="Show Win Prizes card"
                />
                <button
                  onClick={() => setActiveWhyParticipateCard(1)}
                  className={`transition-all duration-300 rounded-full ${
                    activeWhyParticipateCard === 1 
                      ? 'w-3 h-3 bg-white' 
                      : 'w-2 h-2 bg-white/40'
                  }`}
                  aria-label="Show Network & Learn card"
                />
                <button
                  onClick={() => setActiveWhyParticipateCard(2)}
                  className={`transition-all duration-300 rounded-full ${
                    activeWhyParticipateCard === 2 
                      ? 'w-3 h-3 bg-white' 
                      : 'w-2 h-2 bg-white/40'
                  }`}
                  aria-label="Show Build Portfolio card"
                />
              </div>
            </div>

            {/* Desktop: Grid view with all cards */}
            <div className="hidden md:grid md:grid-cols-3 gap-6">
              <Card className="border-2 border-white/50 bg-white/10 backdrop-blur-md p-5">
                <CardHeader className="pb-2">
                  <Trophy className="h-7 w-7 text-yellow-400 mb-2" />
                  <CardTitle className="text-xl">Win Prizes</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Compete for a prize pool of ₹30,000 along with exclusive goodies and recognition from industry leaders.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-2 border-white/50 bg-white/10 backdrop-blur-md p-5">
                <CardHeader className="pb-2">
                  <Users className="h-7 w-7 text-green-400 mb-2" />
                  <CardTitle className="text-xl">Network & Learn</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Connect with like-minded peers, industry mentors, and potential collaborators. Learn from workshops 
                    and expert sessions throughout the event.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-2 border-white/50 bg-white/10 backdrop-blur-md p-5">
                <CardHeader className="pb-2">
                  <Award className="h-7 w-7 text-pink-400 mb-2" />
                  <CardTitle className="text-xl">Build Portfolio</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Create a real-world project, earn a participation certificate, and add a significant achievement 
                    to your portfolio that showcases your technical and problem-solving skills.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section id="timeline" className="relative border-y border-border/50 bg-transparent pt-16 md:pt-20 pb-12 md:pb-16 z-10 pointer-events-none overflow-hidden">
        {/* Sky blue background effect for timeline section - same as overview - Safari compatible */}
        <div className="absolute inset-0 bg-sky-400/30 blur-3xl opacity-70 pointer-events-none z-0" style={{ backgroundColor: 'rgba(56, 189, 248, 0.3)' }}></div>
        <div className="absolute top-8 md:top-12 left-1/2 transform -translate-x-1/2 pointer-events-auto z-50">
          <a
            href="#timeline"
            onClick={(e) => {
              e.preventDefault()
              scrollToSection('timeline')
            }}
            className="relative inline-flex items-center gap-1.5 md:gap-2 px-3 md:px-5 py-1.5 md:py-2.5 rounded-full bg-gradient-to-r from-blue-500/30 to-blue-600/30 border-2 border-blue-500/60 backdrop-blur-md shadow-xl hover:shadow-blue-500/50 transition-all hover:scale-110 animate-pulse bg-blue-500/20"
          >
            <span className="relative flex h-2 w-2 md:h-2.5 md:w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 md:h-2.5 md:w-2.5 bg-blue-500"></span>
            </span>
            <span className="text-xs md:text-sm font-bold text-white drop-shadow-lg">
              LIVE NOW
            </span>
            <span className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/40 to-blue-600/40 blur-md -z-10 animate-pulse"></span>
          </a>
        </div>
        <div className="relative mx-auto max-w-6xl px-3 md:px-4 pointer-events-auto z-10 mt-12 md:mt-16">
          <div className="mb-6 md:mb-12 text-center pt-8 md:pt-12">
            <h2 className="mb-3 md:mb-6 text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Timeline
            </h2>
            <p className="mx-auto max-w-3xl text-base md:text-xl lg:text-2xl text-muted-foreground leading-relaxed px-2">
              A structured week-long journey from ideation to victory
            </p>
          </div>

          {/* Timeline */}
          <TimelineComponent timeline={timeline} />
        </div>
      </section>

      {/* Problem Statements */}
      <section id="problems" className="relative border-y border-border/50 bg-transparent min-h-screen md:h-screen flex flex-col overflow-hidden z-10 pointer-events-none">
        {/* Light green background effect for problem statements section - Safari compatible */}
        <div className="absolute inset-0 bg-green-400/20 blur-3xl opacity-60 pointer-events-none z-0" style={{ backgroundColor: 'rgba(74, 222, 128, 0.2)' }}></div>
        
        {/* Header Section - Constrained width */}
        <div className="relative mx-auto max-w-7xl px-3 md:px-4 pointer-events-auto z-10 w-full flex-shrink-0 pt-6 md:pt-12 pb-3 md:pb-6">
          <div className="text-center">
            <h2 className="mb-3 md:mb-8 text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Problem Statements
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 md:gap-3 mb-3 md:mb-6">
              <button
                onClick={handleDownloadPDF}
                disabled={isGeneratingPDF}
                className="inline-flex items-center gap-1.5 md:gap-2 px-3 md:px-5 py-1.5 md:py-2.5 rounded-lg bg-green-500/20 hover:bg-green-500/30 border-2 border-green-500/50 text-green-400 font-semibold transition-all hover:scale-105 backdrop-blur-sm shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 text-xs md:text-sm"
                aria-label="Download Problem Statements PDF"
              >
                <Download className={`h-4 w-4 md:h-5 md:w-5 ${isGeneratingPDF ? 'animate-spin' : ''}`} />
                <span className="whitespace-nowrap">{isGeneratingPDF ? 'Generating...' : 'Download PDF'}</span>
              </button>
              <a
                href="/custom_srs_template.doc"
                download="custom_srs_template.doc"
                className="inline-flex items-center gap-1.5 md:gap-2 px-3 md:px-5 py-1.5 md:py-2.5 rounded-lg bg-green-500/20 hover:bg-green-500/30 border-2 border-green-500/50 text-green-400 font-semibold transition-all hover:scale-105 backdrop-blur-sm shadow-lg text-xs md:text-sm"
                aria-label="Download SRS Template"
              >
                <Download className="h-4 w-4 md:h-5 md:w-5" />
                <span className="whitespace-nowrap">Download SRS</span>
              </a>
            </div>
            <p className="mx-auto max-w-3xl text-sm md:text-xl lg:text-2xl text-muted-foreground mb-3 md:mb-6 leading-relaxed px-2">
              Choose from these AI-generated problem statements or come up with your own innovative solution
            </p>
            <div className="inline-flex items-center gap-1.5 md:gap-2 rounded-full border-2 border-green-500/50 bg-green-500/10 px-3 md:px-6 py-2 md:py-3 text-xs md:text-base lg:text-lg font-semibold text-green-400 backdrop-blur-md max-w-[95%] md:max-w-none">
              <Lightbulb className="h-4 w-4 md:h-5 md:w-5 flex-shrink-0" />
              <span className="text-center">Open Innovation: Participants can modify problems or create their own as per MVP requirements</span>
            </div>
          </div>
        </div>

        {/* Infinite Scrolling Container - Full viewport width */}
        <div className="relative flex-1 min-h-[200px] md:min-h-0 w-full pointer-events-auto z-10">
          {/* Gradient overlays for fade effect */}
          <div className="absolute left-0 top-0 bottom-0 w-12 md:w-32 bg-gradient-to-r from-card/20 via-card/20 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-12 md:w-32 bg-gradient-to-l from-card/20 via-card/20 to-transparent z-10 pointer-events-none" />
          
          <div className="overflow-hidden h-full w-full">
              <div className="flex animate-scroll">
                {/* First set of cards */}
                {problemStatements.map((problem) => (
                  <div key={`first-${problem.id}`} className="flex-shrink-0 w-64 sm:w-72 md:w-96 px-1.5 sm:px-2 md:px-3">
                    <Card className="h-full border-2 border-white/50 bg-white/10 backdrop-blur-sm hover:border-white/70 transition-colors">
                      <CardHeader>
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <div className="text-xs font-semibold text-blue-400 mb-1 uppercase tracking-wide">
                              {problem.industry}
                            </div>
                            <CardTitle className="text-lg leading-tight">{problem.title}</CardTitle>
                          </div>
                          <span className="text-xs font-mono text-muted-foreground ml-2">#{problem.id}</span>
                        </div>
                        <CardDescription className="text-sm mb-4 leading-relaxed">
                          {problem.description}
                        </CardDescription>
                        <div className="flex flex-wrap gap-1.5">
                          {problem.tags.map((tag, tagIndex) => (
                            <span
                              key={tagIndex}
                              className="rounded-md border border-border/50 bg-card/50 px-2 py-0.5 text-xs text-muted-foreground"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </CardHeader>
                    </Card>
                  </div>
                ))}
                {/* Duplicate set for seamless loop */}
                {problemStatements.map((problem) => (
                  <div key={`second-${problem.id}`} className="flex-shrink-0 w-64 sm:w-72 md:w-96 px-1.5 sm:px-2 md:px-3">
                    <Card className="h-full border-2 border-white/50 bg-white/10 backdrop-blur-sm hover:border-white/70 transition-colors">
                      <CardHeader>
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <div className="text-xs font-semibold text-blue-400 mb-1 uppercase tracking-wide">
                              {problem.industry}
                            </div>
                            <CardTitle className="text-lg leading-tight">{problem.title}</CardTitle>
                          </div>
                          <span className="text-xs font-mono text-muted-foreground ml-2">#{problem.id}</span>
                        </div>
                        <CardDescription className="text-sm mb-4 leading-relaxed">
                          {problem.description}
                        </CardDescription>
                        <div className="flex flex-wrap gap-1.5">
                          {problem.tags.map((tag, tagIndex) => (
                            <span
                              key={tagIndex}
                              className="rounded-md border border-border/50 bg-card/50 px-2 py-0.5 text-xs text-muted-foreground"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </CardHeader>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </div>
      </section>

      {/* Rules & Judging Criteria */}
      <section id="rules" className="relative border-y border-border/50 bg-transparent min-h-screen md:h-screen flex items-center justify-center overflow-hidden z-10 pointer-events-none">
        {/* Light green background effect for rules section */}
        <div className="absolute inset-0 bg-green-400/20 blur-3xl opacity-60 pointer-events-none"></div>
        <div className="relative mx-auto max-w-6xl px-3 md:px-4 pointer-events-auto z-10 w-full md:h-full md:flex md:flex-col md:justify-center py-6 md:py-0">
        <div className="mb-4 md:mb-12 text-center pt-6 md:pt-12">
          <h2 className="mb-3 md:mb-8 text-xl sm:text-2xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Rules & Judging Criteria
          </h2>
        </div>

        <div className="grid gap-4 md:gap-8 md:grid-cols-2 md:overflow-y-auto md:flex-1 md:min-h-0">
          <Card className="border-2 border-white/50 bg-white/10 backdrop-blur-md hover:border-white/70 transition-colors">
            <CardHeader className="pb-2 md:pb-3 p-3 md:p-6">
              <div className="flex items-center gap-2 mb-2">
                <Target className="h-4 w-4 md:h-6 md:w-6 text-blue-400 flex-shrink-0" />
                <CardTitle className="text-base md:text-2xl">Rules</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="px-3 md:px-6 pb-3 md:pb-6">
              <ul className="space-y-2 md:space-y-3">
                {[
                  "Must build all 4 MVP features as specified in your ideation phase",
                  "Projects must be original work developed during the event",
                  "Teams must submit their projects before the deadline",
                  "All team members must be present during the pitching session"
                ].map((rule, index) => (
                  <li key={index} className="flex items-start gap-2 md:gap-3">
                    <CheckCircle2 className="h-3.5 w-3.5 md:h-5 md:w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-xs md:text-sm text-muted-foreground leading-relaxed">{rule}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="border-2 border-white/50 bg-white/10 backdrop-blur-md hover:border-white/70 transition-colors">
            <CardHeader className="pb-2 md:pb-3 p-3 md:p-6">
              <div className="flex items-center gap-2 mb-2">
                <Award className="h-4 w-4 md:h-6 md:w-6 text-yellow-400 flex-shrink-0" />
                <CardTitle className="text-base md:text-2xl">Judging Criteria</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="px-3 md:px-6 pb-3 md:pb-6">
              <ul className="space-y-2.5 md:space-y-4">
                {judgingCriteria.map((criterion, index) => (
                  <li key={index} className="flex items-start gap-2 md:gap-3">
                    <CheckCircle2 className="h-3.5 w-3.5 md:h-5 md:w-5 text-purple-400 flex-shrink-0 mt-0.5 md:mt-1" />
                    <div>
                      <div className="font-semibold mb-0.5 md:mb-1 text-xs md:text-lg">{criterion.criterion}</div>
                      <div className="text-xs md:text-sm text-muted-foreground leading-relaxed">{criterion.description}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
        </div>
      </section>

      {/* Stage 1: Ideathon Section */}
      <section id="registration" className="relative border-y border-border/50 bg-transparent min-h-screen md:h-screen flex items-center justify-center overflow-hidden z-10 pointer-events-none">
        {/* Gold background effect for Stage 1 */}
        <div className="absolute inset-0 bg-yellow-400/20 blur-3xl opacity-60 pointer-events-none"></div>
        <div className="relative w-full px-3 sm:px-4 md:px-8 lg:px-12 xl:px-16 pointer-events-auto z-10 md:h-full md:flex md:flex-col md:justify-center py-6 md:py-0">
          <div className="text-center mb-4 md:mb-12 pt-6 md:pt-12">
            <h2 className="mb-2 md:mb-6 text-xl sm:text-2xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">
              STAGE 1: IDEATHON
            </h2>
            <p className="text-xs sm:text-sm md:text-lg lg:text-xl text-muted-foreground mb-3 md:mb-8 max-w-3xl mx-auto px-2">
              Participate in the ideation phase and transform your innovative ideas into actionable project plans.
            </p>
          </div>

          <div className="w-full space-y-4 md:space-y-12 md:overflow-y-auto md:flex-1 md:min-h-0">
            {/* Step 1 */}
            <div className="flex items-start md:items-center gap-2.5 sm:gap-3 md:gap-8 lg:gap-10 justify-between flex-col sm:flex-row">
              <div className="flex items-start md:items-center gap-2.5 sm:gap-3 md:gap-8 lg:gap-10 flex-1 w-full">
                <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full bg-yellow-400/40 border-2 border-yellow-400/60 flex items-center justify-center">
                  <span className="text-yellow-300 font-bold text-sm sm:text-base md:text-xl lg:text-2xl">1</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-white mb-1.5 sm:mb-2 md:mb-3 text-sm sm:text-base md:text-xl lg:text-2xl xl:text-3xl">Register for the Event</p>
                  <p className="text-xs sm:text-sm md:text-lg lg:text-xl text-white/70 leading-relaxed">Fill out the registration form to secure your spot in the ideathon phase.</p>
                </div>
              </div>
              <a 
                href="https://docs.google.com/forms/d/e/1FAIpQLSc9xhCsVaAfjwmXmMAUMoU8Tq4z5_AZTnEnkT8E89qnLnpiag/viewform"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block flex-shrink-0 w-full sm:w-auto mt-2 sm:mt-0"
              >
                <StardustButton className="scale-50 sm:scale-75 md:scale-85 lg:scale-100 w-full sm:w-auto">
                  REGISTER
                </StardustButton>
              </a>
            </div>

            {/* Step 2 */}
            <div className="flex items-start md:items-center gap-2.5 sm:gap-3 md:gap-8 lg:gap-10 justify-between flex-col sm:flex-row">
              <div className="flex items-start md:items-center gap-2.5 sm:gap-3 md:gap-8 lg:gap-10 flex-1 w-full">
                <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full bg-yellow-400/40 border-2 border-yellow-400/60 flex items-center justify-center">
                  <span className="text-yellow-300 font-bold text-sm sm:text-base md:text-xl lg:text-2xl">2</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-white mb-1.5 sm:mb-2 md:mb-3 text-sm sm:text-base md:text-xl lg:text-2xl xl:text-3xl">Document Your Idea</p>
                  <p className="text-xs sm:text-sm md:text-lg lg:text-xl text-white/70 leading-relaxed mb-1.5 sm:mb-2 md:mb-3">Download the SRS template and document your innovative idea with all 4 MVP features clearly defined.</p>
                  <p className="text-xs sm:text-xs md:text-base lg:text-lg xl:text-xl text-yellow-300 font-semibold">Participation certificates will be awarded to all 4 team members upon successful submission.</p>
                </div>
              </div>
              <a 
                href="/custom_srs_template.doc"
                download="custom_srs_template.doc"
                className="inline-block flex-shrink-0 w-full sm:w-auto mt-2 sm:mt-0"
              >
                <StardustButton className="scale-50 sm:scale-75 md:scale-85 lg:scale-100 w-full sm:w-auto">
                  DOCUMENT YOUR IDEA
                </StardustButton>
              </a>
            </div>

            {/* Step 3 */}
            <div className="flex items-start md:items-center gap-2.5 sm:gap-3 md:gap-8 lg:gap-10 justify-between flex-col sm:flex-row">
              <div className="flex items-start md:items-center gap-2.5 sm:gap-3 md:gap-8 lg:gap-10 flex-1 w-full">
                <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full bg-yellow-400/40 border-2 border-yellow-400/60 flex items-center justify-center">
                  <span className="text-yellow-300 font-bold text-sm sm:text-base md:text-xl lg:text-2xl">3</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-white mb-1.5 sm:mb-2 md:mb-3 text-sm sm:text-base md:text-xl lg:text-2xl xl:text-3xl">Submit Your Documentation</p>
                  <p className="text-xs sm:text-sm md:text-lg lg:text-xl text-white/70 leading-relaxed mb-1.5 sm:mb-2 md:mb-3">Submit your completed SRS document through the submission form before the deadline.</p>
                  <p className="text-xs sm:text-xs md:text-base lg:text-lg xl:text-xl text-yellow-300 font-semibold">Goodies will be provided to the top 3 ideations.</p>
                </div>
              </div>
              <a 
                href="https://docs.google.com/forms/d/e/1FAIpQLSeV9FdT5yFAwBA-40DZb98kkXenajHDW1-jxJsYQdyABI9p_g/viewform?usp=publish-editor"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block flex-shrink-0 w-full sm:w-auto mt-2 sm:mt-0"
              >
                <StardustButton className="scale-50 sm:scale-75 md:scale-85 lg:scale-100 w-full sm:w-auto">
                  SUBMIT
                </StardustButton>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stage 2: Hackathon Section */}
      <section id="hackathon" className="relative border-y border-border/50 bg-transparent h-screen flex items-center justify-center overflow-hidden z-10 pointer-events-none">
        {/* Gold background effect for Stage 2 */}
        <div className="absolute inset-0 bg-yellow-400/20 blur-3xl opacity-60 pointer-events-none"></div>
        <div className="relative mx-auto max-w-6xl px-3 md:px-4 pointer-events-auto z-10 w-full md:h-full md:flex md:flex-col md:justify-center py-4 md:py-0">
          <div className="text-center mb-6 md:mb-12 pt-8 md:pt-12">
            <div className="flex items-center justify-center gap-2 md:gap-3 mb-4 md:mb-6">
              <Lock className="h-6 w-6 md:h-10 md:w-10 text-yellow-400 flex-shrink-0" />
              <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">
                STAGE 2: HACKATHON
              </h2>
            </div>
            <p className="text-sm md:text-lg lg:text-xl text-muted-foreground mb-4 md:mb-8 max-w-3xl mx-auto px-2">
              The hackathon phase will unlock on 15th November 2025. Build your MVP and compete for the grand prize!
            </p>
          </div>

          <Card className="border-2 border-white/50 bg-white/10 backdrop-blur-md max-w-2xl mx-auto w-full">
            <CardHeader className="py-4 md:py-8 px-3 md:px-6">
              <CardTitle className="text-xl md:text-2xl lg:text-3xl mb-4 md:mb-6 text-center">Opens In</CardTitle>
              <CardContent className="px-2 md:px-6">
                <div className="grid grid-cols-4 gap-2 md:gap-6">
                  <div className="text-center">
                    <div className="text-2xl md:text-4xl lg:text-5xl font-bold text-yellow-400 mb-1 md:mb-2">
                      {timeLeft.days}
                    </div>
                    <div className="text-xs md:text-base text-muted-foreground uppercase">Days</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl md:text-4xl lg:text-5xl font-bold text-yellow-400 mb-1 md:mb-2">
                      {timeLeft.hours}
                    </div>
                    <div className="text-xs md:text-base text-muted-foreground uppercase">Hours</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl md:text-4xl lg:text-5xl font-bold text-yellow-400 mb-1 md:mb-2">
                      {timeLeft.minutes}
                    </div>
                    <div className="text-xs md:text-base text-muted-foreground uppercase">Minutes</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl md:text-4xl lg:text-5xl font-bold text-yellow-400 mb-1 md:mb-2">
                      {timeLeft.seconds}
                    </div>
                    <div className="text-xs md:text-base text-muted-foreground uppercase">Seconds</div>
                  </div>
                </div>
                <div className="mt-4 md:mt-6 text-center">
                  <p className="text-xs md:text-sm lg:text-base text-muted-foreground">
                    Unlocks on <span className="font-semibold text-yellow-400">15th November 2025</span>
                  </p>
                </div>
              </CardContent>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="relative border-y border-border/50 bg-transparent py-12 md:py-16 overflow-hidden z-10 pointer-events-none">
        <div className="mx-auto max-w-4xl px-3 md:px-4 pointer-events-auto">
          <div className="mb-6 md:mb-12 text-center pt-8 md:pt-12">
            <h2 className="mb-4 md:mb-6 text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3 md:space-y-4">
            {faqs.map((faq, index) => {
              const colors = [
                'border-blue-500/30 hover:border-blue-500/60',
                'border-yellow-500/30 hover:border-yellow-500/60',
                'border-purple-500/30 hover:border-purple-500/60',
                'border-green-500/30 hover:border-green-500/60',
              ]
              const bgColors = [
                'bg-blue-500/5',
                'bg-yellow-500/5',
                'bg-purple-500/5',
                'bg-green-500/5',
              ]
              const colorClass = colors[index % 4]
              const bgClass = bgColors[index % 4]
              
              return (
                <div key={index}>
                  <Card className={`border-2 border-white/50 bg-white/10 backdrop-blur-sm transition-all ${colorClass} ${bgClass}`}>
                    <CardHeader className="pb-2 md:pb-3 pt-3 md:pt-4 px-3 md:px-5">
                      <CardTitle className="text-sm md:text-base lg:text-lg">{faq.question}</CardTitle>
                    </CardHeader>
                    <CardContent className="px-3 md:px-5 pb-3 md:pb-4">
                      <p className="text-xs md:text-sm lg:text-base text-muted-foreground">{faq.answer}</p>
                    </CardContent>
                  </Card>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative border-y border-border/50 bg-black h-screen flex items-center justify-center overflow-hidden z-10 pointer-events-none">
        <div className="relative mx-auto max-w-6xl px-3 md:px-4 pointer-events-auto z-10 w-full md:h-full md:flex md:flex-col md:justify-center py-4 md:py-0">
          <div className="text-center mb-6 md:mb-12 pt-8 md:pt-12">
            <h2 className="mb-3 md:mb-6 text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-white">
              Contact Us
            </h2>
            <p className="text-sm md:text-base lg:text-lg text-white/70 max-w-2xl mx-auto px-2">
              Have questions? Reach out to us and we'll be happy to help!
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4 md:gap-6 max-w-xl mx-auto w-full">
            <Card className="border-2 border-white/50 bg-white/10 backdrop-blur-sm hover:border-white/70 transition-all">
              <CardContent className="pt-3 md:pt-4 pb-3 md:pb-4 px-3 md:px-4">
                <div className="flex flex-col items-center text-center gap-2 md:gap-3">
                  <div className="p-1.5 md:p-2 rounded-full bg-blue-500/20">
                    <Mail className="h-4 w-4 md:h-5 md:w-5 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-xs md:text-sm font-semibold text-white mb-0.5 md:mb-1">Email Us</h3>
                    <a 
                      href="mailto:builditmuj.club@gmail.com"
                      className="text-xs text-blue-400 hover:text-blue-300 transition-colors break-all"
                    >
                      builditmuj.club@gmail.com
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-2 border-white/50 bg-white/10 backdrop-blur-sm hover:border-white/70 transition-all">
              <CardContent className="pt-3 md:pt-4 pb-3 md:pb-4 px-3 md:px-4">
                <div className="flex flex-col items-center text-center gap-2 md:gap-3">
                  <div className="p-1.5 md:p-2 rounded-full bg-green-500/20">
                    <Phone className="h-4 w-4 md:h-5 md:w-5 text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-xs md:text-sm font-semibold text-white mb-0.5 md:mb-1">Call Us</h3>
                    <a 
                      href="tel:+917680868626"
                      className="text-xs text-green-400 hover:text-green-300 transition-colors"
                    >
                      +91 76808 68626
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      </div>
    </div>
  )
}



