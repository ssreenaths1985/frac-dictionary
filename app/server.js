// import { config } from "dotenv";
import express from "express";
import logger from "morgan";
import responseTime from "response-time";
import indexRouter from "./routes/index";
import { rebuild } from "./utils/gatsby";
import schema from "./routes/graphql";
import "./config";

// const nodeEnv = process.env.NODE_ENV || `development`;
// config({ path: __dirname + `/configurations/.env.${nodeEnv}` });

const { createLogger, format, transports } = require(`winston`);

const AppLogger = createLogger({
  format: format.combine(format.splat(), format.simple()),
  transports: [new transports.Console()],
});

const app = express();

app.use(logger(`dev`));
app.use(logger(`combined`));
app.use(express.json());
app.use(express.static(`public`));
app.use(express.urlencoded({ extended: false }));
app.use(responseTime());

app.use(`/`, indexRouter);

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Accept-Encoding, Accept-Language, Access-Control-Request-Headers, Access-Control-Request-Method"
  );
  next();
});

// GraphQL layer
schema.applyMiddleware({ app });

app.listen(global.env.APP_GATSBY_NODE_PORT, function () {
  // eslint-disable-next-line max-len
  AppLogger.info(
    `Application Started on Port: ` +
      global.env.APP_GATSBY_NODE_PORT +
      ` Environment: ` +
      global.env.APP_GATSBY_NODE_ENVIRONMENT
  );
  rebuild((err, obj) => {});
});
