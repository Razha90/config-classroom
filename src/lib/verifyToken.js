import jwt from "jsonwebtoken";

const tokenVerify = (token) => {
  const secretKey = process.env.JWT_SECRET_KEY;

  try {
    // Verifikasi token
    const verified = jwt.verify(token, secretKey);
    return { isValid: true, data: verified };
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      const decoded = jwt.decode(token);
      return { isValid: false, error: "Token expired", data: decoded };
    }
    if (error.name === "JsonWebTokenError") {
      return { isValid: false, error: "Invalid token", data: null };
    }
    // Error lainnya
    return { isValid: false, error: "Verification failed", data: null };
  }
};

export default tokenVerify;
