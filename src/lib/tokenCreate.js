// import jwt from 'jsonwebtoken';

// const tokenCreate = (userId, email) => {
//   const payload = {
//     userId,
//     email,
//   };

//   const secretKey = process.env.JWT_SECRET_KEY;
//   const options = {
//     expiresIn: '1h',
//   };
//   const token = jwt.sign(payload, secretKey, options);

//   return token;
// };

// export default tokenCreate;

import jwt from "jsonwebtoken";

const createToken = (payload, expiresIn = "1h") => {
  const secretKey = process.env.JWT_SECRET_KEY;

  if (!secretKey) {
    throw new Error("JWT_SECRET_KEY tidak ditemukan dalam environment variable.");
  }

  try {
    // Membuat token dengan payload dan waktu kadaluwarsa
    const token = jwt.sign(payload, secretKey, { expiresIn });
    return token;
  } catch (error) {
    console.error("Gagal membuat token:", error);
    throw new Error("Token creation failed");
  }
};

export default createToken;
