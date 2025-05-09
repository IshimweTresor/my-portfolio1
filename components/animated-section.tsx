"use client"

import { useRef, useEffect, useState, type ReactNode } from "react"
import { motion } from "framer-motion"
import { fadeIn } from "@/lib/animation"

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  direction?: "up" | "down" | "left" | "right"
  delay?: number
  id?: string
}

export default function AnimatedSection({
  children,
  className = "",
  direction = "up",
  delay = 0,
  id,
}: AnimatedSectionProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.15,
      },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [])

  return (
    <motion.div
      ref={ref}
      id={id}
      className={className}
      variants={fadeIn(direction, delay)}
      initial="hidden"
      animate={isVisible ? "show" : "hidden"}
    >
      {children}
    </motion.div>
  )
}
