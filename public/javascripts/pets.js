$(document).ready(function() {
    //Socket initialize Variables
    var socket = io();
    socket.emit('foo', {message: 'bar'});
    socket.on('update dog status', function(data){
        var obj = $('#dog');
        obj.append(data.message);
    });

  // SUBMIT POST FORM
  $('#post-form').submit(function (e) {
    e.preventDefault();
    // var pet = $(this).serialize();
    var pet = new FormData($(this)[0]);
    $.ajax({
      type: 'POST',
      url: '/pets',
      data: pet,
      processData: false,
      contentType: false,
      success: function(data) {
        window.location.href = "/pets/" + data._id
      },
      error: function(err) {
        console.log(err);
      }
    });
  });

});
