import express, { Request, Response, NextFunction } from "express"; // Import Express package
import dotenv from "dotenv"; // Import dotenv package
import productRouter from "./routes/products.routes";
import { auth } from "./middleware/auth.middleware";
dotenv.config(); // Read .env file

// Create server
const app = express();

// Middleware
app.use(express.json());
app.use(auth);

// Routes
app.use("/products", productRouter);

// Fallback
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).send("Invalid route");
});

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
