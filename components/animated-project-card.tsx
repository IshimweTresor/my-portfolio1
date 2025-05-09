"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Github, ExternalLink } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface AnimatedProjectCardProps {
  title: string
  description: string
  image: string
  tags: string[]
  liveLink?: string
  githubLink: string
  delay?: number
}

export default function AnimatedProjectCard({
  title,
  description,
  image,
  tags,
  liveLink,
  githubLink,
  delay = 0,
}: AnimatedProjectCardProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.6,
            delay,
            ease: "easeOut",
          },
        },
      }}
      whileHover={{
        y: -10,
        transition: {
          duration: 0.3,
          ease: "easeOut",
        },
      }}
    >
      <Card className="overflow-hidden flex flex-col h-full border-2 hover:border-emerald-500/50 transition-all duration-300 hover:shadow-xl">
        <motion.div
          className="relative h-48 w-full overflow-hidden bg-white"
          whileHover={{
            scale: 1.05,
            transition: { duration: 0.3 },
          }}
        >
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            fill
            className="object-contain p-2 transition-transform"
          />
        </motion.div>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="animate-in fade-in duration-300">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex gap-2 mt-auto">
          {liveLink && (
            <Button variant="outline" size="sm" asChild className="group">
              <Link href={liveLink} target="_blank" className="flex items-center gap-1">
                <ExternalLink size={14} className="group-hover:text-emerald-500 transition-colors" />
                <span className="group-hover:text-emerald-500 transition-colors">Live</span>
              </Link>
            </Button>
          )}
          <Button variant="outline" size="sm" asChild className="group">
            <Link href={githubLink} target="_blank" className="flex items-center gap-1">
              <Github size={14} className="group-hover:text-emerald-500 transition-colors" />
              <span className="group-hover:text-emerald-500 transition-colors">Code</span>
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
