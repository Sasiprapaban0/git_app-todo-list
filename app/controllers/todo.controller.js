var Todo = require('mongoose').model('Todo');

//===== View all items in the list =====//
exports.list = function(req, res, next){
    // console.log('getting all items');
    Todo.find({})
        .exec(function(err, results){
            if(err){
                return next(err);
            }else{
                //console.log(results);
                let todos = results.filter(function(todo){
                    return !todo.done;
                });
                let doneTodos = results.filter(function(todo){
                    return todo.done;
                });
                res.render('add_todos', {
                    todos:todos || [],
                    doneTodos:doneTodos
                });
            }
        });
};
//=====Add a task to the list==========//
exports.create = function(req, res, next) {
    let NewTodo = new Todo(req.body);
    NewTodo
    .save()
    .then(function(todo){
        console.log(result);
        res.redirect('/todos');
    })
    .catch(function(err){
        console.log(err);
        res.redirect('/todos');
    });
};
//===== View single task in the list===//
exports.read = function(req, res){
    console.log('render reading mode task %s with id=%s completed.', req.todos.description , req.todos._id);
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
            // console.log('getting single task');
            req.todos =  todo;
            next();
        }
    });
};
//===== Load  Edit Exitting Task Form ==================//
exports.renderEditMode = function(req, res, next){
    // console.log('render edit mode task %s with id=%s completed.', req.todos.description , req.todos._id);
        res.render('edit_todo',{
            title: 'Edit existing task',
            todos: req.todos
        });
};

exports.update = function(req, res, next) {
    Todo.findOneAndUpdate({_id: req.todos.id}, req.body,function(err){
       if(err){
           return next(err);    
       }
       else {
           res.redirect('/todos');
       }
   });
};
//========Set the task status=====================//
exports.completed = function(req, res){
    console.log("set status :   " + req.todos.id);
    let todoId = req.todos.id;
    Todo.findById(todoId)
    .exec()
    .then(function(todo){
        todo.done = !todo.done;
        return todo.save();
    })
    .then(function(result){
        res.redirect('/todos');
    });
};
//delete a task from the list
exports.delete = function(req, res, next){
    // console.log('accept Model Delete');
    req.todos.remove(function(err){
        if(err){
            return next(err);
        }else {
            // console.info('Deleted task %s with id=%s completed.', req.todos.description , req.todos._id);
            res.send(200);
            //res.json(req.todos);
        }
    });
};
