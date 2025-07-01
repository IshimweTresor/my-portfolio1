"use server"

export async function sendContactEmail(formData: {
  name: string
  email: string
  subject: string
  message: string
}) {
  try {
    // Validate input
    if (!formData.name || !formData.email || !formData.message) {
      return {
        success: false,
        error: "Missing required fields",
      }
    }

    // Create email content
    const emailContent = {
      to: "ishimwet15@gmail.com",
      subject: `Portfolio Contact: ${formData.subject || "New message from your portfolio"}`,
      from: "ishimwet15@gmail.com",
      replyTo: formData.email,
      text: `
        Name: ${formData.name}
        Email: ${formData.email}
        
        Message:
        ${formData.message}
      `,
    }

    // In development/preview, just log the email content
    console.log("Email content:", emailContent)
    
    // For now, just simulate a successful email sending
    return {
      success: true,
    }
  } catch (error) {
    console.error("Error sending email:", error)
    return {
      success: false,
      error: "Failed to send email",
    }
  }
}