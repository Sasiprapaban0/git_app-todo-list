var Todo = require('mongoose').model('Todo');
//add a task to the list
exports.create = function(req, res, next) {
     let NewTodo = new Todo(req.body);

    NewTodo.save(function(err,todo){
        if(err){
            return next(err);    
        }else {
            console.log("Added %s with id=%s "+ todo.description,todo._id);
            // res.json(todo);
            res.redirect('/todos');
        }
    });
};
//view all items in the list
exports.list = function(req, res, next){
    console.log('getting all items');
    Todo.find({})
        .exec(function(err, results){
            if(err){
                return next(err);
            }else{
                //console.log(results);
                res.render('index', {
                    //todos: results || []
                    todos:results || []
                });
            }
        });
};
// view single task in the list
exports.read = function(req, res){
    console.log('view single task in the list');
    //res.json(req.todos);
    res.render('todo',{
        todoView:req.todos        
    });

};
exports.todoByDescription = function(req, res, next, id ){
    Todo.findOne({
        _id: id
    }, function(err, todo) {
        if(err){
            return next(err);
        } else{
            console.log('getting single task');
            req.todos =  todo;
            next();
        }
    });
};
//edit exitting task
exports.update = function(req, res, next) {
    Todo.findOneAndUpdate({_id: req.todos.id}, req.body,
    function(err, todo){
        if(err){
            return next(err);
        }else {
            console.log('update single task');
            res.json(todo);
        }
    });
};
//set the task status
exports.completed = function(req, res){
    console.log("set status :   " + req.todos.id);
    let todoId = req.todos.id;
    Todo.findById(todoId)
    .exec()
    .then(function(result){
        result.done = !result.done;
        return result.save();
    })
    .then(function(result){
        res.redirect('/');
    });
};
//delete a task from the list
exports.delete = function(req, res, next){
    console.log('accept Model Delete');
    req.todos.remove(function(err){
        if(err){
            return next(err);
        }else {
            console.info('Deleted task %s with id=%s completed.', req.todos.description , req.todos._id);
            res.send(200);
            //res.json(req.todos);
        }
    });
};
