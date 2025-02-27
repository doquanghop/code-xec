"use client"

import { useEffect, useState } from "react"
import DesktopView from "./desktop-view"
import MobileView from "./mobile-view"

export default function CodingChallengePage() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Initial check
    checkIfMobile()

    // Add event listener
    window.addEventListener("resize", checkIfMobile)

    // Clean up
    return () => window.removeEventListener("resize", checkIfMobile)
  }, [])

  return isMobile ? <MobileView /> : <DesktopView />
}

