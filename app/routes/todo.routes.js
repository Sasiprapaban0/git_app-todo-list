module.exports = function(app) {
    var todo = require('../controllers/todo.controller');
    //==== Get all task list and add a task to the list 
    app.route('/todos')
        .get(todo.list)
        .post(todo.create);
    //==== Get single task by id ===========//
    app.route('/todos/:id')
        .get(todo.read)
        .post(todo.completed)
        .delete(todo.delete);
    app.param('id', todo.todoByDescription);
    //==========  Edit Mode ===============//
    app.route('/todos/edit/:id')
        .get(todo.renderEditMode)
        .post(todo.update);
    // //========= Routes Check Status =========//
    // app.route('/todos/:id/completed')
    //     .put(todo.completed);
};