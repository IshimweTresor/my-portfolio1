"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, Github, Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { navVariants } from "@/lib/animation"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { theme, setTheme } = useTheme()
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const closeMenu = () => {
    setIsOpen(false)
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/#about" },
    { name: "Projects", path: "/#projects" },
    { name: "GitHub", path: "/#github" },
    { name: "Contact", path: "/#contact" },
  ]

  const linkVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
    hover: {
      y: -2,
      color: "rgb(5, 150, 105)",
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
  }

  return (
    <motion.header
      variants={navVariants}
      initial="hidden"
      animate="show"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <Link href="/" className="font-bold text-xl text-emerald-600 dark:text-emerald-500">
              Ishimwe Tresor
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link, i) => (
              <motion.div
                key={link.name}
                custom={i}
                variants={linkVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
              >
                <Link
                  href={link.path}
                  className={`text-sm font-medium transition-colors ${
                    pathname === link.path ? "text-emerald-600 dark:text-emerald-500" : ""
                  }`}
                  onClick={closeMenu}
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="flex items-center space-x-2"
            >
              <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
                {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link
                  href="https://github.com/IshimweTresor"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1"
                >
                  <Github size={16} />
                  <span className="hidden lg:inline">GitHub</span>
                </Link>
              </Button>
            </motion.div>
          </nav>

          {/* Mobile Navigation Toggle */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex items-center md:hidden space-x-2"
          >
            <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </Button>
            <Button variant="ghost" size="icon" onClick={toggleMenu} aria-label="Toggle menu">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-white dark:bg-gray-900 shadow-lg"
        >
          <div className="container mx-auto px-4 py-4 space-y-3">
            {navLinks.map((link, i) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  href={link.path}
                  className="block py-2 text-sm font-medium hover:text-emerald-600 dark:hover:text-emerald-500 transition-colors"
                  onClick={closeMenu}
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
              <Button variant="outline" size="sm" asChild className="w-full mt-4">
                <Link
                  href="https://github.com/IshimweTresor"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2"
                  onClick={closeMenu}
                >
                  <Github size={16} />
                  GitHub Profile
                </Link>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      )}
    </motion.header>
  )
}
