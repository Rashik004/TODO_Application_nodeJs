var bodyParser=require('body-parser');
var mongoose=require('mongoose');

//Connect to the database
mongoose.connect('mongodb://test:test@ds149132.mlab.com:49132/todo');

//Create schema - a blue print for our data
var todoSchema=new mongoose.Schema({
  item:String
});

var Todo=mongoose.model('Todo', todoSchema);

var urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports=function(app){

  app.get('/todo', function(req, res){
    //get data from mongodb and pass it to the view
    Todo.find({}, function(err,data){
      if(err){
        throw err;
      }
      res.render('todo', {todos:data});
    });
  });

  app.post('/todo', urlencodedParser, function(req, res){
    console.log("Entered post request");
    //get data from the view and add it to mongodb
    var newTodo=Todo(req.body).save(function(err,data){
      if(err){
        throw err;
      }
      res.json(data);
    })
  });

  app.delete('/todo/:item', function(req, res){
    //delete the reqiested item from mongodb
    Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err,data){
      if(err){
        throw err;
      }
      res.json(data);
    });
});
};
