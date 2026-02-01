"use client"

import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { useRef, useState, useEffect } from "react"
import { createPortal } from "react-dom"
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
  Lock,
  Home
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { problemStatements, type ProblemStatement } from "@/data/fantastic4-problems"
import { generateProblemStatementsPDF } from "@/lib/pdf-generator"
import { cn } from "@/lib/utils"
import { Fantastic4MobileMenu } from "@/components/fantastic-4-mobile-menu"

const PITCH_DECK_REPO_URL = "https://github.com/nrk018/buildit_presentation"

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
    date: "1st-5th Feb",
    title: "Ideathon Phase",
    subtitle: "Mon-Fri",
    description: "Students ideate on a project with 4 MVP features",
    details: [
      "Each idea must include 4 MVP features",
      "MVPs evaluated based on viability",
      "Evaluation criteria: innovation, feasibility, clarity, scalability",
      "Build your pitch deck: fork the template repo, update content, fix errors, create a branch & PR, and deploy on Vercel"
    ],
    color: "border-blue-500/50 bg-blue-500/5",
    icon: Lightbulb,
    iconColor: "text-blue-400"
  },
  {
    date: "6th Feb",
    title: "Ideathon Results & Hackathon Day",
    subtitle: "Results + 5:00 PM - 5:30 AM",
    description: "Ideathon results, then event starts with Treasure Hunt + What's The Word, followed by hackathon",
    details: [
      "Ideathon results announced",
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
    date: "7th Feb",
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
  { criterion: "Pitch Deck Quality", description: "Quality and completeness of your pitch deck website (fork, update, build, PR, Vercel deployment)" },
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

      {/* Pitch Deck Template Link for Ideathon Phase */}
      {item.title === "Ideathon Phase" && (
        <div className="mt-2 md:mt-4 pt-2 md:pt-4 border-t" style={{ borderColor: "#0e4a80" }}>
          <a
            href={PITCH_DECK_REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 md:gap-2 text-[10px] md:text-sm transition-colors underline"
            style={{ color: "#9daecc" }}
          >
            <Download className="h-2.5 w-2.5 md:h-4 md:w-4" />
            <span>Fork Pitch Deck (GitHub)</span>
          </a>
        </div>
      )}
    </>
  )
}

// Timeline Component — throttled scroll progress (no per-frame Framer Motion scroll)
function TimelineComponent({ timeline: timelineItems }: { timeline: TimelineItem[] }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [fillPercent, setFillPercent] = useState(0)
  const [scrollDirection, setScrollDirection] = useState<'left' | 'right' | null>(null)
  const lastScrollTopRef = useRef(0)
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const rafRef = useRef<number | null>(null)
  const lastFillRef = useRef(-1)

  // Throttled scroll: update fill % only when timeline in view, max once per RAF, batch state updates
  useEffect(() => {
    const update = () => {
      rafRef.current = null
      const el = containerRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const windowHeight = typeof window !== "undefined" ? window.innerHeight : 800
      if (rect.bottom < 0 || rect.top > windowHeight) return
      const scrollY = typeof window !== "undefined" ? window.scrollY : 0
      const elTop = rect.top + scrollY
      const elH = rect.height
      const viewportCenter = scrollY + windowHeight * 0.5
      const progress = Math.max(0, Math.min(1, (viewportCenter - elTop) / (elH || 1)))
      const pct = Math.round(progress * 100)
      if (pct !== lastFillRef.current) {
        lastFillRef.current = pct
        setFillPercent(pct)
      }
    }
    const handleScroll = () => {
      if (rafRef.current != null) return
      rafRef.current = requestAnimationFrame(update)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    update()
    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  // Scroll direction for mobile arrows (throttled, only when timeline in view)
  useEffect(() => {
    let ticking = false
    const handleScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        if (!containerRef.current) {
          ticking = false
          return
        }
        const rect = containerRef.current.getBoundingClientRect()
        if (rect.top >= window.innerHeight || rect.bottom <= 0) {
          setScrollDirection(null)
          ticking = false
          return
        }
        const current = window.scrollY || window.pageYOffset
        if (current > lastScrollTopRef.current) setScrollDirection("right")
        else if (current < lastScrollTopRef.current) setScrollDirection("left")
        lastScrollTopRef.current = current
        if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current)
        scrollTimeoutRef.current = setTimeout(() => setScrollDirection(null), 1000)
        ticking = false
      })
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current)
    }
  }, [])

  const fillStyle = {
    height: `${fillPercent}%`,
    background: "#ffffff",
    border: "2px solid #0E4A80",
    boxSizing: "border-box" as const,
  }

  return (
    <div ref={containerRef} className="relative">
      {/* Vertical timeline line container - Desktop: white track + fill, #0E4A80 border */}
      <div className="f4-timeline-line absolute left-1/2 top-0 bottom-0 w-1 transform -translate-x-1/2 hidden md:block z-0 rounded-full border-2 border-[#0E4A80] box-border overflow-hidden">
        <div className="f4-timeline-line-track absolute inset-0 rounded-full" style={{ backgroundColor: "#ffffff" }} />
        <div className="f4-timeline-line-fill absolute top-0 left-0 right-0 rounded-full origin-top transition-[height] duration-150 ease-out" style={fillStyle} />
      </div>

      {/* Vertical timeline line container - Mobile */}
      <div className="f4-timeline-line absolute left-3 top-0 bottom-0 w-0.5 md:hidden z-0 rounded-full border-2 border-[#0E4A80] box-border overflow-hidden">
        <div className="f4-timeline-line-track absolute inset-0 rounded-full" style={{ backgroundColor: "#ffffff" }} />
        <div className="f4-timeline-line-fill absolute top-0 left-0 right-0 rounded-full origin-top transition-[height] duration-150 ease-out" style={fillStyle} />
      </div>

      {/* Mobile scroll direction arrows — 44px min touch target */}
      <div className="md:hidden fixed bottom-8 right-4 z-20" style={{ paddingBottom: 'env(safe-area-inset-bottom, 0)', paddingRight: 'env(safe-area-inset-right, 0)' }}>
        <AnimatePresence>
          {scrollDirection && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="backdrop-blur-md rounded-full min-w-[44px] min-h-[44px] flex items-center justify-center p-3 border-2"
              style={{ backgroundColor: "rgba(1,5,11,0.6)", borderColor: "#0e4a80" }}
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
                  <div className="f4-timeline-node rounded-xl border-2 backdrop-blur-md p-5 md:p-6 shadow-xl hover:shadow-2xl transition-shadow max-w-lg w-full pl-6 md:pl-8" style={{ borderColor: "#0e4a80" }}>
                    <TimelineCardContent item={item} />
                  </div>
                ) : null}
              </div>

              {/* Right side - Card for odd (desktop) */}
              <div className={`hidden md:flex flex-1 ${
                isEven ? 'justify-start' : 'justify-end'
              }`}>
                {!isEven ? (
                  <div className="f4-timeline-node rounded-xl border-2 backdrop-blur-md p-5 md:p-6 shadow-xl hover:shadow-2xl transition-shadow max-w-lg w-full pr-6 md:pr-8" style={{ borderColor: "#0e4a80" }}>
                    <TimelineCardContent item={item} />
                  </div>
                ) : null}
              </div>

              {/* Mobile: Card positioned to the right of the line, smaller size */}
              <div className="flex-1 md:hidden ml-10">
                <div className="f4-timeline-node rounded-lg border-2 backdrop-blur-md p-2.5 shadow-xl hover:shadow-2xl transition-shadow max-w-[85%] pl-5" style={{ borderColor: "#0e4a80" }}>
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
    question: "How do I submit my pitch deck (ideathon)?",
    answer: "Fork the pitch deck template repo, update it with your project (problems, solution, MVP, video, feedback form link), fix errors, create a branch and open a PR, then deploy on Vercel. Submit your pitch deck (Vercel URL) through the submission form before the deadline (6th February 2025, 9 AM)."
  },
  {
    question: "Do I need to have an idea before the event?",
    answer: "While having an idea beforehand is helpful, you can also ideate during the event. There's dedicated time on 6th Feb (5 PM-9 PM) for teams without ideas to brainstorm."
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
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [showSubmissionNotice, setShowSubmissionNotice] = useState(false)
  const [selectedProblem, setSelectedProblem] = useState<ProblemStatement | null>(null)
  const [mobileProblemIndex, setMobileProblemIndex] = useState(0)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Mobile: rotate problem card every 5 seconds
  useEffect(() => {
    const id = setInterval(() => {
      setMobileProblemIndex((i) => (i + 1) % problemStatements.length)
    }, 5000)
    return () => clearInterval(id)
  }, [])

  // Countdown timer for Ideathon (pitch deck due 6th February 2026, 9 AM)
  useEffect(() => {
    const targetDate = new Date('2026-02-06T09:00:00').getTime()
    
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

  // Detect active section on scroll (throttled + only update state when changed to avoid lag)
  const lastActiveRef = useRef<string | null>(null)
  const lastPastHeroRef = useRef<boolean | null>(null)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const sections = ['hero', 'overview', 'timeline', 'problems', 'rules', 'registration', 'hackathon', 'faq', 'contact']
    const navbarHeight = 80

    const updateFromScroll = () => {
      const scrollPosition = window.scrollY + 150
      let newSection: string | null = null
      let newPastHero = false

      const heroEl = document.getElementById('hero')
      if (heroEl) {
        newPastHero = heroEl.getBoundingClientRect().top < -navbarHeight
      }

      for (const section of sections) {
        const el = document.getElementById(section)
        if (el) {
          const { offsetTop, offsetHeight } = el
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            newSection = section
            break
          }
        }
      }
      if (newSection === null) newSection = 'hero'

      if (lastActiveRef.current !== newSection) {
        lastActiveRef.current = newSection
        setActiveSection(newSection)
      }
      if (lastPastHeroRef.current !== newPastHero) {
        lastPastHeroRef.current = newPastHero
        setIsScrolledPastHero(newPastHero)
      }
      rafRef.current = null
    }

    const handleScroll = () => {
      if (rafRef.current != null) return
      rafRef.current = requestAnimationFrame(updateFromScroll)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    updateFromScroll()
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current)
    }
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

  const f4NavStyles = [
    "[data-fantastic-4-page] .f4-nav, [data-fantastic-4-page] .f4-nav *,",
    "[data-fantastic-4-page] .f4-nav-bar, [data-fantastic-4-page] .f4-nav-bar * {",
    "  color: #0E4A80 !important;",
    "}"
  ].join("\n")

  const navPortal =
    isMounted
      ? createPortal(
          <div data-fantastic-4-page className="f4-nav-portal">
            <nav className="f4-nav fixed top-0 left-0 right-0 z-50 bg-transparent px-3 py-2 max-w-full overflow-hidden">
              <div className="mx-auto max-w-7xl min-w-0 overflow-hidden">
                <div className="f4-nav-bar flex items-center justify-between gap-2 md:gap-4 rounded-full border-2 border-[#0E4A80] px-3 md:px-4 py-2 outline outline-2 outline-white outline-offset-0 min-w-0 overflow-hidden" style={{ backgroundColor: "#ffffff" }}>
                  <Link href="/" className="flex items-center justify-center flex-shrink-0 min-h-[44px] min-w-[44px] py-2 hover:opacity-80 active:opacity-90 transition-opacity rounded-lg" style={{ color: "#0E4A80" }} aria-label="Back to Home">
                    <Home className="h-5 w-5 md:h-6 md:w-6" style={{ color: "#0E4A80" }} />
                  </Link>
                  <div className="hidden lg:flex items-center gap-1 flex-1 min-w-0 justify-center overflow-x-auto overflow-y-hidden py-1 f4-nav-links">
                    {navItems.map((item) => {
                      const isActive = activeSection === item.id
                      return (
                        <button
                          key={item.id}
                          onClick={() => scrollToSection(item.id)}
                          className={`inline-flex h-9 items-center rounded-full px-3 text-sm leading-none transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring whitespace-nowrap ${isActive ? "bg-[#0E4A80]/10" : "hover:bg-[#0E4A80]/10"}`}
                          style={{ fontFamily: '"Audiowide", cursive', color: "#0E4A80" }}
                        >
                          {item.showBadge && (
                            <span className="flex items-center justify-center w-5 h-5 rounded-full text-xs font-bold flex-shrink-0 mr-1" style={{ backgroundColor: "rgba(14,74,128,0.15)", border: "1px solid #0E4A80", color: "#0E4A80" }}>4</span>
                          )}
                          {item.isLive && (
                            <span className="relative flex items-center gap-1 flex-shrink-0 mr-1">
                              <span className="relative flex h-2 w-2 md:h-2.5 md:w-2.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: "#158fd4" }} />
                                <span className="relative inline-flex rounded-full h-2 w-2 md:h-2.5 md:w-2.5" style={{ backgroundColor: "#0e4a80" }} />
                              </span>
                              <span className="text-xs font-bold animate-pulse" style={{ color: "#0E4A80" }}>LIVE</span>
                            </span>
                          )}
                          {item.label}
                        </button>
                      )
                    })}
                  </div>
                  <Fantastic4MobileMenu navItems={navItems} activeSection={activeSection} onNavClick={scrollToSection} />
                </div>
              </div>
            </nav>
          </div>,
          document.body
        )
      : null

  return (
    <div className="min-h-screen relative bg-transparent overflow-x-hidden" data-fantastic-4-page style={{ fontFamily: '"Audiowide", cursive' }}>
      {/* Force navbar text #0E4A80 — scoped style wins over global white */}
      <style dangerouslySetInnerHTML={{ __html: f4NavStyles }} />
      {/* Submission opens notice — shown when SUBMIT is clicked */}
      <Dialog open={showSubmissionNotice} onOpenChange={setShowSubmissionNotice}>
        <DialogContent className="max-w-sm sm:max-w-md border-2 border-[#0E4A80] bg-white shadow-[0_0_24px_rgba(14,74,128,0.4)]" showCloseButton>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-[#0E4A80] text-xl md:text-2xl">
              <Calendar className="h-6 w-6 flex-shrink-0" />
              Submission opens soon
            </DialogTitle>
            <DialogDescription className="text-base text-[#374151] pt-2">
              The submission form will open on <span className="font-semibold text-[#0E4A80]">4th February</span>. Please check back then to submit your pitch deck.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      {/* Enlarged problem card — shown when a problem card is clicked */}
      <Dialog open={!!selectedProblem} onOpenChange={(open) => !open && setSelectedProblem(null)}>
        <DialogContent className="max-w-lg border-2 border-[#0E4A80] bg-white shadow-[0_0_24px_rgba(14,74,128,0.4)] p-0 overflow-hidden" showCloseButton>
          {selectedProblem && (
            <Card className="h-full border-0 shadow-none rounded-none" style={{ borderColor: "#0e4a80" }}>
              <CardHeader className="p-5 sm:p-6">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="text-xs font-semibold mb-1 uppercase tracking-wide text-[#9daecc]">
                      {selectedProblem.industry}
                    </div>
                    <CardTitle className="text-xl sm:text-2xl leading-tight text-black">{selectedProblem.title}</CardTitle>
                  </div>
                  <span className="text-sm font-mono text-muted-foreground ml-2">#{selectedProblem.id}</span>
                </div>
                <CardDescription className="text-base sm:text-lg mb-4 leading-relaxed text-[#374151]">
                  {selectedProblem.description}
                </CardDescription>
                <div className="flex flex-wrap gap-2">
                  {selectedProblem.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="rounded-md border border-border/50 bg-card/50 px-2.5 py-1 text-sm text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </CardHeader>
            </Card>
          )}
        </DialogContent>
      </Dialog>
      {/* Fixed background — palette blue #158fd4 + black contribution-style grid */}
      <div
        className="fixed left-0 top-0 -z-20 overflow-hidden"
        style={{ width: "100vw", height: "100vh", minWidth: "100vw", minHeight: "100dvh", backgroundColor: "#158fd4" }}
        aria-hidden
      />
      <div
        className="f4-grid-overlay fixed left-0 top-0 -z-[19] w-full h-full pointer-events-none"
        aria-hidden
      />
      {/* Navbar rendered via portal into document.body so it stays fixed to viewport (avoids Framer Motion transform containing block) */}
      {navPortal}
      {/* Spacer so content starts below fixed navbar */}
      <div className="f4-nav-spacer h-16 md:h-20 flex-shrink-0" aria-hidden />
      {/* Single scrollable page - one column, fixed background behind all content */}
      <div className="relative z-10 bg-transparent overflow-x-hidden max-w-full w-full" style={{ isolation: "isolate" }}>
        {/* Hero section — Mobile: stacked (content → CTAs → Herbie). Desktop: Herbie left, content right; Herbie bottom aligns with button row. */}
        <div id="hero" className="relative flex flex-col md:flex-row items-stretch md:items-start min-h-[85vh] md:min-h-[90vh] w-full max-w-full overflow-hidden f4-hero-mobile box-border gap-0">
          {/* Mobile: Herbie at bottom (order-3), right beside buttons. Desktop: left column, Herbie top aligns with button row. */}
          <div className="order-3 md:order-none flex-shrink-0 w-full md:w-[28%] md:min-w-[100px] md:max-w-[280px] lg:max-w-[320px] xl:max-w-[360px] 2xl:max-w-[380px] flex flex-col items-center justify-end md:justify-end pl-0 pr-0 md:pl-3 lg:pl-4 self-stretch min-h-0 md:min-h-0 max-h-[22vh] md:max-h-none overflow-hidden -mt-1 md:mt-0">
            {/* Our sponsors — above Herbie only; pushed down from navbar, mobile-friendly */}
            <div className="flex flex-col items-center justify-center gap-2 sm:gap-2.5 flex-shrink-0 mb-2 md:mb-3 pt-5 sm:pt-6 md:pt-8 px-4 sm:px-0">
              <span
                className="text-xs sm:text-sm font-semibold uppercase tracking-wider"
                style={{ color: "#ffffff" }}
              >
                Our sponsors
              </span>
              <Image
                src="/mpower_logo2.png"
                alt="MPOWER+ — Powering better connection"
                width={320}
                height={128}
                className="h-20 sm:h-24 md:h-28 lg:h-32 xl:h-36 w-auto max-w-[min(280px,85vw)] sm:max-w-none object-contain flex-shrink-0"
                unoptimized
              />
            </div>
            {/* Mobile only: Herbie at bottom, contained — pushed down a bit */}
            <div className="md:hidden w-full max-w-[min(200px,85vw)] mx-auto flex items-end justify-center overflow-hidden flex-shrink-0 mt-2">
              <Image
                src="/herbiee_mobile.png"
                alt=""
                width={480}
                height={960}
                className="w-full h-auto max-h-[18vh] object-contain object-bottom drop-shadow-2xl pointer-events-none select-none"
                priority
                aria-hidden
              />
            </div>
            {/* Desktop: full Herbie — top starts beside button row */}
            <Image
              src="/herbie.png"
              alt=""
              width={480}
              height={480}
              className="hidden md:block w-full h-auto max-h-[85vh] md:max-h-[90vh] object-contain object-left-top drop-shadow-2xl pointer-events-none select-none md:mt-16 lg:mt-20 xl:mt-24"
              priority
              aria-hidden
            />
          </div>
          {/* Content block — Mobile: order-1 (top). Desktop: right column; same top padding as Our sponsors so Buildit × Unstop aligns. */}
          <div className="order-1 flex-1 flex flex-col items-center justify-start min-h-0 min-w-0 pt-5 sm:pt-6 md:pt-8 pb-4 sm:pb-6 md:pb-10 lg:pb-12 xl:pb-14 px-6 sm:px-8 md:px-10 lg:px-12 xl:px-16 2xl:px-20 max-w-full overflow-hidden gap-2 sm:gap-3 md:gap-4 lg:gap-5">
            {/* Buildit × Unstop only — Our sponsors moved above Herbie */}
            <div className="flex-shrink-0 flex items-center justify-center gap-3 sm:gap-4 md:gap-5 lg:gap-6 w-full">
              <Image
                src="/images/builditlogo.png"
                alt="Buildit Logo"
                width={200}
                height={200}
                className="h-20 sm:h-24 md:h-28 lg:h-32 xl:h-36 2xl:h-40 w-auto object-contain flex-shrink-0"
                priority
              />
              <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold flex-shrink-0" style={{ color: "#9daecc" }}>×</span>
              <Image
                src="/unstop-logo.svg"
                alt="Unstop Logo"
                width={120}
                height={120}
                className="h-10 sm:h-11 md:h-12 lg:h-14 xl:h-16 w-auto object-contain flex-shrink-0"
                priority
              />
            </div>

            {/* Date Badge — bigger */}
            <div className="flex justify-center mt-2 sm:mt-3 md:mt-4 lg:mt-5 mb-0.5">
              <div className="inline-flex items-center gap-2 md:gap-2.5 px-4 sm:px-5 md:px-6 py-2 md:py-2.5 lg:py-3 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-semibold">
                <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 md:h-5 md:w-5 lg:h-6 lg:w-6" />
                <span style={{ fontFamily: '"Audiowide", cursive', color: "#ffffff" }}>6th–7th February 2025</span>
              </div>
            </div>

            {/* Main Logo — bigger text, padding so nothing is cut off (incl. the "c") */}
            <div className="flex flex-col items-center justify-center flex-shrink-0 px-4 sm:px-6 md:px-8 w-full max-w-full overflow-visible">
              <div className="flex items-center gap-2 sm:gap-3 md:gap-4 justify-center w-full max-w-full min-w-0 overflow-visible px-2">
                <span
                  className="font-bold leading-[0.9] flex-shrink-0 whitespace-nowrap overflow-visible"
                  style={{
                    fontFamily: '"Rock Salt", cursive',
                    color: "#ffffff",
                    fontSize: "clamp(2.75rem, 9vw, 11rem)",
                  }}
                >
                  Fantastic
                </span>
                <div className="relative flex items-center justify-center flex-shrink-0">
                  <span
                    className="flex items-center justify-center rounded-full border-2 border-white flex-shrink-0"
                    style={{
                      backgroundColor: "#158fd4",
                      width: "clamp(4rem, 9vw, 11rem)",
                      height: "clamp(4rem, 9vw, 11rem)",
                    }}
                  >
                    <span
                      className="font-bold leading-none"
                      style={{
                        fontFamily: '"Rock Salt", cursive',
                        transform: "scale(1.3)",
                        position: "relative",
                        zIndex: 10,
                        color: "#ffffff",
                        fontSize: "clamp(2rem, 5vw, 6.5rem)",
                      }}
                    >
                      4
                    </span>
                  </span>
                </div>
              </div>
              {/* Tagline — bigger */}
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-bold mt-2.5 sm:mt-3 md:mt-4 lg:mt-5 text-white px-2" style={{ fontFamily: '"Rock Salt", cursive' }}>
                Ideate. Innovate. Build. Win.
              </p>
            </div>

            {/* Event Type — bigger */}
            <div className="text-center mt-2.5 sm:mt-3 md:mt-4 lg:mt-5 px-0">
              <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-white font-medium" style={{ fontFamily: '"Audiowide", cursive' }}>
                A Week-Long Ideathon + Overnight Hackathon
              </p>
            </div>

            {/* Problem Statement caption — bigger */}
            <div className="text-center mt-2.5 sm:mt-3 md:mt-4 lg:mt-5 px-0">
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold text-white">
                Problem Statement is out now
              </p>
            </div>

            {/* CTA Buttons — mobile: full-width stacked. Desktop: row with wrap */}
            <div className="order-2 md:order-none flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center justify-center gap-3 sm:gap-4 md:gap-5 lg:gap-6 mt-4 sm:mt-5 md:mt-6 lg:mt-8 px-0 w-full max-w-full f4-hero-ctas">
              <a 
                href="https://docs.google.com/forms/d/e/1FAIpQLScKvdNbf30WiqiZuRj70rXZ95rvPfLZCHrGpIarpsF6w6S4og/viewform"
                target="_blank"
                rel="noopener noreferrer"
                className="f4-cta-button w-full sm:w-auto min-h-[44px] sm:min-h-0"
              >
                REGISTER
              </a>
              <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 flex-shrink-0 rotate-90 sm:rotate-0 hidden sm:block" style={{ color: "#9daecc" }} />
              <a 
                href={PITCH_DECK_REPO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="f4-cta-button w-full sm:w-auto min-h-[44px] sm:min-h-0"
              >
                PITCH DECK
              </a>
              <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 flex-shrink-0 rotate-90 sm:rotate-0 hidden sm:block" style={{ color: "#9daecc" }} />
              <a 
                href="https://docs.google.com/forms/d/e/1FAIpQLScKvdNbf30WiqiZuRj70rXZ95rvPfLZCHrGpIarpsF6w6S4og/viewform"
                target="_blank"
                rel="noopener noreferrer"
                className="f4-cta-button w-full sm:w-auto min-h-[44px] sm:min-h-0"
              >
                SUBMIT
              </a>
            </div>
          </div>
        </div>

        {/* Overview — MISSION BRIEFING (retro-futuristic) */}
        <div id="overview" className="f4-section f4-section--overview relative w-full max-w-full min-h-[85vh] flex flex-col items-center justify-center py-12 md:py-24 px-4 overflow-hidden box-border">
          <div className="f4-briefing-frame relative z-0 mx-auto max-w-7xl w-full flex flex-col items-center gap-6 md:gap-10 rounded-lg px-4 py-6 md:px-10 md:py-10 overflow-hidden">
            <div className="text-center max-w-2xl">
              <h3 className="text-sm sm:text-base font-semibold uppercase tracking-wider mb-3" style={{ fontFamily: '"Audiowide", cursive', color: "#9daecc" }}>
                Purpose
              </h3>
              <p className="text-sm sm:text-base md:text-lg leading-relaxed text-justify" style={{ color: "#ffffff" }}>
                Fantastic 4 is all about turning ideas into action. It&apos;s a hands-on event where you think creatively, solve real problems, and build something meaningful. Instead of just discussing ideas, you&apos;ll actually work on them—learning, experimenting, and improving along the way.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 w-full max-w-4xl text-center sm:text-left">
              <div>
                <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
                  <Calendar className="h-4 w-4 flex-shrink-0" style={{ color: "#9daecc" }} />
                  <span className="text-sm sm:text-base font-semibold text-white" style={{ fontFamily: '"Audiowide", cursive' }}>
                    Phase 1 — Ideathon
                  </span>
                </div>
                <p className="text-xs sm:text-sm leading-relaxed" style={{ color: "#9daecc" }}>
                  1st–5th Feb. Build your pitch deck: fork the template repo, update content, fix errors, create a branch & PR, and deploy on Vercel.
                </p>
              </div>
              <div>
                <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
                  <Code className="h-4 w-4 flex-shrink-0" style={{ color: "#9daecc" }} />
                  <span className="text-sm sm:text-base font-semibold text-white" style={{ fontFamily: '"Audiowide", cursive' }}>
                    Phase 2 — Hackathon
                  </span>
                </div>
                <p className="text-xs sm:text-sm leading-relaxed" style={{ color: "#9daecc" }}>
                  6th–7th Feb. Overnight build: Treasure Hunt, What&apos;s The Word, then intensive development and final pitching.
                </p>
              </div>
            </div>
            <div className="text-center">
              <h3 className="text-sm sm:text-base font-semibold uppercase tracking-wider mb-3" style={{ fontFamily: '"Audiowide", cursive', color: "#9daecc" }}>
                Why participate
              </h3>
              <ul className="flex flex-wrap justify-center gap-4 sm:gap-6 text-sm sm:text-base" style={{ color: "#ffffff" }}>
                <li className="flex items-center gap-1.5">
                  <Trophy className="h-4 w-4 flex-shrink-0" style={{ color: "#9daecc" }} />
                  <span>Prizes & goodies</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <Users className="h-4 w-4 flex-shrink-0" style={{ color: "#9daecc" }} />
                  <span>Network & learn</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <Award className="h-4 w-4 flex-shrink-0" style={{ color: "#9daecc" }} />
                  <span>Portfolio & certificate</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Timeline — LAUNCH SEQUENCE */}
        <div id="timeline" className="f4-section f4-section--timeline relative pt-16 md:pt-20 pb-12 md:pb-16 px-4 overflow-hidden max-w-full">
          <div className="absolute top-8 md:top-12 left-1/2 transform -translate-x-1/2 pointer-events-auto z-50">
          <a
            href="#timeline"
            onClick={(e) => {
              e.preventDefault()
              scrollToSection('timeline')
            }}
            className={cn(
              "relative inline-flex items-center gap-1.5 md:gap-2 px-3 md:px-5 py-1.5 md:py-2.5 rounded-full border-2 backdrop-blur-md shadow-xl transition-transform duration-300 animate-pulse",
              activeSection === "timeline" ? "scale-110" : "hover:scale-110"
            )}
            style={{ backgroundColor: "rgba(14,74,128,0.5)", borderColor: "#0e4a80" }}
          >
            <span className="relative flex h-2 w-2 md:h-2.5 md:w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: "#158fd4" }}></span>
              <span className="relative inline-flex rounded-full h-2 w-2 md:h-2.5 md:w-2.5" style={{ backgroundColor: "#0e4a80" }}></span>
            </span>
            <span className="text-xs md:text-sm font-bold text-white drop-shadow-lg">
              LIVE NOW
            </span>
            <span className="absolute inset-0 rounded-full blur-md -z-10 animate-pulse" style={{ backgroundColor: "rgba(14,74,128,0.5)" }}></span>
          </a>
        </div>
        <div className="relative mx-auto max-w-6xl px-3 md:px-4 pointer-events-auto z-10 mt-12 md:mt-16">
          <div className="mb-6 md:mb-12 text-center pt-8 md:pt-12">
            <h2 className="f4-timeline-title mb-3 md:mb-6 text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-white inline-block">
              Timeline
            </h2>
            <p className="mx-auto max-w-3xl text-base md:text-xl lg:text-2xl text-muted-foreground leading-relaxed px-2">
              A structured week-long journey from ideation to victory
            </p>
          </div>

          {/* Timeline */}
          <TimelineComponent timeline={timeline} />
        </div>
        </div>

        {/* Problems — BRIEFING FILES */}
        <div id="problems" className="f4-section f4-section--problems relative py-16 md:py-24 px-4 overflow-hidden max-w-full">
          <div className="relative mx-auto max-w-7xl w-full overflow-hidden">
          <div className="text-center">
            <h2 className="mb-3 md:mb-8 text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-white">
              Problem Statements
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 md:gap-3 mb-3 md:mb-6">
              <button
                onClick={handleDownloadPDF}
                disabled={isGeneratingPDF}
                className="inline-flex items-center gap-1.5 md:gap-2 px-3 md:px-5 py-1.5 md:py-2.5 rounded-lg border-2 font-semibold transition-all hover:scale-105 backdrop-blur-sm shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 text-xs md:text-sm"
                style={{ backgroundColor: "rgba(14,74,128,0.4)", borderColor: "#0e4a80", color: "#ffffff" }}
                aria-label="Download Problem Statements PDF"
              >
                <Download className={`h-4 w-4 md:h-5 md:w-5 ${isGeneratingPDF ? 'animate-spin' : ''}`} />
                <span className="whitespace-nowrap">{isGeneratingPDF ? 'Generating...' : 'Download PDF'}</span>
              </button>
              <a
                href={PITCH_DECK_REPO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 md:gap-2 px-3 md:px-5 py-1.5 md:py-2.5 rounded-lg border-2 font-semibold transition-all hover:scale-105 backdrop-blur-sm shadow-lg text-xs md:text-sm"
                style={{ backgroundColor: "rgba(14,74,128,0.4)", borderColor: "#0e4a80", color: "#ffffff" }}
                aria-label="Fork Pitch Deck"
              >
                <Download className="h-4 w-4 md:h-5 md:w-5" />
                <span className="whitespace-nowrap">Pitch Deck</span>
              </a>
            </div>
            <p className="mx-auto max-w-3xl text-sm md:text-xl lg:text-2xl text-muted-foreground mb-3 md:mb-6 leading-relaxed px-2">
              Choose from these AI-generated problem statements or come up with your own innovative solution
            </p>
            <div className="inline-flex items-center gap-1.5 md:gap-2 rounded-full border-2 px-3 md:px-6 py-2 md:py-3 text-xs md:text-base lg:text-lg font-semibold backdrop-blur-md max-w-[95%] md:max-w-none" style={{ borderColor: "#0e4a80", backgroundColor: "rgba(14,74,128,0.2)", color: "#ffffff" }}>
              <Lightbulb className="h-4 w-4 md:h-5 md:w-5 flex-shrink-0" />
              <span className="text-center">Open Innovation: Participants can modify problems or create their own as per MVP requirements</span>
            </div>
          </div>
        </div>

        {/* Problem statements — Mobile: one card carousel (5s), click to enlarge. Desktop: infinite scroll, click to enlarge. No hover pause. */}
        <div className="relative min-h-[280px] w-full mt-6">
          {/* Mobile: one card at a time, auto-advance every 5s, click opens enlarged */}
          <div className="md:hidden w-full max-w-sm mx-auto px-4 min-h-[280px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              {problemStatements[mobileProblemIndex] && (
                <motion.button
                  key={mobileProblemIndex}
                  type="button"
                  onClick={() => setSelectedProblem(problemStatements[mobileProblemIndex])}
                  className="w-full text-left rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0e4a80] focus-visible:ring-offset-2"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                >
                  <Card className="h-full border-2 backdrop-blur-sm transition-colors hover:shadow-lg" style={{ borderColor: "#0e4a80" }}>
                    <CardHeader>
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <div className="text-xs font-semibold mb-1 uppercase tracking-wide" style={{ color: "#9daecc" }}>
                            {problemStatements[mobileProblemIndex].industry}
                          </div>
                          <CardTitle className="text-lg leading-tight">{problemStatements[mobileProblemIndex].title}</CardTitle>
                        </div>
                        <span className="text-xs font-mono text-muted-foreground ml-2">#{problemStatements[mobileProblemIndex].id}</span>
                      </div>
                      <CardDescription className="text-sm mb-4 leading-relaxed">
                        {problemStatements[mobileProblemIndex].description}
                      </CardDescription>
                      <div className="flex flex-wrap gap-1.5">
                        {problemStatements[mobileProblemIndex].tags.map((tag, tagIndex) => (
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
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          {/* Desktop: infinite scroll, click opens enlarged (no hover pause) */}
          <div
            className="hidden md:block overflow-hidden h-full w-full relative min-h-[280px]"
            style={{
              maskImage: "linear-gradient(to right, transparent 0%, black 64px, black calc(100% - 64px), transparent 100%)",
              WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 64px, black calc(100% - 64px), transparent 100%)",
            }}
          >
            <div className="flex animate-scroll">
              {problemStatements.map((problem) => (
                <button
                  key={`first-${problem.id}`}
                  type="button"
                  onClick={() => setSelectedProblem(problem)}
                  className="flex-shrink-0 w-64 sm:w-72 md:w-96 px-1.5 sm:px-2 md:px-3 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0e4a80] focus-visible:ring-offset-2 rounded-lg"
                >
                  <Card className="h-full border-2 backdrop-blur-sm transition-colors hover:shadow-lg" style={{ borderColor: "#0e4a80" }}>
                    <CardHeader>
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <div className="text-xs font-semibold mb-1 uppercase tracking-wide" style={{ color: "#9daecc" }}>
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
                </button>
              ))}
              {problemStatements.map((problem) => (
                <button
                  key={`second-${problem.id}`}
                  type="button"
                  onClick={() => setSelectedProblem(problem)}
                  className="flex-shrink-0 w-64 sm:w-72 md:w-96 px-1.5 sm:px-2 md:px-3 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0e4a80] focus-visible:ring-offset-2 rounded-lg"
                >
                  <Card className="h-full border-2 backdrop-blur-sm transition-colors hover:shadow-lg" style={{ borderColor: "#0e4a80" }}>
                    <CardHeader>
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <div className="text-xs font-semibold mb-1 uppercase tracking-wide" style={{ color: "#9daecc" }}>
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
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Rules — PROTOCOL / DIRECTIVE */}
        <div id="rules" className="f4-section f4-section--rules relative py-16 md:py-24 px-4 overflow-hidden max-w-full">
          <div className="relative mx-auto max-w-6xl w-full overflow-hidden">
        <div className="mb-4 md:mb-12 text-center pt-6 md:pt-12">
          <h2 className="mb-3 md:mb-8 text-xl sm:text-2xl md:text-5xl lg:text-6xl font-bold text-white">
            Rules & Judging Criteria
          </h2>
        </div>

        <div className="grid gap-4 md:gap-8 md:grid-cols-2">
          <Card className="border-2 backdrop-blur-md transition-colors" style={{ borderColor: "#0e4a80" }}>
            <CardHeader className="pb-2 md:pb-3 p-3 md:p-6">
              <div className="flex items-center gap-2 mb-2">
                <Target className="h-4 w-4 md:h-6 md:w-6 flex-shrink-0" style={{ color: "#9daecc" }} />
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
                    <CheckCircle2 className="h-3.5 w-3.5 md:h-5 md:w-5 mt-0.5 flex-shrink-0" style={{ color: "#9daecc" }} />
                    <span className="text-xs md:text-sm text-muted-foreground leading-relaxed">{rule}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="border-2 backdrop-blur-md transition-colors" style={{ borderColor: "#0e4a80" }}>
            <CardHeader className="pb-2 md:pb-3 p-3 md:p-6">
              <div className="flex items-center gap-2 mb-2">
                <Award className="h-4 w-4 md:h-6 md:w-6 flex-shrink-0" style={{ color: "#9daecc" }} />
                <CardTitle className="text-base md:text-2xl">Judging Criteria</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="px-3 md:px-6 pb-3 md:pb-6">
              <ul className="space-y-2.5 md:space-y-4">
                {judgingCriteria.map((criterion, index) => (
                  <li key={index} className="flex items-start gap-2 md:gap-3">
                    <CheckCircle2 className="h-3.5 w-3.5 md:h-5 md:w-5 flex-shrink-0 mt-0.5 md:mt-1" style={{ color: "#9daecc" }} />
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
        </div>

        {/* Stage 1 — ENLIST */}
        <div id="registration" className="f4-section f4-section--registration relative py-16 md:py-24 px-4 sm:px-6 md:px-8 lg:px-12 overflow-hidden max-w-full">
          <div className="relative w-full max-w-4xl mx-auto overflow-hidden">
          <div className="text-center mb-4 md:mb-12 pt-6 md:pt-12">
            <h2 className="mb-2 md:mb-6 text-xl sm:text-2xl md:text-5xl lg:text-6xl font-bold text-white">
              STAGE 1: IDEATHON
            </h2>
            <p className="text-xs sm:text-sm md:text-lg lg:text-xl text-muted-foreground mb-3 md:mb-8 max-w-3xl mx-auto px-2">
              Participate in the ideation phase and transform your innovative ideas into actionable project plans.
            </p>
          </div>

          <div className="w-full space-y-4 md:space-y-12">
            {/* Step 1 */}
            <div className="flex items-start md:items-center gap-2.5 sm:gap-3 md:gap-8 lg:gap-10 justify-between flex-col sm:flex-row">
              <div className="flex items-start md:items-center gap-2.5 sm:gap-3 md:gap-8 lg:gap-10 flex-1 w-full">
                <div className="f4-step-number flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full border-2 flex items-center justify-center" style={{ backgroundColor: "rgba(14,74,128,0.5)", borderColor: "#0e4a80" }}>
                  <span className="font-bold text-sm sm:text-base md:text-xl lg:text-2xl text-white">1</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-white mb-1.5 sm:mb-2 md:mb-3 text-sm sm:text-base md:text-xl lg:text-2xl xl:text-3xl">Register for the Event</p>
                  <p className="text-xs sm:text-sm md:text-lg lg:text-xl leading-relaxed" style={{ color: "#9daecc" }}>Fill out the registration form to secure your spot in the ideathon phase.</p>
                </div>
              </div>
              <a 
                href="https://docs.google.com/forms/d/e/1FAIpQLScKvdNbf30WiqiZuRj70rXZ95rvPfLZCHrGpIarpsF6w6S4og/viewform"
                target="_blank"
                rel="noopener noreferrer"
                className="f4-cta-button flex-shrink-0 w-full sm:w-auto mt-2 sm:mt-0"
              >
                REGISTER
              </a>
            </div>

            {/* Step 2 */}
            <div className="flex items-start md:items-center gap-2.5 sm:gap-3 md:gap-8 lg:gap-10 justify-between flex-col sm:flex-row">
              <div className="flex items-start md:items-center gap-2.5 sm:gap-3 md:gap-8 lg:gap-10 flex-1 w-full">
                <div className="f4-step-number flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full border-2 flex items-center justify-center" style={{ backgroundColor: "rgba(14,74,128,0.5)", borderColor: "#0e4a80" }}>
                  <span className="font-bold text-sm sm:text-base md:text-xl lg:text-2xl text-white">2</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-white mb-1.5 sm:mb-2 md:mb-3 text-sm sm:text-base md:text-xl lg:text-2xl xl:text-3xl">Build Your Pitch Deck</p>
                  <p className="text-xs sm:text-sm md:text-lg lg:text-xl leading-relaxed mb-1.5 sm:mb-2 md:mb-3" style={{ color: "#9daecc" }}>Fork the pitch deck template repo, replace the template with your project (problems, solution, MVP, video, form link), fix any errors, create a branch and open a PR, then deploy on Vercel. Your score depends on completing these steps.</p>
                  <p className="text-xs sm:text-xs md:text-base lg:text-lg xl:text-xl font-semibold text-white">Participation certificates will be awarded to all 4 team members upon successful submission.</p>
                </div>
              </div>
              <a 
                href={PITCH_DECK_REPO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="f4-cta-button flex-shrink-0 w-full sm:w-auto mt-2 sm:mt-0"
              >
                PITCH DECK
              </a>
            </div>

            {/* Step 3 */}
            <div className="flex items-start md:items-center gap-2.5 sm:gap-3 md:gap-8 lg:gap-10 justify-between flex-col sm:flex-row">
              <div className="flex items-start md:items-center gap-2.5 sm:gap-3 md:gap-8 lg:gap-10 flex-1 w-full">
                <div className="f4-step-number flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full border-2 flex items-center justify-center" style={{ backgroundColor: "rgba(14,74,128,0.5)", borderColor: "#0e4a80" }}>
                  <span className="font-bold text-sm sm:text-base md:text-xl lg:text-2xl text-white">3</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-white mb-1.5 sm:mb-2 md:mb-3 text-sm sm:text-base md:text-xl lg:text-2xl xl:text-3xl">Submit Your Pitch Deck</p>
                  <p className="text-xs sm:text-sm md:text-lg lg:text-xl leading-relaxed mb-1.5 sm:mb-2 md:mb-3" style={{ color: "#9daecc" }}>Submit your pitch deck through the submission form (Vercel URL / feedback form link) before the deadline.</p>
                  <p className="text-xs sm:text-xs md:text-base lg:text-lg xl:text-xl font-semibold text-white">Goodies will be provided to the top 3 ideations.</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowSubmissionNotice(true)}
                className="f4-cta-button flex-shrink-0 w-full sm:w-auto mt-2 sm:mt-0"
              >
                SUBMIT
              </button>
            </div>
          </div>
        </div>
        </div>

        {/* Stage 2 — CLASSIFIED (locked) */}
        <div id="hackathon" className="f4-section f4-section--hackathon relative py-16 md:py-24 px-4 overflow-hidden max-w-full">
          <div className="relative mx-auto max-w-2xl w-full overflow-hidden">
          <div className="text-center mb-6 md:mb-12 pt-8 md:pt-12">
            <div className="flex items-center justify-center gap-2 md:gap-3 mb-4 md:mb-6">
              <Lock className="h-6 w-6 md:h-10 md:w-10 flex-shrink-0" style={{ color: "#9daecc" }} />
              <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-white">
                STAGE 2: HACKATHON
              </h2>
            </div>
            <p className="text-sm md:text-lg lg:text-xl text-muted-foreground mb-4 md:mb-8 max-w-3xl mx-auto px-2">
              Stage 2 (Hackathon) is locked. Focus on the ideathon: build your pitch deck and submit by the deadline below.
            </p>
          </div>

          <Card className="border-2 backdrop-blur-md max-w-2xl mx-auto w-full" style={{ borderColor: "#0e4a80" }}>
            <CardHeader className="py-4 md:py-8 px-3 md:px-6">
              <CardTitle className="text-xl md:text-2xl lg:text-3xl mb-4 md:mb-6 text-center">Ideathon Pitch Deck Due In</CardTitle>
              <CardContent className="px-2 md:px-6">
                <div className="grid grid-cols-4 gap-2 md:gap-6">
                  <div className="text-center">
                    <div className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-1 md:mb-2">
                      {timeLeft.days}
                    </div>
                    <div className="text-xs md:text-base text-muted-foreground uppercase">Days</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-1 md:mb-2">
                      {timeLeft.hours}
                    </div>
                    <div className="text-xs md:text-base text-muted-foreground uppercase">Hours</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-1 md:mb-2">
                      {timeLeft.minutes}
                    </div>
                    <div className="text-xs md:text-base text-muted-foreground uppercase">Minutes</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-1 md:mb-2">
                      {timeLeft.seconds}
                    </div>
                    <div className="text-xs md:text-base text-muted-foreground uppercase">Seconds</div>
                  </div>
                </div>
                <div className="mt-4 md:mt-6 text-center">
                  <p className="text-xs md:text-sm lg:text-base text-muted-foreground">
                    Due by <span className="font-semibold text-white">6th February 2026, 9:00 AM</span>
                  </p>
                </div>
              </CardContent>
            </CardHeader>
          </Card>
        </div>
        </div>

        {/* FAQ — TRANSMISSION LOG */}
        <div id="faq" className="f4-section f4-section--faq relative py-12 md:py-16 px-4 overflow-hidden max-w-full">
          <div className="mx-auto max-w-4xl w-full overflow-hidden">
          <div className="mb-6 md:mb-12 text-center pt-8 md:pt-12">
            <h2 className="mb-4 md:mb-6 text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-white">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3 md:space-y-4">
            {faqs.map((faq, index) => {
              return (
                <div key={index}>
                  <Card className="border-2 backdrop-blur-sm transition-all" style={{ borderColor: "#0e4a80" }}>
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
        </div>

        {/* Contact — SIGNAL */}
        <div id="contact" className="f4-section f4-section--contact relative py-16 md:py-24 px-4 overflow-hidden max-w-full">
          <div className="relative mx-auto max-w-6xl w-full overflow-hidden">
          <div className="text-center mb-6 md:mb-12 pt-8 md:pt-12">
            <h2 className="mb-3 md:mb-6 text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-white">
              Contact Us
            </h2>
            <p className="text-sm md:text-base lg:text-lg max-w-2xl mx-auto px-2" style={{ color: "#9daecc" }}>
              Have questions? Reach out to us and we'll be happy to help!
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4 md:gap-6 max-w-xl mx-auto w-full">
            <Card className="border-2 backdrop-blur-sm transition-all" style={{ borderColor: "#0e4a80" }}>
              <CardContent className="pt-3 md:pt-4 pb-3 md:pb-4 px-3 md:px-4">
                <div className="flex flex-col items-center text-center gap-2 md:gap-3">
                  <div className="p-1.5 md:p-2 rounded-full" style={{ backgroundColor: "rgba(14,74,128,0.4)" }}>
                    <Mail className="h-4 w-4 md:h-5 md:w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xs md:text-sm font-semibold text-white mb-0.5 md:mb-1">Email Us</h3>
                    <a 
                      href="mailto:builditmuj.club@gmail.com"
                      className="text-xs transition-colors break-all text-white"
                    >
                      builditmuj.club@gmail.com
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-2 backdrop-blur-sm transition-all" style={{ borderColor: "#0e4a80" }}>
              <CardContent className="pt-3 md:pt-4 pb-3 md:pb-4 px-3 md:px-4">
                <div className="flex flex-col items-center text-center gap-2 md:gap-3">
                  <div className="p-1.5 md:p-2 rounded-full" style={{ backgroundColor: "rgba(14,74,128,0.4)" }}>
                    <Phone className="h-4 w-4 md:h-5 md:w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xs md:text-sm font-semibold text-white mb-0.5 md:mb-1">Call Us</h3>
                    <a 
                      href="tel:+917680868626"
                      className="text-xs transition-colors text-white"
                    >
                      +91 76808 68626
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      </div>
    </div>
  </div>
  )
}
