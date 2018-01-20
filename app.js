const express = require('express');
const config = require('./config');
const Twit = require('twit')
const t = new Twit(config);
const app = express();

// Sets port 8080 instead of localhost:3000 due to conflict on my comp
app.set('port', process.env.PORT || 8080);
app.listen(app.get('port'));

// Sets pugs as view engine
app.set('view engine', 'pug');

// Sets up static path for images
const path = require('path')
app.use(express.static(path.join(__dirname, 'assets')));

app.use(
  (req, res, next) => {
    t.get('statuses/home_timeline', { count: 5 }, function (err, data, response) {
      req.tweets = data;
      console.log(req.tweets);
    });
    next();
  }
)

app.get('/', function(req, res){
  const { tweets } = req;
  res.render('index', { tweets });
  console.log('ok I got here');
});

// Get followers
// t.get('followers/ids', { screen_name: 'maggled' },  function (err, data, response) {
//   // console.log(data);
// })

// var stream = t.stream('maggled', { stringify_friend_ids: true })
// stream.on('direct_message', function (directMsg) {
//   console.log(directMsg);
// })

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
