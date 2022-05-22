const path = require("path");
const express = require("express");
const dotenv = require("dotenv"); // to create global variables
const colors = require("colors"); //to color
const morgan = require("morgan");
const connectDB = require("./config/db"); //connection to database
const rateLimit = require("express-rate-limit");
const slowDown = require("express-slow-down");
const { errors } = require("celebrate");
const asyncHandler = require("express-async-handler");
const helmet = require("helmet");
const ipfilter = require("express-ipfilter").IpFilter;

const { errorHandler } = require("./middleware/errorMiddleware");
const Log = require("./models/logModel.js");

const port = process.env.PORT || 5000;
dotenv.config({ path: "./config.env" });

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//cors
const cors = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const requestHeaders = req.headers["access-control-request-headers"];
  const DEFAULT_ALLOWED_METHODS = "GET,HEAD,PUT,PATCH,POST,DELETE";

  res.header("Access-Control-Allow-Origin", origin);
  res.header("Access-Control-Allow-Credentials", true);

  if (method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", DEFAULT_ALLOWED_METHODS);
    res.header("Access-Control-Allow-Headers", requestHeaders);

    return res.end();
  }
  return next();
};

app.use(cors);

//rate limiting
const apiLimiter = rateLimit({
  windowMs: 1440 * 60 * 1000, // 24 hours
  max: 1000, // limit of number of requests per IP
  delayMs: 1000, // delays each request to one each per second (1000 milliseconds)
});

//slow down
const slowDowner = slowDown({
  windowMs: 1000,
  delayAfter: 1,
  delayMs: 1000,
  message: "One request allowed per second!",
});

// Apply the rate limiting middleware to API calls only
app.use("/api", apiLimiter);
app.use("/api", slowDowner);
app.use("/api/transactions", require("./routes/transactionRoutes"));
app.use("/api/goals", require("./routes/goalRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//logging feature
app.use(
  asyncHandler(async (req, res, next) => {
    // let user = JSON.parse(localStorage.getItem("user"));
    try {
      //if user logedd in
      if (req.user != null) {
        user = req.user.email;
        usertype = req.user.usertype;
      } else {
        user = "anonymous";
        usertype = "user";
      }
      let log = new Log({
        ip: req.ip,
        user: user,
        email: req.body.email,
        usertype: user.usertype,
        action: req.method,
        endpoint: req.path,
      });
      console.log(log);
      log.save();
      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not inserted");
    }
  })
);

//setting various HTTP headers.
// This disables the `contentSecurityPolicy` middleware but keeps the rest.
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

// Serve frontend
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(
      path.resolve(__dirname, "../", "frontend", "build", "index.html")
    )
  );
} else {
  app.get("/", (req, res) => res.send("Please set to production"));
}

// error celebrate handler
app.use(errors());

app.use(errorHandler);

// Allow the following IPs
const ips = ["::1", "127.0.0.1]"];

app.use(ipfilter(ips, { mode: "allow" }));
app.listen(port, () => console.log(`Server started on port ${port}`));
