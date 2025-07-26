"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_json_1 = __importDefault(require("./swagger.json"));
const config_1 = require("./database/config/config");
const routes_1 = __importDefault(require("./routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_json_1.default));
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json({ limit: '10mb' }));
app.use(express_1.default.urlencoded({ limit: '10mb', extended: true }));
app.use('/api', routes_1.default);
const port = Number(process.env.PORT) || 3000;
const startServer = async () => {
    try {
        await (0, config_1.connect)();
        app.listen(port, () => {
            console.log(`App listening on port ${port}`);
            console.log(`Swagger docs available at http://localhost:${port}/api-docs`);
        });
    }
    catch (error) {
        console.error('Failed to start the server:', error);
        process.exit(1);
    }
};
startServer();
//# sourceMappingURL=index.js.map