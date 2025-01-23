import mongoose from "mongoose";

const emailVerifiedSchema = new mongoose.Schema(
  {
    idUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    verificationToken: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true } // Menambahkan createdAt dan updatedAt secara otomatis
);

// Nama model: EmailVerified
const EmailVerified =
  mongoose.models.EmailVerified ||
  mongoose.model("EmailVerified", emailVerifiedSchema);

export default EmailVerified;
