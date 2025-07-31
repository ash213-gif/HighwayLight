"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const mongoose_1 = __importDefault(require("mongoose"));
const routes_1 = __importDefault(require("./Routes/routes"));
const app = (0, express_1.default)();
const PORT = Number(process.env.PORT) || 3030;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
mongoose_1.default.connect(process.env.MongoURl || '')
    .then(() => { console.log(); console.log('Connected to MongoDB'); })
    .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
});
app.use('/', routes_1.default);
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
//# sourceMappingURL=Index.js.map