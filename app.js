const express = require('express');
const config = require('./config');
const Twit = require('twit')
const app = express();

// Sets port 8080 instead of localhost 3000 due to conflict on my comp
app.set('port', process.env.PORT || 8080);
app.listen(app.get('port'));

app.set('view engine', 'pug');

const path = require('path')
app.use(express.static(path.join(__dirname, 'assets')));

// Connects main routes through index.js
const mainRoutes = require('./js');

app.use(mainRoutes);
//
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
