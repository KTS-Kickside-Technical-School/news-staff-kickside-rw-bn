"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config/config");
const articles_1 = require("./articles");
const users_1 = require("./users");
(0, config_1.connect)().then(async () => {
    try {
        await (0, users_1.unseedUsers)();
        await (0, articles_1.unseedArticles)();
    }
    catch (error) {
        console.error("Error during unseeding:", error);
    }
    finally {
        process.exit();
    }
});
//# sourceMappingURL=unseed.js.map