const fs = require('fs');
const path = require('path');
const express = require('express');
const exphbs  = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.Promise = global.Promise;

const modelsPath = path.join(__dirname, 'Models');
fs.readdirSync(modelsPath)
  .filter(file => ~file.search(/^[^.].*\.js$/))
  .forEach(file => require(path.join(modelsPath, file)));

const app = express();
app.use(bodyParser());
app.get('/', async function(req, res, next) {
    const Item = mongoose.model('Item');
    return next(new Error(`J'ai une erreur`));
    const items = await Item.find();
    res.render('index.hbs', { items })
});

app.get('/add', function(req, res) {
  res.render('add.hbs');
});

app.post('/add', function(req, res) {
  const Item = mongoose.model('Item');
  const item = new Item(req.body);
  item.save();
  res.redirect('/');
});

app.use(function(err, req, res, next) {
  res.render('error.hbs');
});

app.engine('hbs', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


function connectMongoose() {
  return mongoose.connect('mongodb://localhost/supinfo', {}).connection
}

const connection = connectMongoose()
  .on('error', console.error)
  .on('disconnected', connectMongoose)
  .once('open', function() {
    app.listen(3000);
  });