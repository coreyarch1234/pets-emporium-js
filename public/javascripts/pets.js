$(document).ready(function() {

  // SUBMIT POST FORM
  $('#post-form').submit(function (e) {
    e.preventDefault();
    var pet = $(this).serialize();
    $.ajax({
      type: 'POST',
      url: '/pets',
      data: pet,
      success: function(data) {
        window.location.href = "/pets/" + data._id
      },
      error: function(err) {
        console.log(err);
      }
    });
  });

});
