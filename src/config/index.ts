import dotenv from "dotenv";

dotenv.config();

export default {
  MONGO_ATLAS_URL:
    process.env.MONGO_ATLAS_URL || "mongodb://localhost/CoderHouse",
  SECRET: process.env.SECRET || "none",
  CRYPTO_SECRET: process.env.CRYPTO_SECRET || "random",
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY || "secret",
  TOKEN_KEEP_ALIVE: process.env.TOKEN_KEEP_ALIVE || "10m",
  PORT: process.env.PORT || "8080",
  GMAIL_ADDRESS: process.env.GMAIL_ADDRESS || "none",
  GMAIL_PASSWORD: process.env.GMAIL_NEWPASS || "none",
  GMAIL_NAME: process.env.GMAIL_NAME || "none",
  TWILIO_ID: process.env.TWILIO_ID,
  TWILIO_TOKEN: process.env.TWILIO_TOKEN,
  TWILIO_CELLPHONE: process.env.TWILIO_CELLPHONE,
};
