import { SignJWT,jwtVerify } from "jose";

const createTokenAPI = async () => {
  const secret = new TextEncoder().encode(process.env.TOKEN_API);
  const token = await new SignJWT({})
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1h')
    .sign(secret);
  return token;
}

const verifyTokenAPI = async (token) => {
  const secret = new TextEncoder().encode(process.env.TOKEN_API);
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch (error) {
    return null;
  }
}

export { createTokenAPI, verifyTokenAPI };