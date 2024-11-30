import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

export default {
  NODE_ENV: process.env.NODE_ENV,
  port: process.env.PORT,

  // Options
  salt_rounds: process.env.SALT_ROUNDS,
  default_page_number: process.env.DEFAULT_PAGE_NUMBER,
  default_page_limit: process.env.DEFAULT_PAGE_LIMIT,

  // jwt configuration
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
  jwt_access_token_expires_in: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN,
  jwt_refresh_token_expires_in: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN,

  // nodemailer
  nodemailer_host: process.env.NODEMAILER_HOST,
  nodemailer_user: process.env.NODEMAILER_USER,
  nodemailer_password: process.env.NODEMAILER_PASS,

  // domains
  client_url: process.env.CLIENT_URL,
  domain_url: process.env.DOMAIN_URL,
  origin_url_1: process.env.ORIGIN_URL_1,
  origin_url_2: process.env.ORIGIN_URL_2,
  origin_url_3: process.env.ORIGIN_URL_3,

  // cloudinary
  cloudinary_cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
  cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET,
};
