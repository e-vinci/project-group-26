const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const corsOptions = {
  origin: ['http://localhost:8080', 'https://e-baron.github.io'],
};

const usersRouter = require('./routes/users');
const authsRouter = require('./routes/auths');
const uploadsRouter = require('./routes/uploads');
const statsRouter = require('./routes/stats');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(cors(corsOptions));

app.use('/users', usersRouter);
app.use(express.static(path.join(__dirname, 'public')));

app.use('/auths', authsRouter);
app.use('/uploads', uploadsRouter);
app.use('/stats', statsRouter);

module.exports = app;
