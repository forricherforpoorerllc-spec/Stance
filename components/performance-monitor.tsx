"use client"

import { useEffect } from "react"

export function PerformanceMonitor() {
  useEffect(() => {
    // Only run in production
    if (process.env.NODE_ENV !== "production") return

    // First Contentful Paint
    const fcpObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries()
      if (entries.length > 0) {
        const fcp = entries[0].startTime
        console.log("FCP:", fcp)
      }
    })

    // Largest Contentful Paint
    const lcpObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries()
      if (entries.length > 0) {
        const lastEntry = entries[entries.length - 1]
        const lcp = lastEntry.startTime
        console.log("LCP:", lcp)
      }
    })

    // Cumulative Layout Shift
    const clsObserver = new PerformanceObserver((entryList) => {
      let clsValue = 0
      for (const entry of entryList.getEntries()) {
        if (!entry.hadRecentInput) {
          // @ts-ignore - TS doesn't know about value property on LayoutShift
          clsValue += entry.value
        }
      }
      console.log("CLS:", clsValue)
    })

    // First Input Delay
    const fidObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries()
      if (entries.length > 0) {
        const fid = entries[0].processingStart - entries[0].startTime
        console.log("FID:", fid)
      }
    })

    // Time to First Byte
    const navigationEntries = performance.getEntriesByType("navigation")
    if (navigationEntries.length > 0) {
      // @ts-ignore - TS doesn't know about responseStart property
      const ttfb = navigationEntries[0].responseStart
      console.log("TTFB:", ttfb)
    }

    // Start observing
    try {
      fcpObserver.observe({ type: "paint", buffered: true })
      lcpObserver.observe({ type: "largest-contentful-paint", buffered: true })
      clsObserver.observe({ type: "layout-shift", buffered: true })
      fidObserver.observe({ type: "first-input", buffered: true })
    } catch (e) {
      console.error("Performance observer error:", e)
    }

    // Cleanup
    return () => {
      fcpObserver.disconnect()
      lcpObserver.disconnect()
      clsObserver.disconnect()
      fidObserver.disconnect()
    }
  }, [])

  // Don't render anything visible
  return null
}
