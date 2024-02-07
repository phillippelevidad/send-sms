require("dotenv").config();
const express = require("express");
const setupBullBoard = require("./components/setupBullBoard");
const routes = require("./routes/index");

const app = express();

setupBullBoard(app);

app.use(express.json());

app.use("/api", routes);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
