import createError from "http-errors";
import express, { Request, Response, NextFunction } from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import path from "path";
// import session from "express-session";
// import flash from "connect-flash";

import indexRouter from "./routes";

const App = express();

// view engine setup
App.set("views", path.join(__dirname, "client/views"));
App.set("view engine", "ejs");
App.set("port", process.env.PORT);

App.use(logger("dev"));
App.use(express.static(path.join(__dirname, "client/public")));
App.use(express.json());
App.use(express.urlencoded({ extended: true }));
App.use(cookieParser(process.env.COOKIE_SECRET));

App.use("/", indexRouter);
// catch 404 and forward to error handler
App.use(function (req: any, res: any, next: any) {
  next(createError(404));
});

// error handler
App.use(function (err: any, req: Request, res: Response, next: NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  // res.render("error");
  res.send("error");
});

export default App;
