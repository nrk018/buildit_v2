"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function StartBuildingPage() {
  const router = useRouter()

  // Registration page is not available from nav; redirect direct visits to home
  useEffect(() => {
    router.replace("/")
  }, [router])

  return null
}
