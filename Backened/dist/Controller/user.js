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
exports.login = exports.createUser = void 0;
const userSchema_1 = __importDefault(require("../Module/userSchema"));
const Mail_1 = require("../mail/Mail");
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        if (!name) {
            res.status(400).json({ msg: "Name is required" });
        }
        if (!email) {
            res.status(400).json({ msg: "Email is required" });
        }
        if (!password) {
            res.status(400).json({ msg: "Password is required" });
        }
        const existingUser = yield userSchema_1.default.findOne({ email });
        if (existingUser) {
            res.status(400).json({ msg: "Email already exists" });
        }
        const RandomOtp = Math.floor(100000 + Math.random() * 900000).toString();
        (0, Mail_1.sendMail)(name, email, RandomOtp);
        const bycrptpassword = yield bcrypt_1.default.hash(password, 10);
        const newUser = new userSchema_1.default({
            name,
            email,
            password: bycrptpassword,
            Otp: RandomOtp,
        });
        yield newUser.save();
        res.status(201).json({ msg: "User created successfully", user: newUser });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Error creating user", error });
    }
});
exports.createUser = createUser;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ msg: "Email and password are required" });
            return;
        }
        const user = yield userSchema_1.default.findOne({ email });
        console.log(user);
        if (!user) {
            res.status(401).json({ msg: "Invalid email " });
            return;
        }
        const isMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!isMatch) {
            res.status(401).json({ msg: "Invalid  password" });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ userId: user._id }, process.env.token || 'defeault token', { expiresIn: "12h" });
        const data = {
            _id: user._id,
            name: user.name,
            email: user.email,
        };
        res.status(200).json({ msg: "Login successful", data, token });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server error during login', error });
    }
});
exports.login = login;
//# sourceMappingURL=user.js.map