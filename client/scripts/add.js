

app.send = function(message) {
  $.ajax({
    type: 'POST',
    url: 'https://api.parse.com/1/classes/chatterbox',
    contentType: 'application/json',
    data: JSON.stringify(message)
  });
};

app.handleSubmit = function() {
  var context = this;

  var text = $('#message').val();
  $('#message').val('');
  var sendMessage = {
    username: context.user,
    text: text,
    roomname: context.currentRoom
  }

  context.send(sendMessage);
};