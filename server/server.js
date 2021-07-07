const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();

const sessionMiddleware = require("./modules/session-middleware");
const passport = require("./strategies/user.strategy");

// Route includes
const coinPageNotesRouter = require("./routes/coin.page.notes.router");
const coinPageRouter = require("./routes/coin.page.router");
const createProfileRouter = require("./routes/create.profile.router");
const marketChartData = require('./routes/market.chart.data.router')
const myStashRouter = require("./routes/myStash.page.router");
const userRouter = require("./routes/user.router");
// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use("/api/coinNotes", coinPageNotesRouter);
app.use("/api/CoinPage", coinPageRouter);
app.use("/api/CreateProfile", createProfileRouter);
app.use("/api/marketChart", marketChartData)
app.use("/api/myStash", myStashRouter);
app.use("/api/user", userRouter);

// Serve static files
app.use(express.static("build"));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
