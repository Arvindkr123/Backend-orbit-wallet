import express from "express";
import userRoutes from "./routes/user.routes.js"
import transactionsRoutes from "./routes/transactions.routes.js"
const app = express();

app.use(express.json());


app.use("/api/users", userRoutes);
app.use("/api/transactions", transactionsRoutes);

export default app;