import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

export default {
  NODE_ENV: process.env.NODE_ENV as string,
  port: process.env.PORT as string,

  // Options
  salt_rounds: process.env.SALT_ROUNDS as string,
  default_page_number: process.env.DEFAULT_PAGE_NUMBER as string,
  default_page_limit: process.env.DEFAULT_PAGE_LIMIT as string,

  // jwt configuration
  jwt_access_secret: process.env.JWT_ACCESS_SECRET as string,
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET as string,
  jwt_access_token_expires_in: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN as string,
  jwt_refresh_token_expires_in: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN as string,

  // nodemailer
  nodemailer_host: process.env.NODEMAILER_HOST as string,
  nodemailer_user: process.env.NODEMAILER_USER as string,
  nodemailer_password: process.env.NODEMAILER_PASS as string,

  // domains
  client_url: process.env.CLIENT_URL as string,
  domain_url: process.env.DOMAIN_URL as string,
  origin_url_1: process.env.ORIGIN_URL_1 as string,
  origin_url_2: process.env.ORIGIN_URL_2 as string,
  origin_url_3: process.env.ORIGIN_URL_3 as string,

  // cloudinary
  cloudinary_cloud_name: process.env.CLOUDINARY_CLOUD_NAME as string,
  cloudinary_api_key: process.env.CLOUDINARY_API_KEY as string,
  cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET as string,

  // redis
  redis_host: process.env.REDIS_HOST as string,
  redis_port: process.env.REDIS_PORT as string,
  redis_password: process.env.REDIS_PASSWORD as string,
  use_redis: (process.env.USE_REDIS === "true") as boolean,
};
