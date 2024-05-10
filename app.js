import express from "express";
const app = express();
import adminRoute from "./resources/user/routes/admin.Routes.js";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Welcome to The Medical App ");
});

app.use('/api/v1/admin', adminRoute)

export default app;
