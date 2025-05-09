"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import emailjs from '@emailjs/browser';

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  // Get environment variables directly on usage rather than storing in state
  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
  const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

  useEffect(() => {
    // Log environment variables on mount for debugging (only in development)
    if (process.env.NODE_ENV === 'development') {
      console.log('EmailJS Config:', {
        serviceId: serviceId ? '✅ Set' : '❌ Missing',
        templateId: templateId ? '✅ Set' : '❌ Missing',
        publicKey: publicKey ? '✅ Set' : '❌ Missing'
      });
    }
  }, [serviceId, templateId, publicKey]);

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
    
    if (formData.message.length < 10) {
      toast({
        title: "Message too short",
        description: "Your message must be at least 10 characters long.",
        variant: "destructive",
      })
      return
    }

    // Check if EmailJS config is available
    if (!serviceId || !templateId || !publicKey) {
      toast({
        title: "Configuration error",
        description: "Email service not properly configured. Please try again later.",
        variant: "destructive",
      })
      console.error("EmailJS config missing:", {
        hasServiceId: Boolean(serviceId),
        hasTemplateId: Boolean(templateId),
        hasPublicKey: Boolean(publicKey),
      });
      return;
    }

    setIsSubmitting(true)

    try {
      // Use EmailJS to send the email directly from the client
      const result = await emailjs.sendForm(
        serviceId,
        templateId,
        formRef.current!,
        publicKey
      );

      console.log('Email sent successfully!', result.text);
      
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
    } catch (error) {
      console.error('Failed to send message:', error);
      toast({
        title: "Error",
        description: "Failed to send your message. Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Animation variants
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
      ref={formRef}
      className="space-y-4"
      onSubmit={handleSubmit}
      variants={formVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {/* Form fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.div className="space-y-2" variants={itemVariants}>
          <label htmlFor="name" className="text-sm font-medium">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            name="name" 
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
            name="email"
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
          name="subject"
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
          name="message"
          rows={5}
          className="w-full px-3 py-2 border rounded-md dark:bg-gray-800 dark:border-gray-700 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
          placeholder="Your message (minimum 10 characters)"
          value={formData.message}
          onChange={handleChange}
          required
        />
        {formData.message && formData.message.length < 10 && (
          <p className="text-xs text-red-500">
            Message must be at least 10 characters long
          </p>
        )}
      </motion.div>
      <motion.div variants={itemVariants}>
        <div id="form-status" className="h-12">
          {isSubmitting && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-3 rounded-md bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
            >
              Sending your message...
            </motion.div>
          )}
        </div>
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