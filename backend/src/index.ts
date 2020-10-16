import express from 'express';
import cors from 'cors';
import createError from 'http-errors';
import http from 'http';

const user = require('./routes/userRouter')

const app = express();
app.use(cors());

app.use('/user', user);

app.use((_req, _res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, _next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const port = process.env.PORT || '9000';

app.set('port', port);

const server = http.createServer(app);

server.listen(port);
