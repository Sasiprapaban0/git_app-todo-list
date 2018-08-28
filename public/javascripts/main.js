$(document).ready(function(){
  $('.delete-article').on('click', function(e){
    $target = $(e.target);
    console.log($target.attr('data-id'));
    const id = $target.attr('data-id');
    $.ajax({
      type:'DELETE',
      url: '/todos/'+id,
      success: function(response){
        alert('Do you want delete task');
        window.location.href='/todos';
      },
      error: function(err){
        console.log(err);
      }
    });
  });
});
