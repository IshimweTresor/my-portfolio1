"use server"

import { z } from "zod"

// Create a schema for email validation
const ContactFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  subject: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

export async function sendContactEmail(formData: {
  name: string
  email: string
  subject: string
  message: string
}) {
  try {
    // Validate input
    const validatedFields = ContactFormSchema.safeParse(formData)
    
    if (!validatedFields.success) {
      // Extract the first error message for clearer feedback
      const fieldErrors = validatedFields.error.flatten().fieldErrors;
      const errorMessage = Object.entries(fieldErrors)
        .map(([field, errors]) => `${field}: ${errors?.[0]}`)
        .join(', ');
        
      return {
        success: false,
        error: `Validation failed: ${errorMessage}`,
      }
    }
    
    // Get the base URL for the API call
    // This is crucial - we need an absolute URL for fetch in server components
    const baseUrl = process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}` 
      : process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    
    // Make the API call to our route handler
    const response = await fetch(`${baseUrl}/api/send-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || 'Failed to send email');
    }
    
    const data = await response.json();
    return data; // Should return {success: true}
    
  } catch (error) {
    console.error("Error sending email:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to send email",
    }
  }
}