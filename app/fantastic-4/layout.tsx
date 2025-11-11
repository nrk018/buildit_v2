import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Fantastic 4 — Ideathon + Hackathon | BuildIt MUJ",
  description: "Join Fantastic 4, a week-long ideathon followed by an overnight hackathon. Ideate. Innovate. Build. Win. Prize pool: ₹30,000 + goodies. Organized by BuildIt & Unstop.",
  keywords: [
    "Fantastic 4",
    "Ideathon",
    "Hackathon",
    "BuildIt MUJ",
    "Tech Event",
    "Web Development",
    "Mobile Development",
    "Web3",
    "AI/ML",
    "Unstop",
  ],
  openGraph: {
    title: "Fantastic 4 — Ideathon + Hackathon | BuildIt MUJ",
    description: "Join Fantastic 4, a week-long ideathon followed by an overnight hackathon. Prize pool: ₹30,000 + goodies.",
    type: "website",
  },
  twitter: {
    title: "Fantastic 4 — Ideathon + Hackathon",
    description: "Join Fantastic 4, a week-long ideathon followed by an overnight hackathon. Prize pool: ₹30,000 + goodies.",
  },
}

export default function Fantastic4Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
