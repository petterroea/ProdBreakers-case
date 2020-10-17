import express from 'express';
import cors from 'cors';
import createError from 'http-errors';
import http from 'http';
import bodyParser from 'body-parser';

import { setupDatabaseConnection } from './database';
import { initializeRealtimeComponent } from './realtime';

import userRouter from './routes/userRouter';
import lectureRouter from './routes/lectureRouter';

import { dbConfig } from './config';


const port = process.env.PORT || '9000';

const setupApp = (): express.Application => {
	const app = express();
	app.use(cors());
	app.use(bodyParser());

  app.use('/api/user', userRouter);
	app.use('/api/lecture', lectureRouter);
	
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
	  res.send('Error');
	});

	app.set('port', port);

	return app;
}


setupDatabaseConnection(dbConfig).then(() => {
	const server = http.createServer(setupApp());
	initializeRealtimeComponent(server)

	server.listen(port);

})



