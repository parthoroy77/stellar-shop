import nodemailer, { SendMailOptions, Transporter } from "nodemailer";
export * from "./template/index";

interface EmailServiceConfig {
  host: string;
  auth: {
    user: string;
    pass: string;
  };
  appName: string;
  address: string;
  port: number;
}

interface EmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  from?:
    | string
    | {
        name: string;
        address: string;
      };
}

export class EmailService {
  private transporter: Transporter;
  private defaultFrom:
    | string
    | {
        name: string;
        address: string;
      };

  constructor(config: EmailServiceConfig) {
    this.transporter = nodemailer.createTransport({
      host: config.host,
      port: config.port,
      auth: {
        user: config.auth.user,
        pass: config.auth.pass,
      },
    });
    this.defaultFrom = "Stellar Shop 🏪 <stellarshop@mail.parthoroy.com>";
  }

  async sendEmail({ to, subject, html, from = this.defaultFrom }: EmailOptions): Promise<nodemailer.SentMessageInfo> {
    console.log({ to, from, subject, html });
    const mailOptions: SendMailOptions = {
      from,
      to,
      subject,
      html,
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log("Email sent successfully To:", mailOptions.to, info.messageId);
      return info;
    } catch (error) {
      console.log(error);
      console.error("Error sending email:", error);
      throw error;
    }
  }

  async sendBulkEmails(emails: EmailOptions[]): Promise<nodemailer.SentMessageInfo[]> {
    try {
      const results = await Promise.all(emails.map((email) => this.sendEmail(email)));
      console.log("Bulk emails sent successfully");
      return results;
    } catch (error) {
      console.error("Error sending bulk emails:", error);
      throw error;
    }
  }

  setDefaultFrom(from: string): void {
    this.defaultFrom = from;
  }

  async verifyConnection(): Promise<boolean> {
    try {
      await this.transporter.verify();
      console.log("SMTP connection verified successfully");
      return true;
    } catch (error) {
      console.error("SMTP connection verification failed:", error);
      return false;
    }
  }
}
