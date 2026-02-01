import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About BuildIt — MUJ Builder Club",
  description:
    "Learn about BuildIt, the premier student development platform at Manipal University Jaipur. Discover our mission, team, and commitment to student growth through project-centric learning.",
  keywords: [
    "About BuildIt",
    "MUJ Builder Club Mission",
    "Student Development Platform",
    "Manipal University Jaipur",
    "Tech Education",
    "Project Learning",
    "Student Mentorship",
  ],
  openGraph: {
    title: "About BuildIt — MUJ Builder Club",
    description:
      "Learn about BuildIt, the premier student development platform at Manipal University Jaipur. Discover our mission, team, and commitment to student growth.",
    type: "website",
  },
  twitter: {
    title: "About BuildIt — MUJ Builder Club",
    description:
      "Learn about BuildIt, the premier student development platform at Manipal University Jaipur. Discover our mission and commitment to student growth.",
  },
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children
}
