require("express-async-errors");
require("dotenv/config");

const express = require("express");
const routes = require("./routes");
const AppError = require("./utils/AppError");
const migrationsRun = require("./database/sqlite/migrations");
const uploadConfig = require("./configs/upload");
const cors = require("cors");

const PORT = process.env.SERVER_PORT || 3333;

const app = express();
app.use(cors());
app.use(express.json());

app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER));

app.use(routes);

migrationsRun();

app.use((error, request, response, next) => {
  if(error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message
    });
  }
  return response.status(500).json({
    status: "error",
    message: "Internal server error"
  })
})

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));