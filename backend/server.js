const path = require("path");
const express = require("express");
const dotenv = require("dotenv"); // to create global variables
const colors = require("colors"); //to color
const morgan = require("morgan");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db"); //connection to database
const rateLimit = require("express-rate-limit");
const slowDown = require("express-slow-down");
const { errors } = require("celebrate");
const asyncHandler = require("express-async-handler");
const helmet = require("helmet");
const cors = require("cors");

const { errorHandler } = require("./middleware/errorMiddleware");
const Log = require("./models/logModel.js");

const port = process.env.PORT || 5000;
dotenv.config({ path: "./config.env" });

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//cors
app.use(cors());

//session middleware
// app.use(
//   session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: false },
//   })
// );

// const sess = {
//   secret: process.env.SESSION_SECRET,
//   name: "session_id",
//   resave: false,
//   saveUninitialized: true,
//   cookie: { secure: false, maxAge: 5000 },
// };

// if (process.env.NODE_ENV === "production") {
//   app.set("trust proxy", 1); // trust first proxy
//   sess.cookie.secure = true; // serve secure cookies
// }

// app.use(session(sess));

// // User access control middleware
// app.use((request, response, next) => {
//   //define routes for different roles
//   const routes = {
//     unathorised: ["/api/users/register", "/api/users/login"],
//     user: [
//       "/api/users",
//       "/api/users/:id",
//       "/api/users/me",
//       "/api/users/",
//       "/api/goals/",
//       "/api/goals",
//       "/api/goals/:id",
//       "/api/transactions",
//       "/api/transactions/",
//       "/api/transactions/:id",
//     ],
//     admin: [
//       "/api/users/all",
//       "/api/users/:id",
//       "/api/users/register",
//       "/api/users/login",
//       "/api/users/register",
//       "/api/users",
//       "/api/users/",
//       "/api/users/adduser",
//       "/api/users/adduser/",
//       "/api/goals/",
//       "/api/goals",
//       "/api/goals/:id",
//       "/api/transactions",
//       "/api/transactions/",
//       "/api/transactions/:id",
//     ],
//   };
//   let user_type = "unathorised";
//   if (request.session.user.usertype != null) {
//     user_type = request.session.user.usertype;
//   }
//   if (user_type in routes) {
//     const allowed_routes = routes[user_type];
//     if (allowed_routes.some((url) => request.originalUrl.startsWith(url))) {
//       next();
//     } else {
//       response.status(403).json("access forbidden");
//     }
//   } else {
//     response.status(401).json("client not authorised");
//   }
// });

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
        usertype: usertype,
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

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Apply the rate limiting middleware to API calls only
app.use("/api", apiLimiter);
app.use("/api", slowDowner);
app.use("/api/transactions", require("./routes/transactionRoutes"));
app.use("/api/goals", require("./routes/goalRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

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

app.listen(port, () => console.log(`Server started on port ${port}`));
