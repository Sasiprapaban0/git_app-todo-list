exports.render = function(req , res) {
    res.render('index', {
        'title': 'app to do',
        'message':'Todo List'
    });
};

 