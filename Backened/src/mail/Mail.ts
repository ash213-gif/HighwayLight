import nodemailer from "nodemailer"
import dotenv from "dotenv";
dotenv.config();

// Create a test account or replace with real credentials.
 export const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 465,
  secure: true , // true for 465, false for other ports
  auth: {
    user: process.env.user,
    pass: process.env.pass 
  },
});

// Wrap in an async IIFE so we can use await.
  export const sendMail = async ( name:string  ,email:string  ,RandomOtp:string ) => {
  const info = await transporter.sendMail({
    from: "maddison53@ethereal.email",
    to: email,
    subject: "Hello ✔",
    text: "Hello world?", // plain‑text body
    html: `<b>hamrara pasword  hmarei taaf se ${name},  ${RandomOtp}</b>`, // HTML body
  });

  console.log("Message sent:", info.messageId);
};