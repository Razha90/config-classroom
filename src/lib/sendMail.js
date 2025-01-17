import nodemailer from "nodemailer";

export default async function sendMail({ to, subject, text, html }) {
  // Konfigurasi transporter menggunakan Gmail
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER, // Email Gmail Anda
      pass: process.env.GMAIL_PASS, // Password atau App Password Gmail Anda
    },
  });

  try {
    // Kirim email
    const info = await transporter.sendMail({
      from: process.env.GMAIL_USER, // Pengirim
      to, // Penerima
      subject, // Subjek
      text, // Isi email
      html
    });

    console.log("Email sent: " + info.response);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    return error;
  }
}
