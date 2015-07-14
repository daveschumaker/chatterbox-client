
$(document).ready(function() {
  
  app.init();
}); 
// YOUR CODE HERE:

// Global variables
var app = {};
app.chats = {};

app.init = function() {
  var context = this;

  this.fetch();
  
  // Event handling for clicking on username
  $('.username').on('click', function() {
    context.addFriend();
  });

  // Event handling for submit buttom
  $('#send .submit').on('click',function(e) {
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
  var context = this;
  $.ajax({
    type: 'GET',
    url: 'https://api.parse.com/1/classes/chatterbox',
    contentType: 'application/json',
    success: function(data) {
      context.chats = data.results;
      // console.log(data.results);
    }
  }).done(function(){
    context.displayChats();
  });
};

app.clearMessages = function() {
  $('#chats').html('');
};

//not for posting our texts
app.addMessage = function(message_obj) {
  $('#chats').append('<div class="chat"><span class="username">' + 
    sanitize(message_obj.username) + '</span><span class="message">' + 
    sanitize(message_obj.text) + '</span></div>');
};

app.addRoom = function(room) {
  $('#roomSelect').append('<div>' + room + '</div>');
};

app.addFriend = function(message_obj) {
  // var username = message_obj.username;

  return true;
};

app.handleSubmit = function() {

  var context = this;

  var text = $('#message').val();
  
  var sendMessage = {
    username: 'Captain Fancy Pants',
    text: text
  }
  
  context.send(sendMessage);

};

app.displayChats = function() {
  var context = this;
  _.each(this.chats, function(chat) {

    //deal with undefined chat properties

    context.addMessage(chat);
  });
};

var sanitize = function(input) {
  var output = input === undefined ? undefined : input.replace(/<script[^>]*?>.*?<\/script>/gi, '').
    replace(/<[\/\!]*?[^<>]*?>/gi, '').
    replace(/<style[^>]*?>.*?<\/style>/gi, '').
    replace(/<![\s\S]*?--[ \t\n\r]*>/gi, '');
  
  return output;
};







