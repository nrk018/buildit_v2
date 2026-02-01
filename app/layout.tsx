import type React from "react"
import type { Metadata } from "next"
import localFont from "next/font/local"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"
import SiteNav from "@/components/site-nav" // fix SiteNav import path to point to the actual component with default export
import { TransitionProvider } from "@/components/transition-provider" // new
// sound provider removed

const bitcount = localFont({
  src: "./fonts/BitcountPropSingleInk.ttf",
  variable: "--font-bitcount",
  display: "swap",
})

const siteUrl = 'https://builditmuj.club'

export const metadata: Metadata = {
  title: {
    default: "BuildIt — MUJ Builder Club | Student Development Platform",
    template: "%s | BuildIt — MUJ Builder Club"
  },
  description: "A builder club at Manipal University Jaipur — where students build real-world projects, learn from industry experts, and ship innovative solutions.",
  keywords: [
    "BuildIt",
    "MUJ Builder Club",
    "Manipal University Jaipur",
    "Student Development",
    "Project Learning",
    "Tech Mentorship",
    "AI Data Science",
    "Robotics Automation",
    "Web Development",
    "Student Projects",
    "Tech Community",
    "Builder Club",
    "Student Platform",
    "Tech Education",
    "Project Management"
  ],
  authors: [{ name: "BuildIt — MUJ Builder Club", url: siteUrl }],
  creator: "BuildIt — MUJ Builder Club",
  publisher: "Manipal University Jaipur",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: '/images/builditlogo.png',
    shortcut: '/images/builditlogo.png',
    apple: '/images/builditlogo.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    title: 'BuildIt — MUJ Builder Club | Student Development Platform',
    description: 'A builder club at Manipal University Jaipur — where students build real-world projects, learn from industry experts, and ship innovative solutions.',
    siteName: 'BuildIt — MUJ Builder Club',
    images: [
      {
        url: '/images/builditlogo.png',
        width: 1200,
        height: 630,
        alt: 'BuildIt — MUJ Builder Club Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BuildIt — MUJ Builder Club | Student Development Platform',
    description: 'A builder club at Manipal University Jaipur — where students build real-world projects, learn from industry experts, and ship innovative solutions.',
    images: ['/images/builditlogo.png'],
    creator: '@buildit_muj',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
  category: 'education',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "BuildIt — MUJ Builder Club",
    "description": "A comprehensive student development platform at Manipal University Jaipur focused on project-centric learning and industry mentorship.",
    "url": siteUrl,
    "logo": `${siteUrl}/images/builditlogo.png`,
    "foundingDate": "2024",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Jaipur",
      "addressRegion": "Rajasthan",
      "addressCountry": "India"
    },
    "parentOrganization": {
      "@type": "EducationalOrganization",
      "name": "Manipal University Jaipur"
    },
    "sameAs": [
      "https://github.com/buildit-muj",
      "https://twitter.com/buildit_muj",
      "https://linkedin.com/company/buildit-muj"
    ],
    "offers": {
      "@type": "EducationalOccupationalProgram",
      "name": "Student Development Program",
      "description": "Project-centric learning with mentorship in AI, Robotics, Web Development, and more",
      "provider": {
        "@type": "Organization",
        "name": "BuildIt — MUJ Builder Club"
      }
    }
  }

  return (
    <html lang="en" className={`${bitcount.variable} dark antialiased`}>
      <head>
        <link rel="icon" href="/images/builditlogo.png" type="image/png" sizes="any" />
        <link rel="apple-touch-icon" href="/images/builditlogo.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Rock+Salt&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Audiowide&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </head>
      <body className="min-h-dvh bg-background text-foreground font-sans">
        <TransitionProvider>
            <div className="relative flex min-h-dvh flex-col">
              <Suspense fallback={<div>Loading...</div>}>
                <SiteNav />
              </Suspense>
              <main className="flex-1">{children}</main>
              <footer className="border-t border-border/50 py-8 text-center text-sm text-muted-foreground">
                <p className="px-4">© {new Date().getFullYear()} BuildIt — Manipal University Jaipur</p>
              </footer>
            </div>
        </TransitionProvider>
        <Analytics />
      </body>
    </html>
  )
}
