"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
var express_1 = __importDefault(require("express"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var cors_1 = __importDefault(require("cors"));
var App = /** @class */ (function () {
    function App() {
        this.app = (0, express_1.default)();
        this.initializeMiddlewares();
        this.initializeRoutes();
    }
    App.prototype.initializeMiddlewares = function () {
        this.app.use(express_1.default.json());
        this.app.use((0, cookie_parser_1.default)());
        this.app.use((0, cors_1.default)({
            origin: process.env.CORS_ORIGIN || '*',
            credentials: true,
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
            allowedHeaders: ['Content-Type', 'Authorization'],
        }));
    };
    App.prototype.initializeRoutes = function () {
    };
    App.prototype.getApp = function () {
        return this.app;
    };
    App.prototype.listen = function (port) {
        this.app.listen(port, function () {
            console.log("Server is running on port ".concat(port));
        });
    };
    return App;
}());
exports.App = App;
//# sourceMappingURL=app.js.map