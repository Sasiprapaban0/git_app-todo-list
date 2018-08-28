module.exports = function(app) {
    var todo = require('../controllers/todo.controller');
    //Get all todo task list
   // app.get('/', todo.list);
    app.route('/todos')
        .get(todo.list)
        .post(todo.create);
    // Get single employee by id
    app.route('/todos/:id')
        .get(todo.read)
        .put(todo.update)
        .delete(todo.delete);
    app.route('/todos/:id/completed')
        .put(todo.completed);
    app.param('id', todo.todoByDescription);
    //========== Edit Mode ===============//
    //app.route('/')
};