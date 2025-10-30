"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express")); // Import Express package
const dotenv_1 = __importDefault(require("dotenv")); // Import dotenv package
const products_routes_1 = __importDefault(require("./routes/products.routes"));
const auth_middleware_1 = require("./middleware/auth.middleware");
dotenv_1.default.config(); // Read .env file
// Create server
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json());
app.use(auth_middleware_1.auth);
// Routes
app.use("/products", products_routes_1.default);
// Fallback
app.use((req, res, next) => {
    res.status(404).send("Invalid route");
});
// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
