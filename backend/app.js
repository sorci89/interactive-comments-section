const express = require("express");
// require("express-async-errors");
const cors = require("cors");

// const auth = require("./middleware/auth");
// const errorHandler = require("./middleware/errorHandler");
// const morgan = require("morgan"); // logger middleware library

// const dashboardRoutes = require("./routes/dashboard");
// const userRoutes = require("./routes/users");
const userRoutes = require("./routes/users");
const commentRoutes = require("./routes/comments");

const app = express();

// const corsOptions = {
//   origin: process.env.APP_URL,
//   optionsSuccessStatus: 200,
// };

app.use(
  cors({
    origin: process.env.APP_URL,
  })
);
// app.use(cors(corsOptions));

// Külön fájlba szervezve vagy itt ilyen formában:
// const errorHandlerMiddleware = (err, req, res, next) => {
//   console.log(err);
//   res.status(500).json("Something went wrong");
// };

// Külön fájlba szervezve vagy itt ilyen formában:
// const myLogger = (req, res, next) => {
//   console.log("logging");
//   next();
// };

// Külön fájlba szervezve vagy itt ilyen formában:
// const myAuthMiddleware = (req, res, next) => {
//   console.log("doing authentication");
//   const userId = 12;
//   res.locals.userId = userId;
//   next();
// };

// const myBusinessLogicMiddleware = (req, res) => {
//   if (!res.locals.userId) return res.sendStatus(401);
//   console.log("business logic running");
//   res.status(200).json("Ok");
// };
// app.use(myBusinessLogicMiddleware);

app.use(express.json());

//app.use(logger); helyette morgan-t használva:
// app.use(
//   morgan(":method :url :status :res[content-length] - :response-time ms")
// );

// app.use(auth); - endpointonknál kell lefuttatni, ha nem akarom, hogy mindenhol lefusson
// app.use("/api/dashboards", dashboardRoutes);
// app.use("/api/user", userRoutes);
app.use("/api/users", userRoutes);
app.use("/api/comments", commentRoutes);
// app.get("/api/public", (req, res) => {
//   console.log("public");
//   res.send("Hello World Public");
// });

// app.get("/api/privat", auth({ block: true }), (req, res) => {
//   console.log("privat");
//   res.send(`Hello World Privat${res.locals.user.userId}`);
// });

// app.get("/api/prublic", auth({ block: false }), (req, res) => {
//   if (!res.locals.user) return res.send("Hello World public");
//   res.send(`Hello World Prublic, your id is: ${res.locals.user.userId}`);
// });

// errorhandler middleware-t utolsóként hivjuk meg
// app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

module.exports = app;
