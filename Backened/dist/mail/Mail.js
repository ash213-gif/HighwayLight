"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMail = exports.transporter = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.transporter = nodemailer_1.default.createTransport({
    service: "gmail",
    port: 465,
    secure: true,
    auth: {
        user: process.env.user,
        pass: process.env.pass
    },
});
const sendMail = (name, email, RandomOtp) => __awaiter(void 0, void 0, void 0, function* () {
    const info = yield exports.transporter.sendMail({
        from: "maddison53@ethereal.email",
        to: email,
        subject: "Hello ✔",
        text: "Hello world?",
        html: `<b>hamrara pasword  hmarei taaf se ${name},  ${RandomOtp}</b>`,
    });
    console.log("Message sent:", info.messageId);
});
exports.sendMail = sendMail;
//# sourceMappingURL=Mail.js.map