import nodemailer from "nodemailer";
export declare const transporter: nodemailer.Transporter<import("nodemailer/lib/smtp-transport").SentMessageInfo, import("nodemailer/lib/smtp-transport").Options>;
export declare const sendMail: (name: string, email: string, RandomOtp: string) => Promise<void>;
//# sourceMappingURL=Mail.d.ts.map