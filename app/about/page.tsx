"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"

const domains = [
  "AI & DS",
  "Robotics & Automation",
  "Research & Innovation",
  "Entrepreneurship & Startups",
  "Web & App Development",
  "Mechatronics",
]

interface TeamMember {
  avatar?: string
  name: string
  role: string
}

// Team groups with subnav: Board, Executive, Core Committee, Junior Committee
type TeamGroup = "Board of Directors" | "Executive Committee" | "Core Committee" | "Junior Committee"

interface TeamGroupMember {
  name: string
  role: string
  subgroup?: string
}

const teamGroups: Record<TeamGroup, TeamGroupMember[]> = {
  "Board of Directors": [
    { name: "Nirmal Rajkumar", role: "President" },
    { name: "Varun Mehrotra", role: "Vice President" },
    { name: "Krishna Goel", role: "General Secretary" },
  ],
  "Executive Committee": [
    { name: "Shaurya Sharma", role: "Chief Financial Officer" },
    { name: "Ram Vignesh", role: "Executive Head of Projects Management" },
    { name: "S Kaushik Rao", role: "Executive Head of Projects Management" },
    { name: "Nishant Bharadhwaj", role: "Executive Head of Technical Projects" },
    { name: "Nishant Chaudhary", role: "Executive Head of Productions" },
    { name: "Nikitha D. Sheoran", role: "Executive Head of Technical Communication" },
    { name: "Gayathri", role: "Executive Head of Technical Communication" },
    { name: "Vallala S S D V Vardhan", role: "Executive Head of Human Resources" },
    { name: "Sidharth Mandal", role: "Executive Head of Media & Design" },
    { name: "Nikunj Khandelwal", role: "Executive Head of Logistics" },
  ],
  "Core Committee": [
    { name: "—", role: "", subgroup: "Finance & Sponsorship" },
    { name: "—", role: "", subgroup: "Productions" },
    { name: "—", role: "", subgroup: "Graphic Design & Media" },
    { name: "—", role: "", subgroup: "HR" },
    { name: "—", role: "", subgroup: "Technical Committee" },
    { name: "—", role: "", subgroup: "Logistics & Marketing" },
  ],
  "Junior Committee": [
    { name: "—", role: "", subgroup: "Finance & Sponsorship" },
    { name: "—", role: "", subgroup: "Productions" },
    { name: "—", role: "", subgroup: "Graphic Design & Media" },
    { name: "—", role: "", subgroup: "HR" },
    { name: "—", role: "", subgroup: "Technical Committee" },
    { name: "—", role: "", subgroup: "Logistics & Marketing" },
  ],
}

