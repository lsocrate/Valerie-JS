var express = require('express'),
  routes = require('./routes'),
  CharacterProvider = require('./character-provider-memory').CharacterProvider;

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'your secret here' }));
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
    }});a
  });
});
app.get('/character/new', function(req, res){
  res.render('character_new.jade', {locals:{
    title: "new Character"
  }});
});
app.post('/character/new', function(req, res){
  characterProvider.save({
    name:req.param('name'),
    clan:req.param('clan')
  },function(error, docs){
    res.redirect('/');
  });
});

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);