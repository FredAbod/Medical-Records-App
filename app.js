import express from "express";
import morgan from "morgan";
const app = express();
import adminRoute from "./resources/user/routes/admin.Routes.js";
import registrarRoute from "./resources/user/routes/registrars.Routes.js";
import pharmacistRoute from "./resources/user/routes/pharmacists.Routes.js";
import nurseRoute from "./resources/user/routes/nurse.Routes.js";
import labTechRoute from "./resources/user/routes/labTech.Routes.js";
import doctorsRoute from "./resources/user/routes/doctors.Routes.js";

app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Welcome to The Medical App ");
});

app.use('/api/v1/admin', adminRoute)
app.use('/api/v1/registrar', registrarRoute)
app.use('/api/v1/pharmacist', pharmacistRoute)
app.use('/api/v1/nurse', nurseRoute)
app.use('/api/v1/labTech', labTechRoute)
app.use('/api/v1/doctors', doctorsRoute)

export default app;
