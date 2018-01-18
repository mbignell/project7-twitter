const express = require('express');
// const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser');

const app = express();

// Sets port 8080 instead of localhost 3000 due to conflict on my comp
app.set('port', process.env.PORT || 8080);
app.listen(app.get('port'));
//
// app.use(bodyParser.urlencoded({ extended: false}));
// app.use(cookieParser());

app.set('view engine', 'pug');

app.use(express.static('public'));

// Connects main routes through index.js
const mainRoutes = require('./js');
const cardRoutes = require('./routes/cards');

app.use(mainRoutes);

// If route is not found, render 404
app.use((req,res,next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
})

app.use((err, req, res, next) => {
  res.locals.error = err;
  res.status(err.status);
  res.render('error');
});
