import express from 'express';
import expressValidation from 'express-validation';
import bodyParser from 'body-parser';
import routes from './server/routes';
import config from './server/config';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', routes);

app.use((req, res, next) => {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  if (err instanceof expressValidation.ValidationError) {
    let accumulatedMessage = err.errors.map((current) => {
      return current.messages[0]
    }).join(", ");

    res.status(err.status)
      .json({
        message: `${err.message} . ${accumulatedMessage}`,
        status: err.status,
        statusText: err.statusText
      });
  } else {

    let status = err.status ? err.status : 500
    res.status(status)
      .json({
        message: err.message,
        status: status,
        statusText: "Internal Error"
      });
  }
});

app.listen(config.port || 300, () => {
  console.log(`Server listening  port ${config.port} (${config.env})`);
});

module.exports = app; 
