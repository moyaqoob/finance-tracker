import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { sql } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";
import router from "./routes/transactionRoutes.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use(rateLimiter)

async function initDb() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS transactions(
        id SERIAL PRIMARY KEY,
        user_id VARCHAR(255) NOT NULL,
        title VARCHAR(255) NOT NULL,
        amount DECIMAL(10,2) NOT NULL,
        category VARCHAR(255) NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `;
    console.log("Database initialized locally");
  } catch (error) {
    console.error("Error initializing DB:", error);
    process.exit(1);
  }
}

app.use("/api/transactions",router)

app.get("/", (_req, res) => {
  res.send({ message: "Localhost running" });
});

initDb().then(() => {
  app.listen(4000, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
