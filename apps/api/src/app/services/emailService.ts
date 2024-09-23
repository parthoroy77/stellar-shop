import { EmailService } from "@repo/email-service";
import config from "../config";

const emailService = new EmailService({
  host: config.nodemailer_host as string,
  auth: {
    user: config.nodemailer_user as string,
    pass: config.nodemailer_password as string,
  },
  appName: "Stellar Shop",
  address: config.nodemailer_user as string,
});

export default emailService;
