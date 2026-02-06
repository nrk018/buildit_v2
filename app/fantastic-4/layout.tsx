import type { Metadata } from "next"

const siteUrl = "https://builditmuj.club"

export const metadata: Metadata = {
  title: "Fantastic 4 — Ideathon + Hackathon | BuildIt MUJ",
  description: "Join Fantastic 4 at MUJ: Ideathon (1st–12th Feb) followed by an overnight Hackathon (13th–14th Feb) by BuildIt. Register now to build real-world prototypes with industry mentors. Prize pool: ₹30,000+ goodies. Feb 2026.",
  keywords: [
    "Fantastic 4",
    "Ideathon",
    "Hackathon",
    "BuildIt MUJ",
    "Manipal University Jaipur",
    "Tech Event",
    "Web Development",
    "Mobile Development",
    "Web3",
    "AI/ML",
    "Unstop",
  ],
  alternates: {
    canonical: "/fantastic-4",
  },
  openGraph: {
    title: "Fantastic 4 — Ideathon × Hackathon | BuildIt MUJ",
    description: "Join Fantastic 4 at MUJ: A week-long Ideathon × Overnight Hackathon by BuildIt. Register now to build real-world prototypes with industry mentors.",
    type: "website",
    url: `${siteUrl}/fantastic-4`,
    siteName: "BuildIt — MUJ Builder Club",
    locale: "en_US",
    images: [
      {
        url: "/images/builditlogo.png",
        width: 1200,
        height: 630,
        alt: "Fantastic 4 Hackathon MUJ Feb 2026 — BuildIt × Unstop",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fantastic 4 — Ideathon × Hackathon | BuildIt MUJ",
    description: "Join Fantastic 4 at MUJ: A week-long Ideathon × Overnight Hackathon by BuildIt. Register now to build real-world prototypes with industry mentors.",
    images: ["/images/builditlogo.png"],
  },
}

export default function Fantastic4Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