const MENTORS: TeamMember[] = [
  {
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D",
    name: "Dr. Sarah Chen",
    role: "Senior Software Engineer at Google",
  },
  {
    avatar:
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cGVvcGxlfGVufDB8fDB8fHww",
    name: "Alex Rodriguez",
    role: "AI Research Lead at Microsoft",
  },
  {
    avatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D",
    name: "Priya Sharma",
    role: "Product Manager at Meta",
  },
  {
    avatar:
      "https://images.unsplash.com/photo-1522556189639-b150ed9c4330?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzB8fHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D",
    name: "Michael Johnson",
    role: "Robotics Engineer at Tesla",
  },
  {
    avatar:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDl8fHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D",
    name: "Dr. Emily Watson",
    role: "Data Science Director at Amazon",
  },
  {
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDZ8fHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D",
    name: "David Kim",
    role: "Startup Founder & GSoC Mentor",
  },
  {
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTZ8fHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D",
    name: "Lisa Thompson",
    role: "UX Design Lead at Apple",
  },
  {
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGVvcGxlfGVufDB8fDB8fHww",
    name: "Dr. Raj Patel",
    role: "Blockchain Expert at JPMC",
  },
]

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <header className="mb-8">
        <h1
          className="text-balance text-3xl font-semibold md:text-4xl"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          About BuildIt
        </h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          We are a builder club at Manipal University Jaipur with a simple ethos: build consistently, learn deeply, and
          ship confidently.
        </p>
      </header>

      <section className="grid gap-6 md:grid-cols-2">
        <Card title="Mission">
          Empower students to become consistent builders, turning ideas into shipped products.
        </Card>
        <Card title="Vision">
          A thriving ecosystem where student teams iterate, get mentored, and showcase their work to grow careers and
          community.
        </Card>
        <Card title="Philosophy">
          Minimalism, focus, and craftsmanship. Every interaction and pixel has a purpose.
        </Card>
      </section>

      <section className="mt-12" aria-labelledby="domains-heading">
        <h2 id="domains-heading" className="text-2xl font-semibold" style={{ fontFamily: "var(--font-space-grotesk)" }}>
          Domains
        </h2>
        <p className="mt-2 text-sm text-muted-foreground max-w-2xl">
          BuildIt focuses on AI & Data Science, Robotics, Web & App Development, and more. Our events and projects span these areas.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {domains.map((d) => (
            <div
              key={d}
              className="rounded-lg border border-border/50 bg-card p-4 text-sm hover:shadow-lg hover:shadow-primary/10"
            >
              {d}
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm text-muted-foreground">
          <Link href="/fantastic-4" className="font-medium text-primary underline-offset-4 hover:underline">
            Join Fantastic 4
          </Link>
          {" "}— our Ideathon × Hackathon — to build real-world prototypes in these domains.
        </p>
      </section>

      <section className="mt-16">
        <TeamSection />
      </section>

      <section className="mt-16">
        <MentorsSection />
      </section>
    </div>
  )
}

function TeamCard({
  member,
  className,
  ...props
}: React.ComponentProps<"div"> & { member: TeamMember }) {
  const isSubgroupOnly = member.name === "—" && member.role
  return (
    <div className={cn("space-y-3 rounded-lg border bg-card p-4", className)} {...props}>
      <div className="aspect-square w-full rounded-lg border border-border/50 bg-muted/30 flex items-center justify-center text-xs text-muted-foreground">
        Image placeholder
      </div>
      <div className="space-y-1">
        {isSubgroupOnly ? (
          <h3 className="text-base font-semibold leading-tight">{member.role}</h3>
        ) : (
          <>
            <h3 className="text-base font-semibold leading-tight">{member.role || member.name}</h3>
            {member.name && member.name !== "—" && (
              <p className="text-sm text-muted-foreground">{member.name}</p>
            )}
          </>
        )}
      </div>
    </div>
  )
}

function TeamTabs() {
  const groups: TeamGroup[] = [
    "Board of Directors",
    "Executive Committee",
    "Core Committee",
    "Junior Committee",
  ]
  const [active, setActive] = useState<TeamGroup>(groups[0])
  const [sub, setSub] = useState<string | null>(null)
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 8

  useEffect(() => {
    setSub(null)
    setCurrentPage(1)
  }, [active])

  const showMembers = teamGroups[active].filter((m) => !sub || m.subgroup === sub)
  const totalPages = Math.max(1, Math.ceil(showMembers.length / itemsPerPage))
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const pageMembers = showMembers.slice(startIndex, endIndex)
  const subgroups = Array.from(
    new Set(teamGroups[active].map((m) => m.subgroup).filter(Boolean))
  ) as string[]

  useEffect(() => {
    setCurrentPage(1)
  }, [sub])

  useEffect(() => {
    if (totalPages <= 1) return
    const id = setInterval(() => {
      setCurrentPage((p) => (p % totalPages) + 1)
    }, 5000)
    return () => clearInterval(id)
  }, [totalPages, active, sub])

  return (
    <div>
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 pt-2 pb-2">
        <div className="flex justify-center flex-wrap gap-2">
          <div className="inline-flex flex-wrap justify-center gap-1 rounded-full border border-border bg-card p-1">
            {groups.map((g) => (
              <button
                key={g}
                onClick={() => setActive(g)}
                className={cn(
                  "px-3 py-1.5 text-sm rounded-full",
                  active === g
                    ? "bg-primary text-primary-foreground shadow"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        {subgroups.length > 0 && (
          <>
            <div className="mt-2 hidden md:flex justify-center">
              <div className="inline-flex flex-wrap rounded-full border border-border bg-card p-1 gap-1">
                <button
                  onClick={() => setSub(null)}
                  className={cn(
                    "px-3 py-1 text-sm rounded-full",
                    sub === null
                      ? "bg-secondary text-secondary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  All
                </button>
                {subgroups.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSub(s)}
                    className={cn(
                      "px-3 py-1 text-sm rounded-full",
                      sub === s
                        ? "bg-secondary text-secondary-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-2 flex md:hidden justify-center">
              <button
                onClick={() => setIsSubMenuOpen(true)}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-2 text-sm"
                aria-label="Open subgroup menu"
              >
                <span>Roles</span>
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              </button>
            </div>

            <AnimatePresence>
              {isSubMenuOpen && (
                <>
                  <motion.button
                    aria-label="Close submenu backdrop"
                    onClick={() => setIsSubMenuOpen(false)}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="fixed inset-0 z-40 bg-black/40"
                  />
                  <motion.div
                    role="dialog"
                    aria-modal="true"
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "100%" }}
                    transition={{ type: "spring", stiffness: 260, damping: 26 }}
                    className="fixed bottom-0 left-0 right-0 z-50 rounded-t-2xl border border-border bg-card p-4 shadow-lg"
                  >
                    <div className="mx-auto max-w-5xl">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-sm font-medium">Choose role</span>
                        <button onClick={() => setIsSubMenuOpen(false)} className="rounded-md p-2 hover:bg-background/60" aria-label="Close">
                          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                          </svg>
                        </button>
                      </div>
                      <div className="grid grid-cols-2 gap-2 max-h-[50vh] overflow-y-auto">
                        <button
                          onClick={() => {
                            setSub(null)
                            setIsSubMenuOpen(false)
                            setCurrentPage(1)
                          }}
                          className={cn(
                            "w-full rounded-md border border-border px-3 py-2 text-sm text-left",
                            sub === null ? "bg-secondary text-secondary-foreground" : "bg-card hover:bg-background/60"
                          )}
                        >
                          All
                        </button>
                        {subgroups.map((s) => (
                          <button
                            key={s}
                            onClick={() => {
                              setSub(s)
                              setIsSubMenuOpen(false)
                              setCurrentPage(1)
                            }}
                            className={cn(
                              "w-full rounded-md border border-border px-3 py-2 text-sm text-left",
                              sub === s ? "bg-secondary text-secondary-foreground" : "bg-card hover:bg-background/60"
                            )}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </>
        )}
      </div>

      <div className="mt-3 max-h-[420px] md:max-h-[480px] overflow-y-auto overscroll-contain pr-2">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${active}-${sub ?? "all"}-${currentPage}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 will-change-[opacity,transform]"
          >
            {showMembers.length === 0 ? (
              <div className="col-span-full text-center text-muted-foreground py-8">Updating soon</div>
            ) : (
              pageMembers.map((m, idx) => (
                <TeamCard
                  key={`${m.name}-${m.role}-${m.subgroup ?? ""}-${startIndex + idx}`}
                  member={{
                    name: m.name,
                    role: m.subgroup ? m.subgroup : m.role,
                    avatar: "",
                  }}
                  className="bg-card border rounded-lg"
                />
              ))
            )}
          </motion.div>
        </AnimatePresence>

        {totalPages > 1 && (
          <div className="mt-3 flex items-center justify-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="rounded-md px-3 py-1 text-sm hover:bg-accent/40"
              aria-label="Previous page"
            >
              Previous
            </button>
            <span className="text-sm text-muted-foreground">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="rounded-md px-3 py-1 text-sm hover:bg-accent/40"
              aria-label="Next page"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

function TeamSection() {
  return (
    <div className="py-16">
      <div className="text-center mb-8">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Meet our <span className="text-primary">executive team</span>
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Passionate students leading BuildIt&apos;s mission to empower builders and create innovative projects.
        </p>
      </div>
      <TeamTabs />
    </div>
  )
}

function MentorCard({
  member,
  className,
  ...props
}: React.ComponentProps<"div"> & { member: TeamMember }) {
  return (
    <div className={cn("space-y-3 rounded-lg border bg-card p-4", className)} {...props}>
      {member.avatar ? (
        <div className="aspect-square w-full relative rounded-lg border border-border/50 overflow-hidden bg-muted/30">
          <Image
            src={member.avatar}
            alt={member.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
        </div>
      ) : (
        <div className="aspect-square w-full rounded-lg border border-border/50 bg-muted/30 flex items-center justify-center text-xs text-muted-foreground">
          Image placeholder
        </div>
      )}
      <div className="space-y-1">
        <h3 className="text-base font-semibold leading-tight">{member.name}</h3>
        <p className="text-sm text-muted-foreground">{member.role}</p>
      </div>
    </div>
  )
}

function MentorsSection() {
  return (
    <div className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Our <span className="text-primary">industry mentors</span>
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Experienced professionals from top tech companies guiding our students with real-world expertise and industry
          insights.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {MENTORS.map((mentor, index) => (
          <div key={index}>
            <MentorCard
              className="bg-card border rounded-lg hover:shadow-lg hover:shadow-primary/10 transition-shadow"
              member={mentor}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20% 0px -10% 0px" }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="rounded-lg border border-border/50 bg-card p-5"
    >
      <h3 className="text-lg font-semibold" style={{ fontFamily: "var(--font-space-grotesk)" }}>
        {title}
      </h3>
      <p className="mt-2 text-muted-foreground">{children}</p>
    </motion.div>
  )
}
