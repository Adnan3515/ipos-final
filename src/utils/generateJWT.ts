import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";

const DEFAULT_SIGN_OPTION: SignOptions = {
  expiresIn: "1h", // This is valid as 'expiresIn' can be a string
};

export function generateAccessToken(
  payload: JwtPayload,
  options: SignOptions = DEFAULT_SIGN_OPTION
) {
  const secret = process.env.SECRET_KEY;

  // Ensure the secret is defined
  if (!secret) {
    throw new Error("SECRET_KEY is not defined in the environment variables.");
  }

  // Use this command to generate SECRET_KEY: openssl rand -base64 32
  const token = jwt.sign(payload, secret, options);
  return token;
}