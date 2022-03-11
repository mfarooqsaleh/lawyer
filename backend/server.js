import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import path from "path";
  import userRoutes from "./routes/userRoutes.js";
  import postRoutes from "./routes/postRoutes.js";



  import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

const app=express();
dotenv.config();
connectDB();
app.use(express.json());
app.use("/api/users", userRoutes);

app.use("/api/posts", postRoutes);




// --------------------------deployment------------------------------
const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) =>{
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}
// --------------------------deploymen t------------------------------

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3000

app.listen(
  PORT,
  console.log(
    `Server running.. in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
);
