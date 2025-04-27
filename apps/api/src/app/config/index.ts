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
  nodemailer_port: process.env.NODEMAILER_PORT as string,

  // domains
  api_domain_url: process.env.API_DOMAIN_URL as string,
  buyer_origin_url: process.env.BUYER_ORIGIN_URL as string,
  admin_origin_url: process.env.ADMIN_ORIGIN_URL as string,
  seller_origin_url: process.env.SELLER_ORIGIN_URL as string,

  // cloudinary
  cloudinary_cloud_name: process.env.CLOUDINARY_CLOUD_NAME as string,
  cloudinary_api_key: process.env.CLOUDINARY_API_KEY as string,
  cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET as string,

  // redis
  redis_host: process.env.REDIS_HOST as string,
  redis_port: process.env.REDIS_PORT as string,
  redis_password: process.env.REDIS_PASSWORD as string,
  use_redis: (process.env.USE_REDIS === "true") as boolean,

  // stripe
  stripe_api_secret: process.env.STRIPE_API_SECRET as string,
};
