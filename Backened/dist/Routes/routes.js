"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const user_1 = require("../Controller/user");
router.post('/createUser', user_1.createUser);
router.post('/login', user_1.login);
router.get('/', (req, res) => {
    res.json('thish hdiuhdi db my route ashis pancjal');
});
exports.default = router;
//# sourceMappingURL=routes.js.map