import express, { json } from "express";
import { connect } from "mongoose";
import { config } from "dotenv";
import userRoutes from "./routes/UserRoutes";
import authRoutes from "./routes/AuthRoutes";

config();

const app = express();

// Middleware to parse JSON data
app.use(json());

// Auth Routes
app.use("/api/auth", authRoutes);

// User Routes (protected with JWT middleware)
app.use("/api/users", userRoutes);

// Connect to MongoDB
connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Run the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
