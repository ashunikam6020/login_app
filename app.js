require("dotenv").config();
require("dotenv").config({ path: "./config/.env" });

const express = require("express");
const cors = require("cors");
const logger = require("./utils/logger");

const authRoutes = require("./routes/authRoutes");
const farmerRoutes = require("./routes/farmerRoutes");
const milkRoutes = require("./routes/milkRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api", authRoutes);
app.use("/api", farmerRoutes);
app.use("/api", milkRoutes);

app.listen(process.env.PORT, "0.0.0.0", () => {
  logger.info(`Server running on port ${process.env.PORT}`);
});