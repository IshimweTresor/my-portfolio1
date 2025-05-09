import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    // Verify environment variables are set
    if (!process.env.EMAIL_USER || !process.env.EMAIL_APP_PASSWORD) {
      console.error("Email environment variables not configured");
      return NextResponse.json(
        { success: false, error: "Email service not configured" },
        { status: 500 }
      );
    }

    const data = await request.json();
    
    // Validate input
    if (!data.name || !data.email || !data.message) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    console.log("Email request received with data:", {
      name: data.name,
      email: data.email,
      subject: data.subject || 'No Subject',
      messageLength: data.message?.length,
      emailUser: process.env.EMAIL_USER?.substring(0, 5) + "..." // Log partial email for debugging
    });

    // Create a transporter with detailed error logging
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD
      },
      debug: true, // Enable debug logs
      logger: true // Log to console
    });

    // Verify the transporter configuration
    try {
      await transporter.verify();
      console.log("Transporter verification successful");
    } catch (verifyError) {
      console.error("Transporter verification failed:", verifyError);
      return NextResponse.json(
        { success: false, error: "Email service configuration invalid" },
        { status: 500 }
      );
    }

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'nifelix97@gmail.com',
      subject: `Portfolio Contact: ${data.subject || 'New Message'}`,
      replyTo: data.email,
      text: `
        Name: ${data.name}
        Email: ${data.email}
        
        Message:
        ${data.message}
      `,
      html: `
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Message:</strong></p>
        <p>${data.message.replace(/\n/g, '<br>')}</p>
      `
    };

    // Send email with enhanced error handling
    try {
      const info = await transporter.sendMail(mailOptions);
      console.log("Email sent successfully:", info.messageId);
      return NextResponse.json({ 
        success: true,
        messageId: info.messageId
      });
    } catch (sendError) {
      console.error("Error in sendMail:", sendError);
      return NextResponse.json(
        { success: false, error: "Failed to send email" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("API Error (general):", error);
    return NextResponse.json(
      { success: false, error: "Failed to process email request" },
      { status: 500 }
    );
  }
}