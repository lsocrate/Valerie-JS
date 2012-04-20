require('./components/extend-js');
var express = require('express'),
    routes = require('./routes'),
    CharacterProvider = require('./character-provider-memory').CharacterProvider,
    Character = require('./models/character').Character,
    clans = require('./models/clan').clans,
    vices = require('./models/vice').vices,
    virtues = require('./models/virtue').virtues,
    config = require('./config').config;

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({ secret: config.session.secret }));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

characterProvider = new CharacterProvider();


// Routes
// app.get('/', routes.index);
app.get('/', function(req, res){
  characterProvider.findAll(function(error,docs){
    res.render('index.jade', {locals:{
      title: "Character",
      characters: docs
    }});
  });
});
app.get('/character/new', function(req, res){
  res.render('character_new.jade', {locals:{
    title: "new Character",
    clans: clans,
    vices: vices,
    virtues: virtues
  }});
});
app.post('/character/new', function(req, res){
  var data = req.param('character'),
      character = new Character(data);

  console.log('char', character);


  // characterProvider.save({
  //   name:req.param('name'),
  //   clan:req.param('clan')
  // },function(error, docs){
  //   res.redirect('/');
  // });
});

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);