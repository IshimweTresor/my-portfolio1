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
    
    // Determine if we're running in development or production
    const isDevelopment = process.env.NODE_ENV === 'development';
    
    // Set the base URL with a smart detection system
    let baseUrl;
    
    // Priority order for determining the base URL:
    if (process.env.VERCEL_URL) {
      // 1. If we're on Vercel and have VERCEL_URL 
      baseUrl = `https://${process.env.VERCEL_URL}`;
    } else if (process.env.NEXT_PUBLIC_VERCEL_URL) {
      // 2. If we have a manually specified Vercel URL
      baseUrl = `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
    } else if (isDevelopment) {
      // 3. If we're in development mode, use localhost
      baseUrl = 'http://localhost:3000';
    } else {
      // 4. Fallback to the configured base URL
      baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    }
    
    // Remove trailing slash if present
    const apiBaseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
    
    console.log(`Sending email via API. Environment: ${isDevelopment ? 'Development' : 'Production'}, Base URL: ${apiBaseUrl}`);
    
    // Make the API call to our route handler
    const response = await fetch(`${apiBaseUrl}/api/send-email`, {
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