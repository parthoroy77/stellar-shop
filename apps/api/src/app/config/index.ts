import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

export default {
  port: process.env.PORT,
  client_url: process.env.CLIENT_URL,
  NODE_ENV: process.env.NODE_ENV,
  salt_rounds: process.env.SALT_ROUNDS,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
  jwt_access_token_expires_in: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN,
  jwt_refresh_token_expires_in: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN,
  domain_url: process.env.DOMAIN_URL,
  nodemailer_host: process.env.NODEMAILER_HOST,
  nodemailer_user: process.env.NODEMAILER_USER,
  nodemailer_password: process.env.NODEMAILER_PASS,
  origin_url_1: process.env.ORIGIN_URL_1,
  origin_url_2: process.env.ORIGIN_URL_2,
};
