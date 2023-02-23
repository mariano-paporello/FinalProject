import Config from '../config'
import nodemailer from 'nodemailer';
import path from 'path';

class Email {
    private transporter;
    private owner;
  
    constructor() {
        this.owner = {
            name: Config.GMAIL_NAME,
            address: Config.GMAIL_ADDRESS,
        };
  
        this.transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            service: 'gmail',
            port: 465,
            secure: true,
            auth: {
                user: Config.GMAIL_ADDRESS,
                pass: Config.GMAIL_PASSWORD,
            },
        })

        this.transporter.verify();
    }
  
    async sendEmail(dest: string, subject: string, content: string) {
      const mailOptions = {
        from: Config.GMAIL_ADDRESS,
        to: dest,
        subject,
        html: content,
      };
  
      const response = await this.transporter.sendMail(mailOptions);
      return response;
    }
  }
  
  export const EmailService = new Email();