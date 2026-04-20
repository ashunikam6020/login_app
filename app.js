require("dotenv").config({ path: "./config/.env" });

const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const farmerRoutes = require("./routes/farmerRoutes");
const milkRoutes = require("./routes/milkRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// ✅ API PREFIX
app.use("/api/v1", authRoutes);
app.use("/api/v1", farmerRoutes);
app.use("/api/v1", milkRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});