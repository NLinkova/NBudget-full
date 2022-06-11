const path = require("path");
const express = require("express");
const dotenv = require("dotenv"); // to create global variables
const colors = require("colors"); //to color
const morgan = require("morgan");
const connectDB = require("./config/db"); //connection to database
const rateLimit = require("express-rate-limit");
const slowDown = require("express-slow-down");
const bodyParser = require("body-parser");
const { errors } = require("celebrate");
const session = require("express-session");
const helmet = require("helmet");
const cors = require("cors");
const ipfilter = require("express-ipfilter").IpFilter;

const { errorHandler } = require("./middleware/errorMiddleware");
const Log = require("./models/logModel.js");

const port = process.env.PORT || 5000;
dotenv.config({ path: "./config.env" });

//connection to the database
connectDB();

const app = express();

// CORS middleware
const CORS_CONFIG = {
  credentials: true,
  origin: [
    "https://nbudget-money-app.herokuapp.com",
    "http://nbudget-money-app.herokuapp.com",
    "https://nbudget-money-app.herokuapp.com/",
    "http://nbudget-money-app.herokuapp.com/",
    "https://nbudget-money-app.herokuapp.com/admin",
    "http://nbudget-money-app.herokuapp.com/admin",
    "http://localhost:5000/api/users/all",
    "http://localhost:3000",
    "http://localhost:5000",
    "http://localhost:3000/",
    "http://localhost:5000/",
  ],
};

app.options("*", cors(CORS_CONFIG));
app.use(cors(CORS_CONFIG));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

//session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    name: "session_id",
    resave: false,
    saveUninitialized: true,
    cookie: { httpOnly: false, sameSite: "none", secure: true, maxAge: 5000 },
  })
);

// setting various HTTP headers
// This disables the `contentSecurityPolicy` middleware but keeps the rest.
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

app.use(helmet({ crossOriginResourcePolicy: { policy: "same-origin" } }));

//rate limiting
// Here the limiter is set to 1440 * 60 * 1000 to equal 1 day or 24 hours
// then the max is set to 1000 requests over the 24 hours
const apiLimiter = rateLimit({
  windowMs: 1440 * 60 * 1000, // 24 hours
  max: 1000, // limit of number of requests per IP
  delayMs: 1000, // delays each request to one each per second (1000 milliseconds)
  message: "You have reached your limit of requests",
});

//slow down
// Here the rate limiter is set 10ms * 100ms to equal 1000ms or 1 second
// then max is set to 1 request per 1 second
const slowDowner = slowDown({
  windowMs: 1000, //1 second
  delayAfter: 1, //1 request per second, after that
  delayMs: 1000, // begin adding 1000ms of delay per request above 100:
  message: "One request allowed per second!",
});

// Apply the rate limiting middleware to API calls only
app.use("/api", slowDowner);
app.use("/api", apiLimiter);

//logging feature
// Here if a user is logged in the middleware will use to either log the
// users actions and if not logged in some actions are logged
// This will check for a pre existing session
app.use((req, res, next) => {
  let user = req.session.user;
  try {
    if (user) {
      let log = new Log({
        ip: req.ip,
        user: user,
        email: user.email,
        usertype: user.usertype,
        action: req.method,
        endpoint: req.path,
      });
      console.log(log);
      log.save();
      next();
    } else {
      let log = new Log({
        ip: req.ip,
        user: "anonymous",
        email: "email does not exist in database yet",
        usertype: "user unauthorised",
        action: req.method,
        endpoint: req.path,
      });
      console.log(log);
      log.save();
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401);
    throw new Error("Not inserted");
  }
});

// Allow the following IPs
const ips = [
  ["::1", "::ffff:127.0.0.1", "127.0.0.1", "172.20.10.3", "192.168.56.1"],
];

// Here is where the server checks all the controllers and sends the request to the
// correct controller, model and then to the database
app.use("/api/transactions", require("./routes/transactionRoutes"));
app.use("/api/goals", require("./routes/goalRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

//defining admin IP address
app.get("/api/users/all", ipfilter(ips, { mode: "allow" }));
app.post("/api/users/adduser", ipfilter(ips, { mode: "allow" }));

//IP whitelist error handler
if (app.get("env") === "development") {
  app.use((err, req, res, _next) => {
    console.log("Error handler", err);
    if (err instanceof IpDeniedError) {
      res.status(401);
    } else {
      res.status(err.status || 500);
    }
    res.render("error", {
      message: "You shall not pass",
      error: err,
    });
  });
}

if (app.get("env") === "development") {
  app.use((err, req, res, _next) => {
    console.log("Error handler", err);
    if (err instanceof IpDeniedError) {
      res.status(401);
    } else {
      res.status(err.status || 500);
    }
    res.render("error", {
      message: "You shall not pass",
      error: err,
    });
  });
}

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

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500 ? "Server error" : message,
  });
  next();
});

// error celebrate handler
app.use(errors());

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
