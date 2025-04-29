// API endpoint for handling contact form submissions
// POST /api/contact

export async function POST({ request }) {
  try {
    const formData = await request.formData();
    const name = formData.get('name')?.toString();
    const email = formData.get('email')?.toString();
    const subject = formData.get('subject')?.toString();
    const message = formData.get('message')?.toString();

    // Basic validation (can be expanded)
    if (!name || !email || !subject || !message) {
      return new Response(
        JSON.stringify({ message: 'Missing required fields' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // --- Placeholder for Email Sending Logic ---
    // 1. Choose an email service provider (e.g., SendGrid, Resend, SES).
    // 2. Install the necessary SDK (e.g., npm install @sendgrid/mail).
    // 3. Configure API keys/credentials securely (use environment variables).
    // 4. Implement the email sending function here.
    // Example (pseudo-code):
    // await sendEmail({
    //   to: 'orlamarie@example.com', // Coach's email
    //   from: 'noreply@yourdomain.com', // Verified sender email
    //   replyTo: email, // Set reply-to as the sender's email
    //   subject: `New Contact Form Submission: ${subject}`,
    //   text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    //   html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong></p><p>${message.replace(/\n/g, '<br>')}</p>`,
    // });
    console.log('--- Email Sending Placeholder ---');
    console.log('Received contact form submission:');
    console.log({ name, email, subject, message });
    console.log('Email sending logic needs to be implemented here.');
    // --- End Placeholder ---

    // Return success response
    return new Response(
      JSON.stringify({ message: 'Message sent successfully!' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error processing contact form:', error);
    return new Response(
      JSON.stringify({ message: 'Internal Server Error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

// Optional: Handle GET requests or other methods if needed
export async function GET() {
  return new Response(
    JSON.stringify({ message: 'Method Not Allowed' }),
    { status: 405, headers: { 'Content-Type': 'application/json' } }
  );
}
