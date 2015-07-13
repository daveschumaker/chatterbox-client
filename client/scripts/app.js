
$(document).ready(function() {
  app.init();
}); 
// YOUR CODE HERE:

var app = {};

app.init = function() {
  var context = this;

  //console.log(this.fetch);
  this.fetch();
  
  // Event handling for clicking on username
  $('.username').on('click', function() {
    context.addFriend();
  });

/*
  $('#send').submit(function(event) {
    console.log('POOOOOO');
  });

*/


  // Event handling for submit buttom
  $('#send .submit').on('submit',function(e) {
    e.preventDefault();
    console.log("Fancy pants!");
    context.handleSubmit();
  });
};

app.send = function(message) {
  $.ajax({
    type: 'POST',
    url: 'https://api.parse.com/1/classes/chatterbox',
    contentType: 'application/json',
    data: JSON.stringify(message)
  });
};

app.fetch = function() {
  $.ajax({
    type: 'GET',
    url: 'https://api.parse.com/1/classes/chatterbox',
    contentType: 'application/json',
    success: function() {
      console.log('whoop!');
    }
  });
};

app.clearMessages = function() {
  $('#chats').html('');
};

app.addMessage = function(message_obj) {
  $('#chats').append('<div><span class="username">' + 
    message_obj.username + '</span><span class="message">' + 
    message_obj.text + '</span></div>');
};

app.addRoom = function(room) {
  $('#roomSelect').append('<div>' + room + '</div>');
};

app.addFriend = function(message_obj) {
  // var username = message_obj.username;

  return true;
};

app.handleSubmit = function() {
  console.log("Handle Submit Called!");
  //return true;
};



