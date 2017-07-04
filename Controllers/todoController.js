var bodyParser=require('body-parser');
var mongoose=require('mongoose');

//Connect to the database
mongoose.connect('mongodb://test:test@ds149132.mlab.com:49132/todo');

//Create schema - a blue print for our data
var todoSchema=new mongoose.Schema({
  item:String
});

var Todo=mongoose.model('Todo', todoSchema);

var item1=Todo({item:'test DB Item'}).save(function(err){
  if(err) {
    console.log('ERROR MAY DAY MAY DAY!!');
    throw err;
  }
  console.log('item saved!');
});


var data=[
  {
    item:'get milk'
  },
  {
    item:'walk dog'
  },
  {
    item:'get busy living or get busy dying'
  }
];
var urlencodedParser = bodyParser.urlencoded({ extended: false });


module.exports=function(app){

  app.get('/todo', function(req, res){
    res.render('todo', {todos:data});
  });

  app.post('/todo', urlencodedParser, function(req, res){
    console.log("Entered post request");
    data.push(req.body);
    res.json(data);
  });

  app.delete('/todo/:item', function(req, res){
    data=data.filter(function(todo){
    return todo.item.replace(/ /g, '-') !== req.params.item;
  });
  res.json(data);
});
};
