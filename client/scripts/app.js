
$(document).ready(function() {
  
  app.init();

  setInterval(function() {
    console.log('Loading. . . . ');
    app.fetch();
  }, 5000);
}); 
// YOUR CODE HERE:

// Global variables
var app = {};
app.user = 'Captain Fancy Pants III';
app.chats = {};
app.displayed = [];
app.chatCount = 0;
app.firstLoad = true;

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
    context.handleSubmit();
  });

  //set username
  $('#setUser').on('click', function() {
    app.user = prompt("Choose your username:");
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

  var chatElement = '<div class="chat"><span class="chatNo">' + 
        message_obj.chatNo + ' </span><span class="username">' + 
        sanitize(message_obj.username) + ': </span><span class="message">' + 
        sanitize(message_obj.text) + '</span><br/><small>' + message_obj.createdAt + '</small></div>';

  if(!_.contains(this.displayed, message_obj.objectId)) {
    if(this.firstLoad) {
      $('#chats').append(chatElement);  
      this.firstLoad = false;
    } else {
      $('#chats').prepend(chatElement);
    }
    
    this.displayed.push(message_obj.objectId);
  }
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
  $('#message').val('');
  var sendMessage = {
    username: context.user,
    text: text
  }

  context.send(sendMessage);
};

app.displayChats = function() {
  var context = this;

  _.each(this.chats, function(chatObj) {
    context.chatCount++;
    chatObj.chatNo = context.chatCount;
  });
  
  _.each(this.chats, function(chat) {
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







