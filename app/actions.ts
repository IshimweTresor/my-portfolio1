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
    
    // Fix the URL construction to avoid double https://
    let baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL || 'my-portfolio-sigma-blond-90.vercel.app';
    
    // Make sure we have a properly formatted URL with https
    if (baseUrl.startsWith('http')) {
      // URL already has protocol
    } else {
      // Add https:// prefix if missing
      baseUrl = `https://${baseUrl}`;
    }
    
    // Remove any trailing slash
    baseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
    
    console.log(`Sending email via API. Environment: ${process.env.NODE_ENV || 'production'}, Base URL: ${baseUrl}`);
    
    // Make the API call to our route handler with improved error handling
    try {
      const response = await fetch(`${baseUrl}/api/send-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      // Get the response as text first for logging purposes
      const responseText = await response.text();
      console.log(`API Response status: ${response.status}, body: ${responseText}`);
      
      // Parse the response JSON
      let data;
      try {
        data = JSON.parse(responseText);
      } catch (e) {
        throw new Error(`Invalid JSON response: ${responseText}`);
      }
      
      if (!response.ok) {
        throw new Error(data.error || `API error: ${response.status}`);
      }
      
      return data;
    } catch (fetchError) {
      console.error("Fetch error:", fetchError);
      throw fetchError;
    }
  } catch (error) {
    console.error("Error sending email:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to send email",
    }
  }
}