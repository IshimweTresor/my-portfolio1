"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { sendContactEmail } from "@/app/actions"
import { useToast } from "@/hooks/use-toast"

export default function ContactForm() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      const result = await sendContactEmail(formData)

      if (result.success) {
        toast({
          title: "Message received!",
          description: "Thank you for your message. I'll get back to you soon.",
        })

        // Reset form
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        })
      } else {
        throw new Error(result.error || "Failed to send message")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Something went wrong. Please try again later.",
        variant: "destructive",
      })
      console.error("Contact form error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const formVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  }

  return (
    <motion.form
      className="space-y-4"
      onSubmit={handleSubmit}
      variants={formVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.div className="space-y-2" variants={itemVariants}>
          <label htmlFor="name" className="text-sm font-medium">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            type="text"
            className="w-full px-3 py-2 border rounded-md dark:bg-gray-800 dark:border-gray-700 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
            placeholder="Your name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </motion.div>
        <motion.div className="space-y-2" variants={itemVariants}>
          <label htmlFor="email" className="text-sm font-medium">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            type="email"
            className="w-full px-3 py-2 border rounded-md dark:bg-gray-800 dark:border-gray-700 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
            placeholder="Your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </motion.div>
      </div>
      <motion.div className="space-y-2" variants={itemVariants}>
        <label htmlFor="subject" className="text-sm font-medium">
          Subject
        </label>
        <input
          id="subject"
          type="text"
          className="w-full px-3 py-2 border rounded-md dark:bg-gray-800 dark:border-gray-700 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
          placeholder="Subject"
          value={formData.subject}
          onChange={handleChange}
        />
      </motion.div>
      <motion.div className="space-y-2" variants={itemVariants}>
        <label htmlFor="message" className="text-sm font-medium">
          Message <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          rows={5}
          className="w-full px-3 py-2 border rounded-md dark:bg-gray-800 dark:border-gray-700 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
          placeholder="Your message"
          value={formData.message}
          onChange={handleChange}
          required
        />
      </motion.div>
      <motion.div variants={itemVariants}>
        <Button type="submit" className="w-full relative overflow-hidden group" disabled={isSubmitting}>
          <span className="relative z-10">{isSubmitting ? "Sending..." : "Send Message"}</span>
          <motion.span
            className="absolute inset-0 bg-emerald-700 dark:bg-emerald-600 z-0"
            initial={{ x: "-100%" }}
            whileHover={{ x: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          />
        </Button>
      </motion.div>
    </motion.form>
  )
}
