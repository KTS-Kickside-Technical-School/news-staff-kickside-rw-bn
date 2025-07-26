"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config/config");
const articles_1 = __importDefault(require("./articles"));
const users_1 = __importDefault(require("./users"));
(0, config_1.connect)().then(async () => {
    await (0, users_1.default)();
    await (0, articles_1.default)();
    process.exit();
});
//# sourceMappingURL=index.js.map